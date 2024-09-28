export function storeToken(token, isRemembered) {
    if (isRemembered) {
        localStorage.setItem('token', token);
    } else {
        sessionStorage.setItem('token', token);
    }
}

export function removeToken() {
    localStorage.removeItem('token');
    sessionStorage.clear();
}

export function getToken(){
    return localStorage.getItem('token') || sessionStorage.getItem('token')
}