const baseUrl =  `${process.env.NEXT_PUBLIC_BACKEND_URL}api`

const apis =  {
    login: `${baseUrl}/login`,
    loads:`${baseUrl}/loads`,
    drivers:`${baseUrl}/drivers`,
    dashboardStates:`${baseUrl}/dashboard/stats`,
    searchdrivers : `${baseUrl}/drivers/searchDrivers`,
    driversCreate : `${baseUrl}/drivers/create`,
    bulkDriverCreate : `${baseUrl}/drivers/create/bulk`,
}

export default apis