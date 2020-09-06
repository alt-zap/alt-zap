import { isTenantOpen } from '../utils'

test('isTenantOpen should be closes on 23:00 friday', () => {
  const hours = {
    intervals: [
      {
        days: 'SATURDAY',
        from: '2020-09-05T21:00:00.814Z',
        to: '2020-09-06T01:30:00.974Z',
      },
      {
        from: '2020-09-05T18:00:00.807Z',
        to: '2020-09-06T01:00:00.648Z',
        days: 'SUNDAY',
      },
    ],
  }

  // Sat Sep 05 2020 23:15:56 GMT-0300
  const eightPm = new Date(1599358556103)

  expect(isTenantOpen(hours, eightPm)).toEqual(false)
})

test('isTenantOpen should be opened on friday', () => {
  const hours = {
    intervals: [
      {
        days: 'SATURDAY',
        from: '2020-09-05T21:00:00.814Z',
        to: '2020-09-06T01:30:00.974Z',
      },
      {
        from: '2020-09-05T18:00:00.807Z',
        to: '2020-09-06T01:00:00.648Z',
        days: 'SUNDAY',
      },
    ],
  }

  // Sat Sep 05 2020 20:36:43 GMT-0300
  const eightPm = new Date(1599348997294)

  expect(isTenantOpen(hours, eightPm)).toEqual(true)
})
