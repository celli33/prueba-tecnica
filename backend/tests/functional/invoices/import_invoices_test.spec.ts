import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { TaxProfileFactory } from '#database/factories/tax_profile_factory';
import { UserFactory } from '#database/factories/user_factory';
import Invoice from '#models/invoice';
import { filePath } from '#tests/test_utils';
import Concept from '#models/concept';
import Tax from '#models/tax';

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
    // const invoices = await Invoice.query()
    //   .where('rfc_emisor', 'MUEE830628HDF')
    //   .preload('invoices', (q) => {
    //     void q.preload('taxes', (qu) => {
    //       void qu.where('tipo_impuesto', 'traslado');
    //     });
    //   });
    // let trasladosValue = 0;
    // invoices.map((invoice) =>
    //   invoice.invoices.map((concepts) =>
    //     concepts.taxes.map((tax) => {
    //       trasladosValue += tax.importe;

    //       return trasladosValue;
    //     }),
    //   ),
    // );
    // console.log(trasladosValue);
    const invoice = await Invoice.query()
    .select('id')
       .where('rfc_emisor', 'MUEE830628HDF');
    const itemIds = invoice.map(item => item.id);
    const concepts = await Concept.query().whereIn('invoice_id', itemIds);
    const conceptsIds = concepts.map(item => item.id);
    const taxes = await Tax.query().where('tipo_impuesto', 'traslado').whereIn('concept_id', conceptsIds);
    const taxesSum = taxes.reduce((sum, current) => sum + current.importe, 0);

    const taxesWithholding = await Tax.query().where('tipo_impuesto', 'retencion').whereIn('concept_id', conceptsIds);
    const taxesSum = taxes.reduce((sum, current) => sum + current.importe, 0);
    


    // assert.equal(39, invoices.length);
  });
});
