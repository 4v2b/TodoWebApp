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

export async function getTodos() {
    try {
        const response = await fetch("https://localhost:7278/api/Todo", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (response.ok) {
            return await response.json();
        }
        else throw new Error(response.status)
    } catch (error) {
        console.error(error); return null
    }
}

export async function putTodoItem(todoItem) {
    // console.log(getToken())
    // console.log(todoItem)
    try {
        const response = await fetch(`https://localhost:7278/api/todo/items/${todoItem.id}`, {
            method: "PUT",
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify( {
                ...todoItem
            })
        });

        if (response.ok) {
            return await response.json();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}

export async function postTodoItem(listId, todoItem) {
    try {
        const response = await fetch(`https://localhost:7278/api/todo/${listId}`, {
            method: "POST",
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify( {
                ...todoItem
            })
        });

        if (response.ok) {
            return await response.json();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}

export async function deleteTodoItem(itemId) {
    try {
        const response = await fetch(`https://localhost:7278/api/todo/items/${itemId}`, {
            method: "DELETE",
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });


        // todo : return true or false depending on status

        if (response.ok) {
            return await response.text();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}