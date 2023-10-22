import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CommonValidator } from './common.validator';

@ValidatorConstraint({ name: 'isCnpj', async: false })
export class isCnpj implements ValidatorConstraintInterface {
  private readonly commonValidator = new CommonValidator();
  validate(cnpj: string) {
    return this.commonValidator.validateCNPJ(cnpj);
  }
  defaultMessage() {
    return 'Field ($property) must be a valid CNPJ';
  }
}
