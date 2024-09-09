import { importInvoicesValidator } from '#validators/invoices/import_invoices';
import type { HttpContext } from '@adonisjs/core/http';

export default class ImportInvoicesController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(importInvoicesValidator);
    const file = data.file;
  }
}
