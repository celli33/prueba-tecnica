import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'concepts';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('clave_prod_serv', 9).notNullable();
      table.string('no_identificacion', 100).nullable();
      table.double('cantidad').notNullable();
      table.string('clave_unidad', 4).notNullable();
      table.string('unidad', 20).nullable();
      table.text('descripcion').notNullable();
      table.double('valor_unitario').notNullable();
      table.double('importe').notNullable();
      table.double('descuento').nullable();
      table.string('objeto_imp', 4).notNullable();

      table
        .integer('invoice_id')
        .unsigned()
        .references('invoices.id')
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
