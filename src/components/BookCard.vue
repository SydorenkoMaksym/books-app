<template>
  <li class="book">
    <h2 class="book__title">{{ book.title }}</h2>
    <p class="book__publish-date">{{ formatedDate }}</p>
    <p class="book__description">{{ book.description }}</p>
  </li>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    }
  },

  computed: {
    formatedDate: function() {
      return new Date(this.book.publishDate).toLocaleDateString();
    }
  }
};
</script>

<style>
.book {
  list-style: none;
	margin-left: 0;
	padding-left: 0;

  width: 100%;
  text-align: left;

  padding: 10px;
  margin: 5px;
  border: 1px solid;
}

@media (min-width: 767px) {
  .book {
    width: calc(50% - 32px);
  }
}

@media (min-width: 1024px) {
  .book {
    width: calc(33% - 30px);
  }
}

.book__description {
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 4; /* number of lines to show */
   line-height: 24px;        /* fallback */
   max-height: 96px;       /* fallback */
}
</style>