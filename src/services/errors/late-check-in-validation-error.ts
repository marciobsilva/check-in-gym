export class LateCheckInValidationsError extends Error {
  constructor() {
    super('The check-in validation time has expired')
    this.name = 'LateCheckInValidationsError'
  }
}
