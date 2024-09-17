import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock the DELETE API for clearing chat history
  //   rest.delete('/history/delete_all', (req, res, ctx) => {
  //     console.log("/history/delete_all   mock called!")
  //     return res(ctx.status(200), ctx.json({ ok: true }));
  //   }),
  http.get('https://dummy.restapiexample.com/api/v1/employees', () => {
    // return res(
    //     (ctx.status(200),
    //     ctx.json(
    //         [
    //             {
    //                 employee_name : 'test1'
    //             },
    //             {
    //                 employee_name : 'test2'
    //             }
    //         ]
    //     )
    // ))

    return HttpResponse.json({
      status: 'success',
      data: [
        {
          id: 1,
          employee_name: 'Tiger Nixon',
          employee_salary: 320800,
          employee_age: 61,
          profile_image: ''
        },
        {
          id: 2,
          employee_name: 'Garrett Winters',
          employee_salary: 170750,
          employee_age: 63,
          profile_image: ''
        },
        {
          id: 3,
          employee_name: 'Ashton Cox',
          employee_salary: 86000,
          employee_age: 66,
          profile_image: ''
        }
      ]
    })
  }),

  http.get('https://dummy.restapiexample.com/api/v1/clients', () => {
    return HttpResponse.json({
      status: 'success',
      data: [
        {
          ClientId: 1,
          ClientName: 'John Doe',
          NextMeeting: 'Meeting 1',
          NextMeetingTime: '10:00 AM',
          NextMeetingEndTime: '11:00 AM',
          AssetValue: '1000',
          LastMeeting: 'Previous Meeting 1',
          LastMeetingStartTime: '09:00 AM',
          LastMeetingEndTime: '10:00 AM',
          ClientSummary: 'Summary of the client 1',
          chartUrl: ''
        },
        {
          ClientId: 2,
          ClientName: 'Steve Doe',
          NextMeeting: 'Meeting 2',
          NextMeetingTime: '10:00 AM',
          NextMeetingEndTime: '11:00 AM',
          AssetValue: '1000',
          LastMeeting: 'Previous Meeting 2',
          LastMeetingStartTime: '09:00 AM',
          LastMeetingEndTime: '10:00 AM',
          ClientSummary: 'Summary of the client 2',
          chartUrl: ''
        },
        {
          ClientId: 3,
          ClientName: 'James',
          NextMeeting: 'Meeting 3',
          NextMeetingTime: '10:00 AM',
          NextMeetingEndTime: '11:00 AM',
          AssetValue: '1000',
          LastMeeting: 'Previous Meeting 3',
          LastMeetingStartTime: '09:00 AM',
          LastMeetingEndTime: '10:00 AM',
          ClientSummary: 'Summary of the client 3',
          chartUrl: ''
        }
      ]
    })
  })
]
