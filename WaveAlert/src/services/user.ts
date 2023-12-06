import axios from './axios';

export function tryLogin(data:{mail:string, pass:string})
{
    return axios.post("login", data).then(res => res.data)
}

export function logout(data:{mail:string, pass:string})
{
    console.log(data)
    return axios.post("logout", data).then(res => res.data)
}   