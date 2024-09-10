import factory from '@adonisjs/lucid/factories';
import { InvoiceFactory } from '#database/factories/invoice_factory';
import TaxProfile from '#models/tax_profile';
import cfdi40RegimenesFiscales from '../../app/constants/cfdi40_regimenes_fiscales.js';

export const TaxProfileFactory = factory
  .define(TaxProfile, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      rfc: faker.helpers.fromRegExp('[A-Z&Ñ]{3,4}[0-9]{2}1[0-2]0[1-9][A-Z&Ñ]{3}'),
      taxRegimeCode: faker.helpers.arrayElement(cfdi40RegimenesFiscales.map((item) => item.id)),
    };
  })
  .relation('invoices', () => InvoiceFactory)
  .build();
