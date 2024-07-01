import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:8080/auth',
    withCredentials: true
})

const profile = axios.create({
    baseURL: 'http://localhost:8080/profile',
    withCredentials: true
})

export default {
    server, profile
}