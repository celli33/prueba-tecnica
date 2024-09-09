import TaxProfile from '#models/tax_profile';
import type { HttpContext } from '@adonisjs/core/http';

export default class PaginateTaxProfilesController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const qs = request.qs();
    const page = Number(! isNaN(qs.page) ? qs.page : 1);
    const limit = Number(! isNaN(qs.limit) ? qs.limit : 30);
    
    const taxProfiles = await TaxProfile.query().paginate(page, limit);

    response.sendResponse(taxProfiles.serialize(), 'Perfiles Mostrados', 200);
  }
}
