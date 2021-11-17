<template>
  <section class="container">
    <h1 class="title">Books app</h1>
    <div>
      <p>Pagination</p> 
      <p>Current page: {{page}}</p>
      <button
        class="button"
        @click="page = page - 1"
        :disabled="page === 1"
      >
        Previous page
      </button>
      <button
        class="button"
        @click="page = page + 1"
        :disabled="!hasNextPage"
      >
        Next page
      </button>

      <div class="filter">Filter: <input v-model="filter" /></div>
    </div>
    <div class="books-list">
      <book-card v-for="book in paginatedBooks"
                 :key="book.id"
                 v-bind:book="book"
                 class="books-list__item" />
    </div>
  </section>

  
</template>

<script>
import {loadBooks} from './services/api';
import BookCard from "./components/BookCard.vue";

export default {
  name: 'books-app',

  components: {
    BookCard
  },

  data() {
    return {
      books: [],

      filter: "",

      page: 1,
      bookPerPageCount: 12
    }
  },

  created() {
    this.getBooksData();
  },

  computed: {
    startIndex() {
      return (this.page - 1) * this.bookPerPageCount;
    },

    endIndex() {
      return this.page * this.bookPerPageCount;
    },

    filteredBooks() {
      return this.books.filter(book => book.title.includes(this.filter));
    },

    paginatedBooks() {
      return this.filteredBooks.slice(this.startIndex, this.endIndex);
    },

    hasNextPage() {
      return this.filteredBooks.length > this.endIndex;
    }
  },

  methods: {
    async getBooksData() {
      const booksData = await loadBooks();
      this.books = booksData;
    }
  },

  watch: {
    filter() {
      this.page = 1;
    },

    paginatedBooks() {
      if (this.paginatedBooks.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    },
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  padding: 0 10px;
  max-width: 1600px;
  margin: 0 auto;
}

.button {
  margin: 10px;
}

.filter {
  margin-top: 20px;
}

.books-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 20px;
}
</style>
