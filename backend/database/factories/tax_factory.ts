import factory from '@adonisjs/lucid/factories';
import Tax from '#models/tax';

export const TaxFactory = factory
  .define(Tax, async ({ faker }) => {
    return {
      tipoImpuesto: faker.helpers.arrayElement(['traslado', 'retencion']),
      impuesto: faker.string.alphanumeric(3),
      base: faker.number.float({ min: 1, max: 10000 }),
      tipoFactor: faker.helpers.arrayElement(['Tasa', 'Cuota', 'Exento']),
      tasaOCuota: faker.number.float({ min: 1, max: 10000 }),
      importe: faker.number.float({ min: 1, max: 10000 }),
    };
  })
  .build();
