import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:8080/auth',
    withCredentials: true
})

export default server 