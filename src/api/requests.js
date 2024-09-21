import { getToken, removeToken, storeToken } from '../utils/storageHelpers.js';

export async function authorise(name, password, isRemembered = false) {
    let success = true;
    return fetch("https://localhost:7278/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, password
        })
    })
        .then(response => { if (response.ok) return response.text(); else throw new Error(response.status) })
        .then(token => { storeToken(token); return success; })
        .catch(error => { removeToken(); return !success });
}

// use react router to go to main page with todos and use loading prop to load todos when access page 
export function getTodos() {
    return fetch("https://localhost:7278/api/Todo", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => { if (response.ok) return response.json(); else throw new Error(response.status) })
        .then(data => data)
        .catch(error => { console.error(error); return null });
}