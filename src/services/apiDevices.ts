import axios from "axios";

const ApiDevices = axios.create({
    baseURL: 'https://api-precos-celulares.gazin.com.br/varejo/relatorio/promocoes'
})

export { ApiDevices }