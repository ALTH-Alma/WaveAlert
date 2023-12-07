import axios from './axios'

export function alertasNoGestionadas()
{
    return axios.get("alerts").then(res => res.data)
}   

export function alertasZonaPeligro()
{
    return axios.get("/check_dangerous_areas").then(res => res.data)
}   

export function alertarEsquiadorZonaPeligro(data: {chatId: string, alertar: boolean})
{
    return axios.post("/send-alert", data).then(res => res.data)
} 