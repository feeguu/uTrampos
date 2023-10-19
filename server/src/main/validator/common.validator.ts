import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonValidator {
  validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // remove any non-digit characters
    if (cpf.length !== 11) return false; // CPF must have 11 digits

    // check for known invalid CPFs
    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }

    // validate CPF digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  validateCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // remove any non-digit characters
    if (cnpj.length !== 14) return false; // CNPJ must have 14 digits

    // check for known invalid CNPJs
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return false;
    }

    // validate CNPJ digits
    const [firstDigit, secondDigit] = [cnpj.charAt(12), cnpj.charAt(13)];
    const order = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < order.length; i++) {
      sum += parseInt(cnpj.charAt(i)) * order[i];
    }
    let remainder = sum % 11;
    const firstValidationDigit = remainder < 2 ? 0 : 11 - remainder;
    if (firstValidationDigit !== parseInt(firstDigit)) return false;

    order.unshift(6);
    sum = 0;
    for (let i = 0; i < order.length; i++) {
      sum += parseInt(cnpj.charAt(i)) * order[i];
    }
    remainder = sum % 11;
    const secondValidationDigit = remainder < 2 ? 0 : 11 - remainder;
    if (secondValidationDigit !== parseInt(secondDigit)) return false;
    return true;
  }
}
