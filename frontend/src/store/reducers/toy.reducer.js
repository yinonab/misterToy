import { toyService } from "../../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const FILTER_TODO = 'FILTER_TODO'
export const SET_PAGE_IDX = 'SET_PAGE_IDX'

const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter()
}



export function toyReducer(state = initialState, action = {}) {
    let toys
    let lastToys
    switch (action.type) {
        //Toys
        case SET_TOYS:
            lastToys = [...action.toys]
            return { ...state, toys: action.toys, lastToys }

        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        //Filter
        case FILTER_TODO:
            return { ...state, filterBy: action.filterBy }
        case SET_PAGE_IDX:
            return { ...state, filterBy: { ...state.filterBy, pageIdx: action.pageIdx } };

        default:
            return state;
    }
}