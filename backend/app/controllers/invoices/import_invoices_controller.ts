import { cuid } from '@adonisjs/core/helpers';
import { type HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import logger from '@adonisjs/core/services/logger';
import drive from '@adonisjs/drive/services/main';
import { Cleaner } from '@nodecfdi/cfdi-cleaner';
import { documentElement, nodeFromXmlElement } from '@nodecfdi/cfdi-core';
import { Open } from 'unzipper';
import Invoice from '#models/invoice';
import { importInvoicesValidator } from '#validators/invoices/import_invoices';

export default class ImportInvoicesController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(importInvoicesValidator);
    const { file } = data;
    const name = cuid();
    const zipName = `${name}.zip`;
    const absoluthZipPath = app.makePath(`storage/invoices/${zipName}`);
    const absoluthInvoicesPath = app.makePath(`storage/invoices/${name}`);
    await file.moveToDisk(zipName);

    try {
      const directory = await Open.file(absoluthZipPath);
      await directory.extract({ path: absoluthInvoicesPath });

      const { objects } = await drive.use().listAll(name);
      const cleaner = new Cleaner();
      const invoices: Invoice[] = [];
      for (const xmlObject of objects) {
        const content = await drive.use().get(`${name}/${xmlObject.name}`);
        const cleanedDocument = cleaner.cleanStringToDocument(content);
        const node = nodeFromXmlElement(documentElement(cleanedDocument));
        const invoice = await Invoice.createInvoiceFromXmlNode(node);
        if (invoice !== null) {
          invoices.push(invoice);
        }
      }

      response.sendResponse(invoices, 'Facturas procesadas.', 201);
    } catch (error) {
      logger.error(error);

      response.sendError('Hubo un error al guardar las facturas.', undefined, 400);
    }
  }
}
