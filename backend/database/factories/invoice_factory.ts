import { randomUUID } from 'node:crypto';
import factory from '@adonisjs/lucid/factories';
import { DateTime } from 'luxon';
import { TaxProfileFactory } from '#database/factories/tax_profile_factory';
import Invoice from '#models/invoice';

export const InvoiceFactory = factory
  .define(Invoice, async ({ faker }) => {
    return {
      rfcReceptor: faker.helpers.fromRegExp('[A-Z&Ñ]{3,4}[0-9]{2}1[0-2]0[1-9][A-Z&Ñ]{3}'),
      nombreReceptor: faker.company.name(),
      uuid: randomUUID(),
      rfcEmisor: faker.helpers.fromRegExp('[A-Z&Ñ]{3,4}[0-9]{2}1[0-2]0[1-9][A-Z&Ñ]{3}'),
      nombreEmisor: faker.company.name(),
      fecha: DateTime.now(),
      fechaSellado: faker.datatype.boolean() ? DateTime.now() : null,
      tipoComprobante: faker.helpers.arrayElement(['I', 'P', 'E']),
      total: faker.number.float({ min: 1, max: 10000 }),
      subtotal: faker.number.float({ min: 1, max: 10000 }),
      descuento: faker.number.float({ min: 1, max: 10000 }),
      formaPago: faker.finance.transactionType(),
      metodoPago: faker.finance.transactionType(),
      serie: faker.string.alphanumeric(),
      folio: faker.string.alphanumeric(),
      lugarExpedicion: faker.location.zipCode(),
    };
  })
  .relation('taxProfile', () => TaxProfileFactory)
  .build();
