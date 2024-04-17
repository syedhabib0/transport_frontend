import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    toast.error(error.response.data.message);
    console.log(error);
    if (error.response.status === 401) {
      localStorage.removeItem("auth");
      location.assign("/");
    }
  } else {
    toast.error(error.message);
  }
};

export function kmToMiles(kmString) {
  // Parse the string to remove commas and convert it to a number
  const km = parseFloat(kmString.replace(/,/g, ""));

  // Check if parsing was successful
  if (isNaN(km)) {
    throw new Error("Invalid input");
  }

  // Convert kilometers to miles and format the result to have two decimal places
  const miles = (km * 0.621371).toFixed(2);

  return `${miles} miles`;
}
