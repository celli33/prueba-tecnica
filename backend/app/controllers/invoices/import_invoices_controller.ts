import { cuid } from '@adonisjs/core/helpers';
import { type HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import logger from '@adonisjs/core/services/logger';
import { Open } from 'unzipper';
import { importInvoicesValidator } from '#validators/invoices/import_invoices';

export default class ImportInvoicesController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(importInvoicesValidator);
    const { file } = data;
    const name = cuid();
    const zipName = `${name}.zip`;
    await file.moveToDisk(zipName);

    try {
      const directory = await Open.file(app.makePath(`storage/invoices/${zipName}`));
      await directory.extract({ path: app.makePath(`storage/invoices/${name}`) });

      response.sendResponse({}, 'Facturas procesadas.', 201);
    } catch (error) {
      logger.error(error);

      response.sendError('Hubo un error al guardar las facturas.', undefined, 400);
    }
  }
}
