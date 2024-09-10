import router from '@adonisjs/core/services/router';

const ImportInvoicesController = () => import('#controllers/invoices/import_invoices_controller');

const invoices = (): void => {
  router.post('facturas', [ImportInvoicesController]).as('facturas.store');
};

export default invoices;
