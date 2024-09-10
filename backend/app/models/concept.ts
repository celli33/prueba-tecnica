import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import { type BelongsTo, type HasMany } from '@adonisjs/lucid/types/relations';
import { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { DateTime } from 'luxon';
import Invoice from '#models/invoice';
import Tax from '#models/tax';
import { obtainTaxOrWithholdingNodeData } from './helpers/node_to:values.js';

export default class Concept extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number;

  @column()
  public declare claveProdServ: string;

  @column()
  public declare noIdentificacion: string | null;

  @column()
  public declare cantidad: number;

  @column()
  public declare claveUnidad: string;

  @column()
  public declare unidad: string | null;

  @column()
  public declare descripcion: string;

  @column()
  public declare valorUnitario: number;

  @column()
  public declare importe: number;

  @column()
  public declare descuento: number | null;

  @column()
  public declare objetoImp: string;

  @column()
  public declare invoiceId: number;

  @belongsTo(() => Invoice)
  public declare invoice: BelongsTo<typeof Invoice>;

  @hasMany(() => Tax)
  public declare taxes: HasMany<typeof Tax>;

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime;

  public async createTaxes(node: XmlNodeInterface, nsName: string): Promise<Tax[]> {
    const transferredTaxes = node.searchNode(`${nsName}:Traslados`);
    const taxesCreated: Tax[] = [];
    if (transferredTaxes) {
      const transferredNodes = transferredTaxes.searchNodes(`${nsName}:Traslado`);
      for (const tranferredTaxNode of transferredNodes) {
        const taxCreated = await Tax.create({
          tipoImpuesto: 'traslado',
          conceptId: this.id,
          ...obtainTaxOrWithholdingNodeData(tranferredTaxNode),
        });
        taxesCreated.push(taxCreated);
      }
    }

    const withholdingTaxes = node.searchNode(`${nsName}:Retenciones`);
    if (withholdingTaxes) {
      const withholdingNodes = withholdingTaxes.searchNodes(`${nsName}:Retencion`);
      for (const withholdingNode of withholdingNodes) {
        const withholdingCreated = await Tax.create({
          tipoImpuesto: 'retencion',
          conceptId: this.id,
          ...obtainTaxOrWithholdingNodeData(withholdingNode),
        });
        taxesCreated.push(withholdingCreated);
      }
    }

    return taxesCreated;
  }
}
