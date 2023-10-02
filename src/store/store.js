import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"
import { systemReducer } from "./reducers/system.reducer.js"
import { reviewReducer } from "./reducers/review.reducer.js"


const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

// console.log('store.getState():', store.getState())
window.gStore = store