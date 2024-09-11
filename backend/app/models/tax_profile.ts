import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import { type HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Concept from '#models/concept';
import Invoice from '#models/invoice';
import Tax from '#models/tax';
import PaymentTotal from './payment_total.js';

export default class TaxProfile extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number;

  @column()
  public declare name: string;

  @column()
  public declare rfc: string;

  @column()
  public declare taxRegimeCode: string;

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime;

  @hasMany(() => Invoice)
  public declare invoices: HasMany<typeof Invoice>;

  public async sumIvaAsIssuer(from: DateTime, to: DateTime): Promise<number> {
    const invoices = await Invoice.query()
      .select('id', 'fecha')
      .whereBetween('fecha', [from.toFormat('yyyy-MM-dd HH:mm:ss'), to.toFormat('yyyy-MM-dd HH:mm:ss')]);

    const invoicesIds = invoices.map((item) => item.id);

    const concepts = await Concept.query().whereIn('invoice_id', invoicesIds);
    const conceptsIds = concepts.map((item) => item.id);
    const taxes = await Tax.query()
      .where('tipo_impuesto', 'traslado')
      .where('impuesto', '002')
      .whereIn('concept_id', conceptsIds);
    const taxesSum = taxes.reduce((sum, current) => sum + current.importe, 0);

    const withholdings = await Tax.query()
      .where('tipo_impuesto', 'retencion')
      .where('impuesto', '002')
      .whereIn('concept_id', conceptsIds);
    const withholdingsSum = withholdings.reduce((sum, current) => sum + current.importe, 0);

    const paymentTotal = await PaymentTotal.query().whereIn('invoice_id', invoicesIds);
    const pTaxesSum = paymentTotal.reduce((sum, current) => {
      return sum + (current.totalTrasladosBaseIva16 ?? 0) + (current.totalTrasladosBaseIva8 ?? 0);
    }, 0);

    const totalTaxesSum = taxesSum + pTaxesSum - withholdingsSum;

    return totalTaxesSum;
  }

  public async sumIvaAsReceiver(from: DateTime, to: DateTime): Promise<number> {
    const invoices = await Invoice.query()
      .select('id')
      .whereBetween('fecha', [from.toISO()!, to.toISO()!])
      .where('tipoComprobante', 'I')
      .where('metodo_pago', 'PUE')
      .where('rfc_receptor', this.rfc);
    const invoicesIds = invoices.map((item) => item.id);
    const concepts = await Concept.query().whereIn('invoice_id', invoicesIds);
    const conceptsIds = concepts.map((item) => item.id);
    const taxes = await Tax.query().where('impuesto', '002').whereIn('concept_id', conceptsIds);
    const taxesSum = taxes.reduce((sum, current) => sum + current.importe, 0);

    const paymentTotal = await PaymentTotal.query().whereIn('invoice_id', invoicesIds);
    const pTaxesSum = paymentTotal.reduce((sum, current) => {
      return sum + (current.totalTrasladosBaseIva16 ?? 0) + (current.totalTrasladosBaseIva8 ?? 0);
    }, 0);

    return taxesSum + pTaxesSum;
  }
}
