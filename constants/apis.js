export const baseUrl =  `${process.env.NEXT_PUBLIC_BACKEND_URL}api`

const apis =  {
    login: `${baseUrl}/login`,
    loads:`${baseUrl}/loads`,
    drivers:`${baseUrl}/drivers`,
    dashboardStates:`${baseUrl}/dashboard/stats`,
    searchdrivers : `${baseUrl}/drivers/search-driver-locations`,
    driversCreate : `${baseUrl}/drivers/create`,
    bulkDriverCreate : `${baseUrl}/drivers/create/bulk`,
    driversLocations:`${baseUrl}/drivers/search-driver-locations`,
    getTruckTypes: `${baseUrl}/truck/get-truck-types`,
    getDriverStatus: `${baseUrl}/get-driver-statuses`

}

export default apis


export const baseimage = "https://api.tmsiws.com/storage"