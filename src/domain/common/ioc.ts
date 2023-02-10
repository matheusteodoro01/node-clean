export const domain = {
  usecases: {
    user: {
      create: Symbol.for('createUserUsecase')
    },
    car: {
      get: Symbol.for('getCarUsecase'),
      create: Symbol.for('createCarUsecase'),
      process: Symbol.for('processCarUsecase')
    }
  }
}
