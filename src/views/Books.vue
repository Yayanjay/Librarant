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
              <v-dialog
                v-model="dialogAdd"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addedItem.bookName"
                            label="Book Title"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addedItem.bookImage"
                            label="Book Image"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addedItem.bookAuthor"
                            label="Book Author"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="addedItem.genreId"
                            :items="genre"
                            label="Genre"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
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
            <v-btn depressed outlined class="pa-2 ml-2" color="light-green">
              <v-icon
                @click="editItem(item)"
              >
                fa fa-edit
              </v-icon>
            </v-btn>

            <v-btn depressed outlined class="pa-2 ml-2" color="red">
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
      { text: 'Cover', value: 'bookImage', sortable: false },
      {
        text: 'Title',
        align: 'start',
        value: 'bookName',
      },
      { text: 'Author', value: 'bookAuthor' },
      { text: 'Genre', value: 'genreId.genre' },
      { text: 'Actions', value: 'action', sortable: false, align: 'center' },
    ],
    books: [],
    genre: ['Fiksi', 'Non Fiksi'],
    addedItem: {

    },
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

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      Axios({
        method: 'get',
        url: "http://localhost:3200/api/books"
      })
      .then((res) => {
          this.books = res.data.result
          console.log(res.data.result)
        }).catch((err) => {
          console.log(err)
        });
    },
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
      this.dialog = false
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

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },

  mounted() {
    this.fetch()
  }
}
</script>

<style>

</style>