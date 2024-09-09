import type { HttpContext } from '@adonisjs/core/http';

import { storeTaxProfilenValidator } from '#validators/tax_profiles/store_tax_profile';
import TaxProfile from '#models/tax_profile';

export default class StoreTaxProfileController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(storeTaxProfilenValidator);
    const taxProfile = await TaxProfile.create(payload);

    response.sendResponse(taxProfile.serialize, 'Perfil fiscal creado.', 201);
  }
}
