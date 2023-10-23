import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CommonValidator } from './common.validator';

@ValidatorConstraint({ name: 'isCpf', async: false })
export class IsCpf implements ValidatorConstraintInterface {
  private readonly commonValidator = new CommonValidator();
  validate(cpf: string) {
    return this.commonValidator.validateCPF(cpf);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Field ($property) must be a valid CPF';
  }
}
