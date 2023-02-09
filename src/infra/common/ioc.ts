export const infra = {
  clients: {
    dynamoDb: Symbol.for('DynamoDBClient'),
    s3: Symbol.for('S3Client'),
  },
  environment: {
    carTableName: Symbol.for('CarsTableName'),
    bucket: Symbol.for('S3Bucket'),
    logLevel: Symbol.for('LogLevel'),
  },
  repositories: {
    car: {
      get: Symbol.for('GetCarRepository'),
      list: Symbol.for('ListCarRepository'),
      save: Symbol.for('SaveCarRepository'),
      delete: Symbol.for('DeleteCarRepository'),
    },
    user: {
      get: Symbol.for('GetUserRepository'),
      save: Symbol.for('SaveUserRepository'),
      delete: Symbol.for('DeleteUserRepository'),
    },
  },
  providers: {
    dataStore: Symbol.for('DataStore'),
    messageSender: Symbol.for('MessageSender'),
    emailValidator: Symbol.for('EmailValidator'),
  },
}
