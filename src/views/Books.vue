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
                        <v-col cols="6">
                          <v-select
                            :items="genres"
                            label="Genre"
                            required
                            v-model="addBookForm.genreId"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            :items="types"
                            label="Type"
                            required
                            v-model="addBookForm.typeId"
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-textarea
                            counter
                            label="Summary"
                            required
                            v-model="addBookForm.bookDesc"
                            hint="Max 400 characters"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="submitAddBookForm">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogEdit" max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Edit Book</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Book Title"
                            required
                            
                            v-model="editBookForm.bookName"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Book Author"
                            required
                            
                            v-model="editBookForm.bookAuthor"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Image URL"
                            required
                            
                            v-model="editBookForm.bookImage"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            :items="genres"
                            label="Genre"
                            required
                            v-model="editBookForm.genreId"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            :items="types"
                            label="Type"
                            required
                            v-model="editBookForm.typeId"
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-textarea
                            counter
                            label="Summary"
                            required
                            v-model="editBookForm.bookDesc"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="submitEditBookForm">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this book?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
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
            <v-btn depressed dark class="pa-2 ml-2" color="light-green" @click="editItem(item)">
              <v-icon>
                fa fa-edit
              </v-icon>
            </v-btn>

            <v-btn depressed dark class="pa-2 ml-2" color="red" @click="deleteItem(item)">
              <v-icon>
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
import TopNavAdmin from '../components/TopNavAdmin.vue'
import TopNavUser from '../components/TopNavUser.vue'
export default {
  name: "books",
  components: {
    TopNav,
    TopNavAdmin,
    TopNavUser
  },
  data: () => ({
    creds : JSON.parse(localStorage.getItem("creds")),
    dialogAdd: false,
    dialogDelete: false,
    dialogEdit: false,
    search: '',
    headers: [
      { text: 'No', value: 'bookId'},
      { text: 'Cover', value: 'bookImage', sortable: false },
      { text: 'Title', align: 'start', value: 'bookName',},
      { text: 'Author', value: 'bookAuthor'},
      { text: 'Type', value: 'typeId.type'},
      { text: 'Genre', value: 'genreId.genre'},
      { text: 'Actions', value: 'action', sortable: false, align: 'center'},
    ],
    books: [],
    genres: [],
    types: [],
    number: [],
    addBookForm: {
      bookName : null,
      bookAuthor: null,
      bookImage: null,
      bookDesc: null,
      genreId: null,
      typeId: null,
    },
    editBookForm: {
      bookName : null,
      bookAuthor: null,
      bookImage: null,
      bookDesc: null,
      genreId: null,
      typeId: null,
    },
    editedItem: null,
    deletedItem: null
    
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  methods: {
    editItem (item) {
      this.editBookForm.bookName = item.bookName
      this.editBookForm.bookAuthor = item.bookAuthor
      this.editBookForm.bookImage = item.bookImage
      this.editBookForm.genreId= item.genreId.genre
      this.editBookForm.typeId= item.typeId.type
      this.editBookForm.bookDesc = item.bookDesc
      this.editedItem = item.bookId
      this.dialogEdit = true
      console.log(this.editBookForm);
      console.log(this.editedItem);

    },

    deleteItem (item) {
      this.deletedItem = item.bookId
      this.dialogDelete = true
      console.log(this.deletedItem);
    },
    submitEditBookForm() {
      const creds = JSON.parse(localStorage.getItem("creds"))
      switch (this.editBookForm.genreId) {
        case "Comedy":
          this.editBookForm.genreId = 1
          break;
        case "Fantasy":
          this.editBookForm.genreId = 2
          break;
        case "Fiction":
          this.editBookForm.genreId = 3
          break;
        case "Historical":
          this.editBookForm.genreId = 4
          break;
        case "Horror":
          this.editBookForm.genreId = 5
          break;
        case "Mystery":
          this.editBookForm.genreId = 6
          break;
        case "Non-Fiction":
          this.editBookForm.genreId = 7
          break;
        case "Romance":
          this.editBookForm.genreId = 8
          break;
        default:
          break;
      }

      switch (this.editBookForm.typeId) {
        case "Comic":
          this.editBookForm.typeId = 1
          break;
        case "Encyclopedia":
          this.editBookForm.typeId = 2
          break;
        case "Novel":
          this.editBookForm.typeId = 3
          break;
        default:
          break;
      }

        console.log(this.editBookForm);
      Axios({
        method: 'PUT',
        url: `https://api-librarent.herokuapp.com/api/books/${this.editedItem}`,
        // url: `http://localhost:3200/api/books/${this.editedItem}`,
        headers: {'Authorization': `Bearer ${creds.token}`,},
        data: this.editBookForm
      })
      .then((res) => {
        alert("Update Book Succeed")
        location.reload()
        console.log(res);
      }).catch((err) => {
        // console.log();
        console.log(err);
      });


    },
    deleteItemConfirm() {
      const creds = JSON.parse(localStorage.getItem("creds"))

      Axios({
        method: 'DELETE',
        url: `https://api-librarent.herokuapp.com/api/books/${this.deletedItem}`,
        headers: {'Authorization': `Bearer ${creds.token}`,},
      })
      .then((res) => {
        alert("Delete Book Succeed")
        location.reload()
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
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

      switch (this.addBookForm.typeId) {
        case "Comic":
          this.addBookForm.typeId = 1
          break;
        case "Encyclopedia":
          this.addBookForm.typeId = 2
          break;
        case "Novel":
          this.addBookForm.typeId = 3
          break;
        default:
          break;
      }

      Axios({
        method: 'POST',
        url: 'https://api-librarent.herokuapp.com/api/books',
        headers: {'Authorization': `Bearer ${creds.token}`,},
        data: this.addBookForm
      })
      .then((res) => {
        alert("Add Book Succeed")
        location.reload()
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });

    },
    fetchTypes() {
      const creds = JSON.parse(localStorage.getItem("creds"))
      
      Axios({
        method: 'get',
        url: "https://api-librarent.herokuapp.com/api/type",
        headers: {'Authorization': `Bearer ${creds.token}`},
      })
      .then((res) => {
        for (let i = 0; i < res.data.result.length; i++) {
          const data = res.data.result[i];
          this.types.push(data.type)
          
        }
      })
      .catch((err) => {
        console.log(err)
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
          const data = res.data.result[i];
          this.genres.push(data.genre)
          
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
          
        }
        this.books = res.data.result
        console.log(this.books);
      })
      .catch((err) => {
        console.log(err)
      });
    },
  },

  mounted() {
    this.fetchBook()
    this.fetchGenres()
    this.fetchTypes()
  },

}
</script>

<style>

</style>