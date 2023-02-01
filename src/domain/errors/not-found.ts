export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || `resource not found`)
    this.name = 'NotFoundError'
  }
}
