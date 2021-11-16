<template>
  <div>
    <Topnav />
    <v-container fluid>
      <v-row class="text-center mt-4">
        <v-col md="4" sm="12" xs="2">
          <v-card class="elevation-3 rounded-lg" color="pink lighten-4">
            <v-card-title class="justify-center">Book borrowed</v-card-title>
            <v-card-subtitle class="text-overline">5</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col md="4" sm="12" xs="2">
          <v-card class="elevation-3 rounded-lg" color="blue lighten-4">
            <v-card-title class="justify-center">Book returned</v-card-title>
            <v-card-subtitle class="text-overline">10</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col md="4" sm="12" xs="2">
          <v-card class="elevation-3 rounded-lg" color="purple lighten-4">
            <v-card-title class="justify-center">Total books</v-card-title>
            <v-card-subtitle class="text-overline">{{histories.length}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-card class="my-2 rounded-lg">
        <v-card-title class="text-h6">Graph</v-card-title>
        <v-divider></v-divider>
        <v-sparkline
          :value="value"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
        ></v-sparkline>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="histories"
        :items-per-page="5"
        class="table elevation-3 text-button"
      ></v-data-table>

    </v-container>
  </div>
</template>

<script>
import Axios from 'axios'
import Topnav from '../components/TopNav'
export default {
  name: "History",
  data: () => ({
      width: 1,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      headers: [
        { text: 'No',
          align: 'start',
          value: 'historyId',
        },
        { text: 'Librarian', value: 'librarian' },
        { text: 'Date', value: 'date' },
        { text: 'Book', value: 'bookId.bookName' },
        { text: 'Borrower', value: 'userId.userName' },
        { text: 'Status', value: 'status' },
      ],
      histories: []
  }),
  components: {
    Topnav
  },
  methods: {
    fetchHistories() {
      const creds = JSON.parse(localStorage.getItem("creds"))
      Axios({
        method: "get",
        url: "https://api-librarent.herokuapp.com/api/history",
        headers: {'Authorization': `Bearer ${creds.token}`},
      })
      .then((res) => {
        this.histories = res.data.result
        console.log(this.histories);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.fetchHistories()
  }
}
</script>

<style>


</style>