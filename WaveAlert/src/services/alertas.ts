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

export function getCentroids()
{
    return axios.get("/generate_heatmap").then(res => res.data)
} 

export function getSafeAreas()
{
    return axios.get("/get_safe_areas").then(res => res.data)
} 

export function getDangerousAreas()
{
    return axios.get("/get_dangerous_areas").then(res => res.data)
} 

export function getAllAreas()
{
    return axios.get("/get_areas").then(res => res.data)
} 

export function atenderPersona(data:{chatId: string})
{
    return axios.post("/atender", data).then(res => res.data)
} 

