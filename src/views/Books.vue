<template>
  <div>
    <TopNav />
    <v-container fluid >
      <template>
        <v-data-table
          :headers="headers"
          :items="books"
          class="elevation-3"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Books</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogAdd" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Add Book
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Add Book</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Book Title"
                            required
                            v-model="addBookForm.bookName"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Book Author"
                            required
                            v-model="addBookForm.bookAuthor"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Image URL"
                            required
                            v-model="addBookForm.bookImage"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            :items="genres"
                            label="Genre"
                            required
                            v-model="addBookForm.genreId"
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-textarea
                            counter
                            label="Summary"
                            required
                            v-model="addBookForm.bookDesc"
                            :rules="descRules"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="submitAddBookForm">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:[`item.bookImage`]="{ item }">
            <div class="p-2">
              <v-img :src="item.bookImage" :alt="item.name" width="100px" class="ma-2"></v-img>
            </div>
          </template>
          
          <template v-slot:[`item.action`]="{ item }">
            <v-btn depressed dark class="pa-2 ml-2" color="light-green">
              <v-icon
                @click="editItem(item)"
              >
                fa fa-edit
              </v-icon>
            </v-btn>

            <v-btn depressed dark class="pa-2 ml-2" color="red">
              <v-icon
                @click="deleteItem(item)"
              >
                far fa-trash-alt
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </template>
    </v-container>
  </div>
</template>

<script>
import Axios from 'axios'
import TopNav from '../components/TopNav.vue'
export default {
  name: "books",
  components: {
    TopNav
  },
  data: () => ({
    dialogAdd: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'No', value: 'bookId'},
      { text: 'Cover', value: 'bookImage', sortable: false },
      { text: 'Title', align: 'start', value: 'bookName',},
      { text: 'Author', value: 'bookAuthor'},
      { text: 'Genre', value: 'genreId.genre'},
      { text: 'Actions', value: 'action', sortable: false, align: 'center'},
    ],
    books: [],
    genres: [],
    number: [],
    addBookForm: {
      bookName : null,
      bookAuthor: null,
      bookImage: null,
      bookDesc: null,
      genreId: null
    },
    addedItem: {

    },
    descRules: [v => v.length <= 255 || 'Max 255 characters'],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialogAdd = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    submitAddBookForm() {
      const creds = JSON.parse(localStorage.getItem("creds"))
      switch (this.addBookForm.genreId) {
        case "Comedy":
          this.addBookForm.genreId = 1
          break;
        case "Fantasy":
          this.addBookForm.genreId = 2
          break;
        case "Fiction":
          this.addBookForm.genreId = 3
          break;
        case "Historical":
          this.addBookForm.genreId = 4
          break;
        case "Horror":
          this.addBookForm.genreId = 5
          break;
        case "Mystery":
          this.addBookForm.genreId = 6
          break;
        case "Non-Fiction":
          this.addBookForm.genreId = 7
          break;
        case "Romance":
          this.addBookForm.genreId = 8
          break;
        default:
          break;
      }

      // const data = {

      // }

      Axios({
        method: 'POST',
        url: 'http://localhost:3200/api/books',
        headers: {'Authorization': `Bearer ${creds.token}`},
        data: this.addBookForm
      })
      .then((res) => {
        alert("Add Book Succeed")
        console.log(res);
      }).catch((err) => {
        console.log(this.addBookForm);
        console.log(err);
      });

    },
    fetchGenres() {
      const creds = JSON.parse(localStorage.getItem("creds"))
      
      Axios({
        method: 'get',
        url: "https://api-librarent.herokuapp.com/api/genre",
        headers: {'Authorization': `Bearer ${creds.token}`},
      })
      .then((res) => {
        for (let i = 0; i < res.data.result.length; i++) {
          const category = res.data.result[i];
          this.genres.push(category.genre)
          
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
    
    fetchBook () {
      const creds = JSON.parse(localStorage.getItem("creds"))

      Axios({
        method: 'get',
        url: "https://api-librarent.herokuapp.com/api/books",
        headers: {'Authorization': `Bearer ${creds.token}`},
      })
      .then((res) => {
        for (let i = 0; i < res.data.result.length; i++) {
          const book = res.data.result[i];
          this.number.push(book.bookId)
          // console.log(book);
          
        }
          console.log(this.number);
          this.books = res.data.result
        })
      .catch((err) => {
        console.log(err)
      });
    },
  },

  mounted() {
    this.fetchBook(),
    this.fetchGenres()
  }
}
</script>

<style>

</style>