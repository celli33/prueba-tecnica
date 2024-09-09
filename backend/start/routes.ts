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

router.get('/', ({ response }: HttpContext) => {
  response.status(200).send({ message: 'Ok!' });
});
router.group(authRoutes).prefix('api').as('api');