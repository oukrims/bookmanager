
import { actions, mutations } from './types'
import uuid from 'uuid'

export default {

    [actions.ADD_BOOK]:({commit, state}, payload) => {
        
        let book = {}

        if (payload.id && state.books.find(b => b.id === payload.id)) {
            Object.assign(book, payload)
            commit(mutations.UPDATE_BOOK, book)
        } else {
            Object.assign(book, payload, { id:uuid.v1(), date:new Date() })
            commit(mutations.ADD_BOOK, book)
        }
        
        commit(mutations.SAVE_BOOKS)
    },

    [actions.DELETE_BOOK]:({commit}, payload) => {
        let confirm = window.confirm('Êtes vous certain de vouloir supprimer ce livre ?')
        if (confirm) {
            commit(mutations.DELETE_BOOK, payload)
            commit(mutations.SAVE_BOOKS)
        }
    },

    [actions.TOGGLE_STATUS_BOOK]:({commit}, payload) => {
        commit(mutations.TOGGLE_STATUS_BOOK, payload)
        commit(mutations.SAVE_BOOKS)
    },

    [actions.REMOVE_ALL_BOOKS]:({commit}) => {
        let confirm = window.confirm('Êtes vous certain de vouloir supprimer tous les livres ?')
        if (confirm) {
            commit(mutations.REMOVE_ALL_BOOKS)
            commit(mutations.SAVE_BOOKS)
        }
    },

    [actions.SAVE_BOOKS]:({commit}) => {
        commit(mutations.SAVE_BOOKS)
    },

    [actions.INIT_BOOKS]:({commit}) => {
        commit(mutations.INIT_BOOKS)
    },

    [actions.SELECT_BOOK]:({commit}, payload) => {
        commit(mutations.SELECT_BOOK, payload)
    }
}