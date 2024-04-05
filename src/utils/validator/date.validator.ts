import {registerDecorator} from 'class-validator';
import moment from 'moment-timezone';

export function IsValidDate() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsLadderValue',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: string | number) {
          return moment(value).isValid();
        },
      },
    });
  };
}
