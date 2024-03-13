import axios from "axios"
import { toast } from "react-toastify"

export const handleError =  (error) => {
    if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message)
    }else{
        toast.error(error.message);
    }
}