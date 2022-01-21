import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

interface ErrorResponse {
  status: number;
  title: string;
  details: any;
}

@Catch()
export class HTTPExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    var errorResponse: ErrorResponse[] = [
      {
        status: status,
        title: this.camelCaseToMessage(exception.name),
        details: this.getResponseDetails(exception, status),
      },
    ];

    const localTime = new Date().toLocaleDateString();

    Logger.error(
      `${localTime} ${request.url}`,
      exception.stack,
      'ExceptionFilter',
    );

    response
      .status(status)
      .set('Content-Type', 'application/problem+json')
      .json(errorResponse);
  }

  private formatValidationError(errors: any) {
    return errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints);
      return acc;
    }, {});
  }

  private getResponseDetails(exception: HttpException, status): any {
    // if (exception instanceof ValidationException) {
    //   return this.formatValidationError(exception.getResponse());
    // }

    return status !== HttpStatus.INTERNAL_SERVER_ERROR
      // ? exception.message || null || exception.getResponse() todo fix 
      ? exception.getResponse() || null
      : 'Internal server error';
  }

  private camelCaseToMessage(text: string) {
    const result = text.replace(/([A-Z])/g, ' $1');

    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
