const baseUrl =  `${process.env.NEXT_PUBLIC_BACKEND_URL}api`

const apis =  {
    login: `${baseUrl}/login`,
    loads:`${baseUrl}/loads`,
    drivers:`${baseUrl}/drivers`,
}

export default apis