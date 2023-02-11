export const infra = {
  clients: {
    dynamoDb: Symbol.for('DynamoDBClient'),
    s3: Symbol.for('S3Client'),
    sqsClient: Symbol.for('sqsClient')
  },
  environment: {
    carTableName: Symbol.for('CarTableName'),
    userTableName: Symbol.for('UserTableName'),
    carBucket: Symbol.for('CarBucket'),
    carQueue: Symbol.for('CarQueue'),
    logLevel: Symbol.for('LogLevel')
  },
  repositories: {
    car: {
      get: Symbol.for('GetCarRepository'),
      list: Symbol.for('ListCarRepository'),
      save: Symbol.for('SaveCarRepository'),
      delete: Symbol.for('DeleteCarRepository')
    },
    user: {
      findById: Symbol.for('FindUserByIdRepository'),
      save: Symbol.for('SaveUserRepository'),
      delete: Symbol.for('DeleteUserRepository')
    }
  },
  providers: {
    dataStore: Symbol.for('DataStore'),
    messageSender: Symbol.for('MessageSender'),
    emailValidator: Symbol.for('EmailValidator')
  }
}
