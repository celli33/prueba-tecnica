import { type HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import { storeTokenValidator } from '#validators/auth/store_token';

export default class StoreTokenController {
  public async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(storeTokenValidator);
    const user = await User.verifyCredentials(payload.email, payload.password);
    const token = await User.accessTokens.create(user);

    response.sendResponse({
      type: 'bearer',
      value: token.value!.release(),
    }, 'Token creado.', 201);
  }
}