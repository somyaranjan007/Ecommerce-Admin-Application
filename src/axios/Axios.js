import axios from 'axios'
import { apiUrl } from './UrlConfig';

const Axios = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export default Axios;