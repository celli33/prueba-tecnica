import { type HttpContext } from '@adonisjs/core/http';

export default class ShowUserAccountController {
  public handle({ response, auth }: HttpContext): void {
    response.sendResponse(auth.user, 'Usuario autenticado mostrado.', 200);
  }
}
