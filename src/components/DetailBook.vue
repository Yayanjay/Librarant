<template>
  <div>
    <div v-if="creds.authenticated == true">
      <div v-if="creds.role[0] == 'user'">
        <TopNavUser/>
      </div >
      <div v-else-if="creds.role[0] == 'admin'">
        <TopNavAdmin/>
      </div>
      <div v-else>
        <TopNav />
      </div>
    </div>
    <div v-else>
      <TopNav />
    </div>
    <v-container class="mt-5">
      <v-toolbar flat color="grey lighten-3">
        <v-btn fab small plain to="/"> 
          <v-icon>
            fa-arrow-left
          </v-icon> 
        </v-btn> 
      </v-toolbar>
      <v-row>
        <v-col cols="4" class="pa-3">
          <v-img 
            class="ma-4"
            width="90%"
            :src="book.bookImage"
          >
          </v-img>
        </v-col>
        <v-col cols="8" class="mt-4">
          <v-card height="53vh" class="d-flex flex-column">
            <div class="ma-2">
              <v-chip
                class="my-2 mx-1"
                color="orange"
                text-color="white"
              >
                {{ book.typeId.type }}
              </v-chip>
              <v-chip
                class="my-2 mx-1"
                color="green"
                text-color="white"
              >
                {{ book.genreId.genre }}
              </v-chip>
            </div>
            <v-card-title>{{book.bookName}}</v-card-title>
            <v-card-text class="text-button mt-n4">{{ book.bookAuthor }}</v-card-text>
            <v-card-text>
              {{ book.bookDesc }}
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-action class="d-flex flex-column ma-3">
              <v-spacer></v-spacer>
              <v-btn class="mt-4" dark color="yellow darken-2" @click.stop="dialogBorrow = true">Borrow this Book</v-btn>
            </v-card-action>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

          <!-- <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this book?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
    <v-dialog v-model="dialogBorrow" max-width="560px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to Borrow this book?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="borrowItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
	</div>
</template>

<script>
import Axios from 'axios'
import TopNav from '../components/TopNav.vue'
import TopNavAdmin from '../components/TopNavAdmin.vue'
import TopNavUser from '../components/TopNavUser.vue'
export default {
  name: "DetailBook",
  components: {
    TopNav,
    TopNavAdmin,
    TopNavUser
  },
	data: () => ({
    creds : JSON.parse(localStorage.getItem("creds")),
    book : null,
    dialogBorrow: false,

	}),
  methods: {
    borrowItemConfirm() {
      const creds = JSON.parse(localStorage.getItem("creds"))

      const borrowForm = {
        userId: creds.id,
        bookId: this.$route.params.id,
        status: "Borrowed"
      }

      Axios({
        method: 'POST',
        url: 'https://api-librarent.herokuapp.com/api/history',
        headers: {'Authorization': `Bearer ${creds.token}`},
        data: borrowForm
      })
      .then((res) => {
        alert("Borrow succeed")
        location.reload()
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },

    fetchBook () {
      const creds = JSON.parse(localStorage.getItem("creds"))

      Axios({
        method: 'POST',
        url: `https://api-librarent.herokuapp.com/api/books/${this.$route.params.id}`,
        headers: {'Authorization': `Bearer ${creds.token}`},
      })
      .then((res) => {
        this.book = res.data.result
        console.log(this.book);
      })
      .catch((err) => {
        console.log(err)
      });
    },

    
  },

  mounted() {
    this.fetchBook()
  },


}
</script>

<style scoped>

</style>