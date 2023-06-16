import axios from "axios";

const ApiDevices = axios.create({
    baseURL: 'https://api.gazin.com.br/varejo/relatorio/promocoes'
})

export { ApiDevices }