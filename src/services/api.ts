import axios from "axios";

const Api = axios.create({
    baseURL: 'http://207.244.238.126:8888'
})

export { Api }