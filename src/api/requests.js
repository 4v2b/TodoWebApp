import { removeToken, storeToken } from '../utils/storageHelpers.js';

export async function getJwt(name = "admin", password = "password", isRemembered = true) {
    fetch("https://localhost:7278/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, password
        })
    })
        .then(response => { if (response.ok) return response.text(); else throw new Error(response.status) })
        .then(token => storeToken(token))
        .catch(error => { console.error(error); removeToken() });
    return
}

export function getTodos() {

}