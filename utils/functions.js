import axios from "axios"
import { toast } from "react-toastify"

export const handleError =  (error) => {
    if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message)
        console.log(error);
        if (error.response.status === 401) {
            localStorage.removeItem("auth")
            location.assign("/")
        }
    }else{
        toast.error(error.message);
    }
}