import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": 'application/json',
    "Accept": "application/json",
  }
})

export const postRequestAsync = async (apiEndPoint, body, headers) => {
  try {
    const response = await axiosInstance.post(apiEndPoint, body, { headers })
    
    return response.data
  } catch (error) {
    throw error
  }
}