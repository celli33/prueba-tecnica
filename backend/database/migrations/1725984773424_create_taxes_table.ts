import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'taxes';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('tipo_impuesto', 10).notNullable(); // 'traslado' o 'retencion'
      table.string('impuesto', 3).notNullable(); // 'traslado' o 'retencion'
      table.double('base').notNullable();
      table.string('tipo_factor', 20).notNullable(); // 'Tasa', 'Cuota', 'Exento'
      table.double('tasa_o_cuota').notNullable();
      table.double('importe').notNullable();

      table
        .integer('concept_id')
        .unsigned()
        .references('concepts.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
