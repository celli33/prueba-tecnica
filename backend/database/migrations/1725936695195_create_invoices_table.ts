import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'invoices';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('rfc_receptor', 15).notNullable();
      table.string('nombre_receptor', 255).nullable();
      table.uuid('uuid').unique().notNullable();
      table.string('rfc_emisor', 15).notNullable();
      table.string('nombre_emisor', 255).notNullable();
      table.dateTime('fecha').notNullable();
      table.dateTime('fecha_sellado').nullable();
      table.string('tipo_comprobante', 5).index().nullable();
      table.double('total').notNullable();
      table.double('subtotal').notNullable();
      table.double('descuento').nullable();
      table.string('forma_pago').notNullable();
      table.string('metodo_pago').notNullable();
      table.string('serie').nullable();
      table.string('folio').nullable();
      table.string('lugar_expedicion', 5).notNullable();

      table
        .integer('tax_profile_id')
        .unsigned()
        .references('tax_profiles.id')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
        .notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
