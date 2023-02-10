import { validate } from 'email-validator'
import { EmailValidatorProviderContract } from '@/domain/providers'

export class EmailValidatorProvider implements EmailValidatorProviderContract {
  validate({
    email
  }: EmailValidatorProviderContract.Input): EmailValidatorProviderContract.Output {
    return validate(email)
  }
}
