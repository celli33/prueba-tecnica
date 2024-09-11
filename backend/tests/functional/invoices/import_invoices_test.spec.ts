import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { DateTime } from 'luxon';
import { TaxProfileFactory } from '#database/factories/tax_profile_factory';
import { UserFactory } from '#database/factories/user_factory';
import PaymentTotal from '#models/payment_total';
import { filePath } from '#tests/test_utils';

test.group('import invoices test', (group) => {
  const endpoint = 'api.facturas.store';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());
  test('import invoices test', async ({ client, route, assert }) => {
    const taxProfile = await TaxProfileFactory.merge({
      rfc: 'MUEE830628HDF',
    }).create();
    const user = await UserFactory.create();
    const zipPath = filePath('facturas.zip');
    const response = await client
      .post(route(endpoint))
      .file('file', zipPath, { filename: 'facturas.zip', contentType: 'application/x-zip' })
      .loginAs(user)
      .accept('json');

    response.assertStatus(201);
    const sumIvaAsIssuer = await taxProfile.sumIvaAsIssuer(
      DateTime.fromFormat('07-2024', 'MM-yyyy').startOf('month'),
      DateTime.fromFormat('07-2024', 'MM-yyyy').endOf('month'),
    );
    assert.strictEqual(sumIvaAsIssuer, 5.4399999999999995);
    const sumIvaAsReceiver = await taxProfile.sumIvaAsReceiver(
      DateTime.fromFormat('07-2024', 'MM-yyyy').startOf('month'),
      DateTime.fromFormat('07-2024', 'MM-yyyy').endOf('month'),
    );
    const payments = await PaymentTotal.all();
    assert.strictEqual(payments.length, 1);
    assert.strictEqual(sumIvaAsReceiver, 2.28);
  });
});
