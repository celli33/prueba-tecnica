import { Response } from '@adonisjs/core/http';

Response.macro('sendResponse', function (this: Response, result: unknown, message: string, httpCode = 200) {
  this.status(httpCode).json({
    data: result,
    message,
  });
});

Response.macro('sendError', function (this: Response, message: string, errors: unknown[] = [], httpCode = 404) {
  this.status(httpCode).json({
    errors,
    message,
  });
});

declare module '@adonisjs/core/http' {
  interface Response {
    /**
     * Send Response success in json format
     *
     * @param result - data result
     * @param message - message description
     * @param httpCode - http code default is 200
     * @param code - tag or special code
     */
    sendResponse(result: unknown, message: string, httpCode?: number): void;

    /**
     * Send response failed or error in json format
     *
     * @param msgError - Error message
     * @param errors - All errors found
     * @param httpCode - http code default is 404
     * @param code - tag or special code
     */
    sendError(msgError: string, errors?: unknown[], httpCode?: number): void;
  }
}
