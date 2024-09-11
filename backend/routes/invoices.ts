import router from '@adonisjs/core/services/router';

const CalculateIvaTaxesController = () => import('#controllers/invoices/calculate_iva_taxes_controller');
const ImportInvoicesController = () => import('#controllers/invoices/import_invoices_controller');

const invoices = (): void => {
  router.post('facturas', [ImportInvoicesController]).as('facturas.store');
  router.post('iva-calculo/:taxProfileId', [CalculateIvaTaxesController]).as('iva-calculo');
};

export default invoices;
