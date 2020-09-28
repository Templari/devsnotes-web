function authenticate(token = null) {
    if (token) {
        setCookie('token', token, 1)
        return true
    }

    return false
}

function logout(res, status) {
    let ok = status == 200

    if (ok) {
        deleteCookie('token')
    }

    return ok
}