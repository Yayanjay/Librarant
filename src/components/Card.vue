<template>
  <div class="card d-flex flex-wrap justify-space-around justify-center" >
      <!-- <v-btn @click="test" x-small>
          test button
      </v-btn> -->  
      <v-card class="ma-3" width="250px" v-for="book in books" :key="book.id">
        <div class="cover">
          <v-img class="mx-auto" :src="book.bookImage" width="150px" ></v-img>
        </div>
          <v-card-title>
            {{ book.bookName }}
          </v-card-title>
          <v-card-subtitle>
            {{ book.bookAuthor }}
          </v-card-subtitle>
          <v-card-action>
            <v-btn class="ma-3 mt-0" width="90%" color="#fce38a" @click="detail(book.bookId)">View Detail</v-btn>
          </v-card-action>
      </v-card>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
    name : "Card",
    data: () => ({
      books: [],
    }),
    methods: {
      fetch() {
        Axios({
          method: 'get',
          url: "https://api-librarent.herokuapp.com/api/books",
        // url: `http://localhost:3200/api/books`,

        })
        .then((res) => {
            this.books = res.data.result
            console.log(this.books)
          }).catch((err) => {
            console.log(err)
          });
      },

      detail(id) {
        this.$router.push('/detail/' + id)
      }

    },
    mounted() {
      this.fetch()
    }

}
</script>

<style scoped>
.cover {
  object-fit: cover;
}

</style>