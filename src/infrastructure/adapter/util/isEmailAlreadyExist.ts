import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import UserModel from '../typeorm/entity/user';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(email: string) {
    return UserModel.findOne({ where: { email } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function fn(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
