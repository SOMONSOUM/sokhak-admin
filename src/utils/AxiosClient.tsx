import axios from "axios";
import { QueryClient } from "react-query";
import { setting } from "../lib/settings";

// Connect API
export const AxiosClient = axios.create({
  baseURL: setting.uri + "/api/v1"
})

AxiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})