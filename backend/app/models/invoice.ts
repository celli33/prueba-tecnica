import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import { type BelongsTo } from '@adonisjs/lucid/types/relations';
import { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { DateTime } from 'luxon';
import TaxProfile from '#models/tax_profile';
import cfdiNs from '../constants/cfdi_ns.js';

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number;

  @column()
  public declare rfcReceptor: string;

  @column()
  public declare nombreReceptor: string | null;

  @column()
  public declare uuid: string;

  @column()
  public declare rfcEmisor: string;

  @column()
  public declare nombreEmisor: string;

  @column.dateTime()
  public declare fecha: DateTime;

  @column.dateTime({ serializeAs: null })
  public declare fechaSellado: DateTime | null;

  @column()
  public declare tipoComprobante: string | null;

  @column()
  public declare total: number;

  @column()
  public declare subtotal: number;

  @column()
  public declare descuento: number | null;

  @column()
  public declare formaPago: string;

  @column()
  public declare metodoPago: string;

  @column()
  public declare serie: string | null;

  @column()
  public declare folio: string | null;

  @column()
  public declare lugarExpedicion: string;

  @column()
  public declare taxProfileId: number;

  @belongsTo(() => TaxProfile)
  public declare taxProfile: BelongsTo<typeof TaxProfile>;

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime;

  public static async createInvoiceFromXmlNode(node: XmlNodeInterface): Promise<Invoice | null> {
    let ns0 = null;
    let ns1 = null;
    for (const entry of node.attributes().entries()) {
      if (ns0 === null) {
        ns0 = entry[1] === cfdiNs.cfdi ? entry[0] : null;
      }
      if (ns1 === null) {
        ns1 = entry[1] === cfdiNs.tfd ? entry[0] : null;
      }
      if (ns0 !== null && ns1 !== null) {
        ns0 = ns0.split(':')[1];
        ns1 = ns1.split(':')[1];
        break;
      }
    }

    const issuerNode = node.searchNode(`${ns0}:Emisor`);
    const rfcEmisor = issuerNode!.getAttribute('Rfc');
    const nombreEmisor = issuerNode!.getAttribute('Nombre');
    let taxProfile = await TaxProfile.query().where('rfc', rfcEmisor).first();

    const receiverNode = node.searchNode(`${ns0}:Emisor`);
    const rfcReceptor = receiverNode!.getAttribute('Rfc');
    const nombreReceptor = receiverNode!.getAttribute('Nombre');

    if (taxProfile === null) {
      taxProfile = await TaxProfile.query().where('rfc', rfcReceptor).first();
    }
    if (taxProfile === null) {
      return null;
    }

    const fecha = node.searchAttribute('Fecha');
    const tipoComprobante = node.searchAttribute('TipoDeComprobante');
    const total = Number(node.searchAttribute('Total'));
    const subtotal = Number(node.searchAttribute('Subtotal'));
    const descuento = Number(node.searchAttribute('Descuento'));
    const formaPago = node.searchAttribute('FormaPago');
    const metodoPago = node.searchAttribute('MetodoPago');
    const serie = node.searchAttribute('Serie');
    const folio = node.searchAttribute('Folio');
    const lugarExpedicion = node.searchAttribute('LugarExpedicion');

    const complementNode = node.searchNode(`${ns0}:Complemento`);

    const timbreNode = complementNode?.searchNode(`${ns1}:TimbreFiscalDigital`);
    const uuid = timbreNode?.getAttribute('UUID');
    const fechaSellado = timbreNode?.getAttribute('FechaTimbrado');

    return await Invoice.create({
      rfcEmisor,
      nombreEmisor,
      rfcReceptor,
      nombreReceptor,
      fecha: DateTime.fromISO(fecha),
      tipoComprobante,
      total,
      subtotal,
      descuento,
      formaPago,
      metodoPago,
      serie,
      folio,
      lugarExpedicion,
      uuid,
      fechaSellado: fechaSellado === undefined ? null : DateTime.fromISO(fechaSellado),
      taxProfileId: taxProfile.id,
    });
  }
}
