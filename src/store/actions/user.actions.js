import { userService } from "../../services/user.service.js";
import { showErrorMsg } from "../../services/event-bus.service.js";
import { SET_USER, SET_USER_SCORE, SET_WATCHED_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";



export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
}

export async function checkout(diff) {
    try {
        const newScore = await userService.updateScore(diff)
        store.dispatch({ type: CLEAR_CART })
        store.dispatch({ type: SET_USER_SCORE, score: newScore })
    } catch (err) {
        console.error('user actions -> Cannot checkout:', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}