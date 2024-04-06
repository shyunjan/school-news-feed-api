import {ValidationPipe, BadRequestException} from '@nestjs/common';

export const customValidationPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const result = errors.map(error => ({
      property: error.property,
      message: error.constraints ? error.constraints[Object.keys(error.constraints)[0]] : ''
    }));
    return new BadRequestException(result);
  },
  stopAtFirstError: true,
})