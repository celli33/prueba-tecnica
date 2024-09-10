import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import { type BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Invoice from '#models/invoice';

export default class PaymentTotal extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number;

  @column()
  public declare totalRetencionesIva: number | null;

  @column()
  public declare totalRetencionesIsr: number | null;

  @column()
  public declare totalRetencionesIeps: number | null;

  @column()
  public declare totalTrasladosBaseIva16: number | null;

  @column()
  public declare totalTrasladosImpuestoIva16: number | null;

  @column()
  public declare totalTrasladosBaseIva8: number | null;

  @column()
  public declare totalTrasladosImpuestoIva8: number | null;

  @column()
  public declare totalTrasladosBaseIva0: number | null;

  @column()
  public declare totalTrasladosImpuestoIva0: number | null;

  @column()
  public declare totalTrasladosBaseIvaExento: number | null;

  @column()
  public declare montoTotalPagos: number | null;

  @column()
  public declare invoiceId: number;

  @belongsTo(() => Invoice)
  public declare invoice: BelongsTo<typeof Invoice>;

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime;
}
