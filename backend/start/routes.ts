/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { type HttpContext } from '@adonisjs/core/http';
import router from '@adonisjs/core/services/router';
import authRoutes from '#routes/auth';
import invoices from '#routes/invoices';
import taxProfiles from '#routes/tax_profiles';

router.get('/', ({ response }: HttpContext) => {
  response.status(200).send({ message: 'Ok!' });
});
router.group(authRoutes).prefix('api').as('api');
router.group(taxProfiles).prefix('api').as('api');
router.group(invoices).prefix('api').as('api');
