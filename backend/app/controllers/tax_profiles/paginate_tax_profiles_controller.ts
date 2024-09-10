import { type HttpContext } from '@adonisjs/core/http';
import TaxProfile from '#models/tax_profile';

export default class PaginateTaxProfilesController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const qs = request.qs();
    const page = Number(Number.isNaN(qs.page) ? 1 : qs.page);
    const limit = Number(Number.isNaN(qs.limit) ? 30 : qs.limit);

    const taxProfiles = await TaxProfile.query().paginate(page, limit);

    response.sendResponse(taxProfiles.serialize(), 'Perfiles Mostrados', 200);
  }
}
