import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export class DayJs {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  compareDateIsBefore(date: Date): boolean {
    return dayjs(date).isBefore(new Date())
  }
}
