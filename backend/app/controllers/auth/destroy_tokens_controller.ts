import { type HttpContext } from '@adonisjs/core/http';
import User from '#models/user';

export default class DestroyTokenController {
  public async handle({ auth, response }: HttpContext): Promise<void> {
    const user = auth.getUserOrFail();

    await User.accessTokens.delete(user, user.currentAccessToken.identifier);

    response.sendResponse({}, '', 204);
  }
}