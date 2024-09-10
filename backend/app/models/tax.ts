import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import { type BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Concept from '#models/concept';

export default class Tax extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number;

  @column()
  public declare tipoImpuesto: string;

  @column()
  public declare impuesto: string;

  @column()
  public declare base: number;

  @column()
  public declare tipoFactor: string;

  @column()
  public declare tasaOCuota: number;

  @column()
  public declare importe: number;

  @column()
  public declare conceptId: number;

  @belongsTo(() => Concept)
  public declare concept: BelongsTo<typeof Concept>;

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime;
}
