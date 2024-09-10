import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

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
}
