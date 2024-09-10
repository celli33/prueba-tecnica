import factory from '@adonisjs/lucid/factories';
import PaymentTotal from '#models/payment_total';

export const PaymentTotalFactory = factory
  .define(PaymentTotal, async ({ faker }) => {
    return {
      totalRetencionesIva: faker.number.float({ min: 1, max: 10000 }),
      totalRetencionesIsr: faker.number.float({ min: 1, max: 10000 }),
      totalRetencionesIeps: faker.number.float({ min: 1, max: 10000 }),
      totalTrasladosBaseIva16: faker.number.float({ min: 1, max: 10000 }),
      totalTrasladosImpuestoIva16: faker.number.float({ min: 1, max: 10000 }),
      totalTrasladosBaseIva8: faker.number.float({ min: 1, max: 10000 }),
      totalTrasladosImpuestoIva8: faker.number.float({ min: 1, max: 10000 }),
      totalTrasladosBaseIva0: faker.number.float({ min: 1, max: 10000 }),
      totalTrasladosImpuestoIva0: faker.number.float({ min: 1, max: 10000 }),
      totalTrasladosBaseIvaExento: faker.number.float({ min: 1, max: 10000 }),
      montoTotalPagos: faker.number.float({ min: 1, max: 10000 }),
    };
  })
  .build();
