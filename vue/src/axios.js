import axios from 'axios'
import store from './store'
//console.log(import.meta.env.VITE_API_BASE_URL)

const axiosClient = axios.create({
  baseURL: `https://laravello.test/api`,
})

// add to every request
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`
  return config
})

export default axiosClient
