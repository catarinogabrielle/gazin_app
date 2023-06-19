import axios from "axios";

const Api = axios.create({
    baseURL: 'http://192.168.200.100:3333'
})

export { Api }