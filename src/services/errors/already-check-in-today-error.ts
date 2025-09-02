export class AlreadyCheckInTodayError extends Error {
  constructor() {
    super('User has already checked in today')
    this.name = 'AlreadyCheckInTodayError'
  }
}
