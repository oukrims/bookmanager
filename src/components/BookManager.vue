<template>
  <section class="book-manager">
    <h1 class="book-manager__title">Book Manager</h1>
    <div class="book-manager__wrapper">
        <transition-group class="book-manager__list" tag="div" name="fade">
            <slot></slot>
        </transition-group>
    </div>
    <transition name="fade">
        <book-form @close='showForm = false' v-show='showForm'></book-form>
    </transition>
    <footer class="book-manager__footer">
        <div class='actions'>
            <button class="danger" @click='removeAllBooks'>Supprimer tous les livres</button>
            <button @click='openForm'>Ajouter un livre</button>
        </div>
    </footer>
  </section>
</template>

<script>
    import EventBus from '../Event.vue'
    import BookForm from './BookManagerForm.vue'
    import { actions } from '../store/types'
    import { mapActions } from 'vuex'

    export default {
        components: {
            'book-form':BookForm
        },
        data () {
            return {
                showForm:false
            }
        },
        methods:Object.assign({}, {
                openForm () {
                    this.showForm = true
                    this.selectBook(null)
                },
            },
            mapActions({
                saveBooks:actions.SAVE_BOOKS,
                removeAllBooks: actions.REMOVE_ALL_BOOKS,
                selectBook:actions.SELECT_BOOK
            })
        ),
        created () {
            EventBus.$on('editBook', () => {
                this.showForm = true
            })
        }
    }
</script>

<style lang='scss'>

    .fade-enter {
        opacity:0;
    }

    .fade-enter-active {
        transition:280ms;
    }

    .fade-leave-active {
        opacity:0;
        transition:280ms;
    }

    .fade-move {
        transition:380ms;
    }

    .book-manager {

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        &__title {
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 1px 1px 0 black, 2px 2px 3px rgba(0,0,0,.5);
            text-align: center;
            margin-bottom:1em;
        }

        &__footer {
            padding:10px;
            text-align: center;

            a {
                color:inherit;
                text-decoration: none;
                font-size: .9em;
            }

            .actions {
                margin-bottom:.8em;
            }
        }

        &__wrapper {
            flex:1;
        }

        &__list {
            display: grid;
            grid-gap:1em;
            justify-content: center;
            grid-template-columns:repeat(auto-fit,minmax(340px, 380px));
        }
    }
</style>
