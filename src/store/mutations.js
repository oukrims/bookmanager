
import { mutations } from './types'

export default {

    [mutations.ADD_BOOK]:(state, payload) => {
        state.books = [...state.books, payload]
    },

    [mutations.DELETE_BOOK]:(state, payload) => {
        state.books = state.books.filter(b => b.id !== payload.id)
    },

    [mutations.TOGGLE_STATUS_BOOK]:(state, payload) => {
        state.books = state.books.filter(b => {
            if (b.id === payload.id) {
                b.read = !b.read
            }
            return b
        })
    },

    [mutations.REMOVE_ALL_BOOKS]:(state) => {
        state.books = []
    },

    [mutations.SAVE_BOOKS]:(state) => {
        window.localStorage.setItem('bookmanager', JSON.stringify(state.books))
    },

    [mutations.SELECT_BOOK]:(state, payload) => {
        if (payload) {
            state.selectedBook = payload
        } else {
            state.selectedBook = null
        }
    },

    [mutations.UPDATE_BOOK]:(state, payload) => {
        state.books = state.books.filter(b => {
            if (b.id === payload.id) {
                Object.assign(b, payload)
            }
            return b
        })
        state.selectedBook = null
    },

    [mutations.INIT_BOOKS]:(state) => {
        if (window.localStorage.getItem('bookmanager')) {
            let books = JSON.parse(window.localStorage.getItem('bookmanager'))
            state.books = books.map(b => {
                b.date = new Date(b.date)
                return b
            })
        }
    }      
}