export namespace EmailValidatorProviderContract {
  export type Input = { email:string};
  export type Output = boolean
}

export interface EmailValidatorProviderContract {
  validate(input: EmailValidatorProviderContract.Input): EmailValidatorProviderContract.Output
}
