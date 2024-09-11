import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { TaxProfileFactory } from '#database/factories/tax_profile_factory';
import { UserFactory } from '#database/factories/user_factory';
import Concept from '#models/concept';
import Invoice from '#models/invoice';
import Tax from '#models/tax';
import { filePath } from '#tests/test_utils';

test.group('import invoices test', (group) => {
  const endpoint = 'api.facturas.store';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());
  test('import invoices test', async ({ client, route, assert }) => {
    await TaxProfileFactory.merge({
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
    const invoiceIssued = await Invoice.query()
      .select('id')
      .where('tipoComprobante', 'I')
      .where('rfc_emisor', 'MUEE830628HDF');
    const itemIIds = invoiceIssued.map((item) => item.id);
    const conceptsI = await Concept.query().whereIn('invoice_id', itemIIds);
    const conceptsIIds = conceptsI.map((item) => item.id);
    const taxesI = await Tax.query()
      .where('tipo_impuesto', 'traslado')
      .where('impuesto', '002')
      .whereIn('concept_id', conceptsIIds);
    const taxesISum = taxesI.reduce((sum, current) => sum + current.importe, 0);
    const taxesWithholdingI = await Tax.query()
      .where('tipo_impuesto', 'retencion')
      .where('impuesto', '002')
      .whereIn('concept_id', conceptsIIds);
    const taxesWithholdingsSumI = taxesWithholdingI.reduce((sum, current) => sum + current.importe, 0);
    const taxesissuedSum = taxesISum - taxesWithholdingsSumI;
    assert.equal(419.2199999999999, taxesissuedSum);

    const invoiceReceived = await Invoice.query()
      .select('id')
      .where('tipoComprobante', 'I')
      .where('rfc_receptor', 'MUEE830628HDF');
    const itemRIds = invoiceReceived.map((item) => item.id);
    const conceptsR = await Concept.query().whereIn('invoice_id', itemRIds);
    const conceptsRIds = conceptsR.map((item) => item.id);
    const taxesR = await Tax.query()
      .where('impuesto', '002')
      .whereIn('concept_id', conceptsRIds);
    const taxesRSum = taxesR.reduce((sum, current) => sum + current.importe, 0);
    assert.equal(10889.252830000005, taxesRSum);
  });
});
