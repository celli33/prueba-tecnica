import { type HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';
import TaxProfile from '#models/tax_profile';
import { calcualteIvaTaxValidator } from '#validators/invoices/calculate_iva_tax';

export default class CalculateIvaTaxesController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(calcualteIvaTaxValidator);
    const from = DateTime.fromJSDate(data.date).startOf('month');
    const to = DateTime.fromJSDate(data.date).endOf('month');
    const taxProfileId = request.param('taxProfileId') as number;
    const taxProfile = await TaxProfile.findOrFail(taxProfileId);
    const sumIvaIssued = await taxProfile.sumIvaAsIssuer(from, to);
    const sumIvaReceived = await taxProfile.sumIvaAsReceiver(from, to);
    const toPayOrDeduce = sumIvaIssued - sumIvaReceived;
    const isPay = toPayOrDeduce > 0;

    response.sendResponse(
      {
        sumIvaIssued,
        sumIvaReceived,
        toPayOrDeduce: Math.abs(toPayOrDeduce),
        isPay,
      },
      'Cálculo mostrado',
      200,
    );
  }
}
