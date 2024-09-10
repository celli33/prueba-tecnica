import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { DateTime } from 'luxon';
import cfdiNs from '../../constants/cfdi_ns.js';

export type NsNames = {
  cfdiNs: string | null;
  tfdNs: string | null;
  pagosNs: string |null;
};

export const obtainIssuerNodeData = (node: XmlNodeInterface): { rfcEmisor: string; nombreEmisor: string } => {
  const rfcEmisor = node.getAttribute('Rfc');
  const nombreEmisor = node.getAttribute('Nombre');

  return {
    rfcEmisor,
    nombreEmisor,
  };
};

export const obtainReceiverNodeData = (node: XmlNodeInterface): { rfcReceptor: string; nombreReceptor: string } => {
  const rfcReceptor = node.getAttribute('Rfc');
  const nombreReceptor = node.getAttribute('Nombre');

  return {
    rfcReceptor,
    nombreReceptor,
  };
};

export const obtainComprobanteNodeData = (
  node: XmlNodeInterface,
): {
  fecha: DateTime;
  tipoComprobante: string;
  total: number;
  subtotal: number;
  descuento: number;
  formaPago: string;
  metodoPago: string;
  serie: string;
  folio: string;
  lugarExpedicion: string;
} => {
  const fecha = DateTime.fromISO(node.searchAttribute('Fecha'));
  const tipoComprobante = node.searchAttribute('TipoDeComprobante');
  const total = Number(node.searchAttribute('Total'));
  const subtotal = Number(node.searchAttribute('Subtotal'));
  const descuento = Number(node.searchAttribute('Descuento'));
  const formaPago = node.searchAttribute('FormaPago');
  const metodoPago = node.searchAttribute('MetodoPago');
  const serie = node.searchAttribute('Serie');
  const folio = node.searchAttribute('Folio');
  const lugarExpedicion = node.searchAttribute('LugarExpedicion');

  return {
    fecha,
    tipoComprobante,
    total,
    subtotal,
    descuento,
    formaPago,
    metodoPago,
    serie,
    folio,
    lugarExpedicion,
  };
};

export const obtainTimbreNodeData = (node: XmlNodeInterface): { uuid: string; fechaSellado: DateTime } => {
  const uuid = node.getAttribute('UUID');
  const fechaSellado = DateTime.fromISO(node.getAttribute('FechaTimbrado'));

  return {
    uuid,
    fechaSellado,
  };
};

export const obtainConceptNodeData = (
  node: XmlNodeInterface,
): {
  claveProdServ: string;
  noIdentificacion: string;
  cantidad: number;
  claveUnidad: string;
  unidad: string;
  descripcion: string;
  valorUnitario: number;
  importe: number;
  descuento: number;
  objetoImp: string;
} => {
  const claveProdServ = node.getAttribute('ClaveProdServ');
  const noIdentificacion = node.getAttribute('NoIdentificacion');
  const cantidad = Number(node.getAttribute('Cantidad'));
  const claveUnidad = node.getAttribute('ClaveUnidad');
  const unidad = node.getAttribute('Unidad');
  const descripcion = node.getAttribute('Descripcion');
  const valorUnitario = Number(node.getAttribute('ValorUnitario'));
  const importe = Number(node.getAttribute('Importe'));
  const descuento = Number(node.getAttribute('Descuento'));
  const objetoImp = node.getAttribute('ObjetoImp');

  return {
    claveProdServ,
    noIdentificacion,
    cantidad,
    claveUnidad,
    unidad,
    descripcion,
    valorUnitario,
    importe,
    descuento,
    objetoImp,
  };
};

export const obtainTaxOrWithholdingNodeData = (
  node: XmlNodeInterface,
): {
  base: number;
  impuesto: string;
  tipoFactor: string;
  tasaOCuota: number;
  importe: number;
} => {
  const base = Number(node.getAttribute('Base'));
  const impuesto = node.getAttribute('Impuesto');
  const tipoFactor = node.getAttribute('TipoFactor');
  const tasaOCuota = Number(node.getAttribute('TasaOCuota'));
  const importe = Number(node.getAttribute('Importe'));

  return {
    base,
    impuesto,
    tipoFactor,
    tasaOCuota,
    importe,
  };
};

export const obtainPaymentTotalsNodeData = (
  node: XmlNodeInterface,
): {
  totalRetencionesIva: number;
  totalRetencionesIsr: number;
  totalRetencionesIeps: number;
  totalTrasladosBaseIva16: number;
  totalTrasladosImpuestoIva16: number;
  totalTrasladosBaseIva8: number;
  totalTrasladosImpuestoIva8: number;
  totalTrasladosBaseIva0: number;
  totalTrasladosImpuestoIva0: number;
  totalTrasladosBaseIvaExento: number;
  montoTotalPagos: number;
} => {
  const totalRetencionesIva = Number(node.getAttribute('TotalRetencionesIVA'));
  const totalRetencionesIsr = Number(node.getAttribute('TotalRetencionesISR'));
  const totalRetencionesIeps = Number(node.getAttribute('TotalRetencionesIEPS'));
  const totalTrasladosBaseIva16 = Number(node.getAttribute('TotalTrasladosBaseIVA16'));
  const totalTrasladosImpuestoIva16 = Number(node.getAttribute('TotalTrasladosImpuestoIVA16'));
  const totalTrasladosBaseIva8 = Number(node.getAttribute('TotalTrasladosBaseIVA8'));
  const totalTrasladosImpuestoIva8 = Number(node.getAttribute('TotalTrasladosImpuestoIVA8'));
  const totalTrasladosBaseIva0 = Number(node.getAttribute('TotalTrasladosBaseIVA0'));
  const totalTrasladosImpuestoIva0 = Number(node.getAttribute('TotalTrasladosImpuestoIVA0'));
  const totalTrasladosBaseIvaExento = Number(node.getAttribute('TotalTrasladosBaseIVAExento'));
  const montoTotalPagos = Number(node.getAttribute('MontoTotalPagos'));

  return {
    totalRetencionesIva,
    totalRetencionesIsr,
    totalRetencionesIeps,
    totalTrasladosBaseIva16,
    totalTrasladosImpuestoIva16,
    totalTrasladosBaseIva8,
    totalTrasladosImpuestoIva8,
    totalTrasladosBaseIva0,
    totalTrasladosImpuestoIva0,
    totalTrasladosBaseIvaExento,
    montoTotalPagos
  };
};

export const getNsValues = (node: XmlNodeInterface): NsNames => {
  let ns0 = null;
  let ns1 = null;
  let ns2 = null;
  for (const entry of node.attributes().entries()) {
    if (ns0 === null) {
      ns0 = entry[1] === cfdiNs.cfdi ? entry[0] : null;
    }
    if (ns1 === null) {
      ns1 = entry[1] === cfdiNs.tfd ? entry[0] : null;
    }
    if (ns2 === null) {
      ns2 = entry[1] === cfdiNs.pagos ? entry[0] : null;
    }
    if (ns0 !== null && ns1 !== null) {
      ns0 = ns0.split(':')[1];
      ns1 = ns1.split(':')[1];
      break;
    }
  }
  if(ns2 !== null) {
    ns2 = ns2.split(':')[1];
  }

  return {
    cfdiNs: ns0,
    tfdNs: ns1,
    pagosNs: ns2,
  };
};
