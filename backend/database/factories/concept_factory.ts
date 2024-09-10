import factory from '@adonisjs/lucid/factories';
import Concept from '#models/concept';

export const ConceptFactory = factory
  .define(Concept, async ({ faker }) => {
    return {
      claveProdServ: faker.string.alphanumeric(9),
      noIdentificacion: faker.string.alphanumeric(9),
      cantidad: faker.number.float({ min: 1, max: 10000 }),
      claveUnidad: faker.string.alphanumeric(4),
      unidad: faker.word.sample(),
      descripcion: faker.lorem.sentence(),
      valorUnitario: faker.number.float({ min: 1, max: 10000 }),
      importe: faker.number.float({ min: 1, max: 10000 }),
      descuento: faker.number.float({ min: 1, max: 500 }),
      objetoImp: faker.string.alphanumeric(2),
    };
  })
  .build();
