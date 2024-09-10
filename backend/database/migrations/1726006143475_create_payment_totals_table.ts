import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'payment_totals';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.double('total_retenciones_iva').nullable();
      table.double('total_retenciones_isr').nullable();
      table.double('total_retenciones_ieps').nullable();
      table.double('total_traslados_base_iva_16').nullable();
      table.double('total_traslados_impuesto_iva_16').nullable();
      table.double('total_traslados_base_iva_8').nullable();
      table.double('total_traslados_impuesto_iva_8').nullable();
      table.double('total_traslados_base_iva_0').nullable();
      table.double('total_traslados_impuesto_iva_0').nullable();
      table.double('total_traslados_base_iva_exento').nullable();
      table.double('monto_total_pagos').nullable();

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
