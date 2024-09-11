import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock the DELETE API for clearing chat history
//   rest.delete('/history/delete_all', (req, res, ctx) => {
//     console.log("/history/delete_all   mock called!")
//     return res(ctx.status(200), ctx.json({ ok: true }));
//   }),
  http.get("https://dummy.restapiexample.com/api/v1/employees",()=>{
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
        "status": "success",
        "data": [
            {
                "id": 1,
                "employee_name": "Tiger Nixon",
                "employee_salary": 320800,
                "employee_age": 61,
                "profile_image": ""
            },
            {
                "id": 2,
                "employee_name": "Garrett Winters",
                "employee_salary": 170750,
                "employee_age": 63,
                "profile_image": ""
            },
            {
                "id": 3,
                "employee_name": "Ashton Cox",
                "employee_salary": 86000,
                "employee_age": 66,
                "profile_image": ""
            }]})
  })
];
