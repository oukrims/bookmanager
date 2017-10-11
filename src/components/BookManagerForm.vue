<template>
    <div class='book-form'>
        <form @submit.prevent='handleForm'>
            <button @click='closeForm' class="book-form__close" arial-label='Fermer le formulaire'><span>&times;</span></button>
            <h2 class="book-form__title">{{isSelectedBook ? "Éditer" : "Ajouter"}} un livre</h2>
            <div>
                <label for='title'>Titre du livre</label>
                <input type='text' v-model='book.title' id='title' placeholder="Titre du livre">
            </div>
            <div>
                <label for='author'>Auteur</label>
                <input type='text' v-model='book.author' id='author' placeholder="Auteur">
            </div>
            <div>
                <label for='comment'>Commentaire <small>(optionnel)</small></label>
                <textarea v-model='book.comment' id='comment' placeholder="Commentaire"></textarea>
            </div>
            <div class="pull-right">
                <label for='read'>
                    <input type='checkbox' v-model='book.read' id='read'> livre lu
                </label>
            </div>
            <input v-if='!isSelectedBook' :disabled='!isValid' type='submit' value='Ajouter le livre'>
            <input v-else :disabled='!isValid' type='submit' value='Editer le livre'>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { actions } from '../store/types'
    import EventBus from '../Event.vue'

    export default {
        data () {
            return {
                book:{
                    title:'',
                    author:'',
                    comment:'',
                    read:false
                }
            }
        },
        computed: {
            isValid () {
                return this.book.title.trim() && this.book.author.trim()
            },
            isSelectedBook () {
                return this.$store.getters.selectedBook
            }
        },
        methods:Object.assign({}, mapActions({
            addBook:actions.ADD_BOOK
        }),
        {   closeForm () {
                this.resetBook()
                this.$emit('close')
            },            
            resetBook () {
                this.book = {
                        title:'',
                        author:'',
                        comment:'',
                        read:false
                    }
            },
            handleForm() {
                if (this.isValid) {
                    this.addBook(Object.assign({}, this.book))
                    this.resetBook()
                    this.$emit('close')
                }
            }
        }),
        created () {
            EventBus.$on('editBook', (value) => {
                this.book = Object.assign({}, value)                
            })
        }
    }
</script>

<style lang='scss'>

    .pull-right {
        text-align: right;
    }

    .book-form {

        position:fixed;
        z-index:10;
        left:0;
        right:0;
        top:0;
        bottom:0;        
        width:100%;
        background:darken(complement(#3a4752), 10%);

        &__title {
            text-align: center;
            margin-bottom:1em; 
        }

        &__close {            
            border:none;
            text-align: center;
            border-radius: 50%;
            width:26px;
            height:26px;
            line-height: 20px;
            font-size: 1em;
            position:absolute;
            top:-.5em;
            right:-.5em;
            padding:.3em;
        }
    }

    form {        
        width: 100%;
        position:absolute;
        padding: 1em;
        max-width: 800px; 
        top:50%;
        transform:translateY(-50%);
        left:0;
        right:0;
        bottom:0;   

        @media screen and (min-width:600px) {
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            right:initial;
            bottom:initial; 
        }   

        label {
            display:block;
            margin:10px 0;
        }

        input[type=text],
        textarea {
            border:none;
            font-family: inherit;
            font-size: .95em;
            width:100%;
            padding:6px;
        }

        input[type=submit] {
            padding:6px;
            margin:0 0 0 auto;
            display: block;
        }

        div {

            @media screen and (min-width:600px) {
                margin:10px 0;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                small {
                    display:block;
                }

            }

            > label {
                flex:1;
            }

            > input,
            > textarea {
                flex:2;
            }
        }

    }
</style>
