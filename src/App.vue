<template>
  <div id="app" v-cloak>
    <book-manager>
      <book v-for='b in books' :book='b' :key='b.id'></book>
    </book-manager>
  </div>
</template>

<script>
import BookManager from './components/BookManager.vue'
import Book from './components/Book.vue'
import { mapGetters } from 'vuex'
import { actions } from './store/types'

export default {
  name: 'app',
  components:{
    'book-manager':BookManager,
    'book':Book
  },
  computed:mapGetters(['books']),
  created () {
    this.$store.dispatch(actions.INIT_BOOKS)
  }
}
</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Droid+Sans');

  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  [v-cloak] {
    opacity:0;
  }

  body {
    background:#c0392b;
    color:white;
    font-family: 'Droid Sans', 'Helvetica', 'Arial', sans-serif;
  }

  button, input[type=submit] {
    all:unset;
    box-sizing: border-box;
    cursor: pointer;
    padding:8px;
    border:none;
    background:rgba(255,255,255,.2);
    font-size:.75em;
    letter-spacing: .5px;
    text-transform: uppercase;
    transition:280ms;

    &:hover, &:focus {
      background:rgba(255,255,255,.35);
    }

    &.small {
      padding:6px;
      font-size: .7em;
    }

    &.danger:hover {
      background:#d65151;
    }

    &.status:hover {
      background:#2f4f4f;
    }

    &.edit:hover {
      background:#77b785;
    }

  }

  button:disabled, input[type=submit]:disabled {
    opacity:.8;
    cursor: not-allowed;
  }

  #app {
    padding:20px;
    min-height: 100vh;
    display: grid;
  }
</style>
