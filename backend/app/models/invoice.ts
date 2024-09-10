import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import { type BelongsTo, type HasMany } from '@adonisjs/lucid/types/relations';
import { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { DateTime } from 'luxon';
import Concept from '#models/concept';
import PaymentTotal from '#models/payment_total';
import TaxProfile from '#models/tax_profile';
import {
  getNsValues,
  obtainComprobanteNodeData,
  obtainConceptNodeData,
  obtainIssuerNodeData,
  obtainPaymentTotalsNodeData,
  obtainReceiverNodeData,
  obtainTimbreNodeData,
} from './helpers/node_to_values.js';

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

  @hasMany(() => Concept)
  public declare invoices: HasMany<typeof Concept>;

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime;

  public static async createInvoiceFromXmlNode(node: XmlNodeInterface): Promise<Invoice | null> {
    const ns = getNsValues(node);
    if (ns.cfdiNs === null || ns.tfdNs === null) {
      return null;
    }

    const complementNode = node.searchNode(`${ns.cfdiNs}:Complemento`);
    const timbreNode = complementNode?.searchNode(`${ns.tfdNs}:TimbreFiscalDigital`);
    if (timbreNode === undefined) {
      return null;
    }
    const { uuid, fechaSellado } = obtainTimbreNodeData(timbreNode);
    await Invoice.query().where('uuid', uuid).delete();

    const issuerNode = node.searchNode(`${ns.cfdiNs}:Emisor`);
    if (issuerNode === undefined) {
      return null;
    }
    const { rfcEmisor, nombreEmisor } = obtainIssuerNodeData(issuerNode);
    let taxProfile = await TaxProfile.query().where('rfc', rfcEmisor).first();

    const receiverNode = node.searchNode(`${ns.cfdiNs}:Receptor`);
    if (receiverNode === undefined) {
      return null;
    }
    const { rfcReceptor, nombreReceptor } = obtainReceiverNodeData(receiverNode);

    if (taxProfile === null) {
      taxProfile = await TaxProfile.query().where('rfc', rfcReceptor).first();
    }
    if (taxProfile === null) {
      return null;
    }

    const comprobanteData = obtainComprobanteNodeData(node);

    const invoice = await Invoice.create({
      rfcEmisor,
      nombreEmisor,
      rfcReceptor,
      nombreReceptor,
      fecha: comprobanteData.fecha,
      tipoComprobante: comprobanteData.tipoComprobante,
      total: comprobanteData.total,
      subtotal: comprobanteData.subtotal,
      descuento: comprobanteData.descuento,
      formaPago: comprobanteData.formaPago,
      metodoPago: comprobanteData.metodoPago,
      serie: comprobanteData.serie,
      folio: comprobanteData.folio,
      lugarExpedicion: comprobanteData.lugarExpedicion,
      uuid,
      fechaSellado,
      taxProfileId: taxProfile.id,
    });

    const conceptsNode = node.searchNode(`${ns.cfdiNs}:Conceptos`);

    if (conceptsNode === undefined) {
      return invoice;
    }
    await invoice.createConcepts(conceptsNode, ns.cfdiNs);

    if (ns.pagosNs !== null) {
      const paymentsNode = complementNode?.searchNode(`${ns.pagosNs}:Pagos`);
      if (paymentsNode !== undefined) {
        const totalsNode = paymentsNode.searchNode(`${ns.pagosNs}:Totales`);
        await PaymentTotal.create({invoiceId: invoice.id, ...obtainPaymentTotalsNodeData(totalsNode!)});
      }
    }

    return invoice;
  }

  public async createConcepts(node: XmlNodeInterface, nsName: string): Promise<Concept[]> {
    const conceptNodeArr = node.searchNodes(`${nsName}:Concepto`);
    const conceptsCreated: Concept[] = [];
    for (const conceptNode of conceptNodeArr) {
      const conceptCreated = await Concept.create({ invoiceId: this.id, ...obtainConceptNodeData(conceptNode) });
      const taxesNode = conceptNode.searchNode(`${nsName}:Impuestos`);

      if (taxesNode !== undefined) {
        await conceptCreated.createTaxes(taxesNode, nsName);
      }
      conceptsCreated.push(conceptCreated);
    }

    return conceptsCreated;
  }
}
