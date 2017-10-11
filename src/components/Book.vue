<template>
    <div :class='["book", {read:book.read}]'>
        
        <div class="book__title">{{book.title}}</div>
        <div class="book__author"> par <strong>{{book.author}}</strong></div>
        
        <button class="book__btn__more small" @click='showMore = !showMore'>{{ !showMore ? "More" : "Close" }}</button>
        
        <div v-show='showMore' class="book__actions">
            <div class="book__more">
                <p class="book__comment" v-show='book.comment'>{{book.comment}}</p>
                <p class="book__meta">Ajouté le {{book.date | date}}</p>
            </div>
            <div class="book__actions">
                <button class="danger small" @click='removeBook(book)'>Supprimer</button>
                <button class="status small" @click='toggleRead(book)'>{{book.read ? "non lu" : "lu"}}</button>
                <button class="edit small" @click='editBook(book)'>Éditer</button>
            </div>
        </div>

    </div>
</template>

<script>
    
    import EventBus from '../Event.vue'
    import { actions } from '../store/types'
    import { mapActions } from 'vuex'

    export default {
        filters: {
            date: (value) => {
                let day = value.getDate()
                day = day >= 10 ? day : "0"+day
                let month = value.getMonth() + 1
                month = month >= 10 ? month : "0"+month
                let year = value.getFullYear()
                return `${day}/${month}/${year}`
            }
        },
        data () {
            return {
                showMore:false
            }
        },
        props:['book'],
        methods:Object.assign({}, mapActions({
            removeBook:actions.DELETE_BOOK,
            toggleRead:actions.TOGGLE_STATUS_BOOK,
            selectBook:actions.SELECT_BOOK
        }), {
            editBook (book) {
                EventBus.$emit('editBook', book)
                this.selectBook(book)
            }
        })
    }
</script>

<style lang='scss'>

    .book {

        position: relative;
        padding:1em 1em 2.7em;
        box-shadow: 0 0 10px rgba(0,0,0,.2);        
        align-self: start;
        background:linear-gradient(to right, rgba(255,255,255,.2), transparent 90%);

        &__btn__more {
            bottom:1em;
            right:calc(1em + 5px);
            position: absolute;
        }

         &__title {
            text-transform: uppercase;
            font-weight: 600;
        }   

        &__comment {
            font-size: .9em;
            padding:10px;
            background:linear-gradient(to right, rgba(255,255,255,.3), transparent);
            margin:10px 0;
        }

        &__author {
            opacity:.9;
            font-size:.95em;
            margin:10px 0;
        } 

        &__actions {
            text-align: right;
        }

        &__meta {
            text-align: left;
            font-size: .8em;
            opacity:.85;            
            margin:10px 0 10px;
        }
    }

    .read {
        .book__title {
            text-decoration: line-through;
        }
    }
</style>
