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
            <v-card-subtitle class="text-overline">20</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-card class="my-2 rounded-lg">
        <v-card-title class="text-h6">REVENUE</v-card-title>
        <v-divider></v-divider>
        <v-sparkline
          :value="value"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
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
        {
          text: 'Invoices',
          align: 'start',
          value: 'invoice',
        },
        { text: 'Cashier', value: 'cashier' },
        { text: 'Date', value: 'date' },
        { text: 'Orders', value: 'order' },
        { text: 'Amount', value: 'amount' },
      ],
      histories: [
        {
          invoice: '#11342',
          cashier: 'Zayyan',
          date: '05.40 AM, 8 September 2021',
          order: ['Black Forest', ' Coffee Latte'],
          amount: 'Rp ' + 45000,
        },
        {
          invoice: 'Ice cream sandwich',
          cashier: 237,
          date: 9.0,
          order: 37,
          amount: 4.3,
        },
        {
          invoice: 'Eclair',
          cashier: 262,
          date: 16.0,
          order: 23,
          amount: 6.0,
        },
        {
          invoice: 'Cupcake',
          cashier: 305,
          date: 3.7,
          order: 67,
          amount: 4.3,
        },
        {
          invoice: 'Gingerbread',
          cashier: 356,
          date: 16.0,
          order: 49,
          amount: 3.9,
        },
        {
          invoice: 'Jelly bean',
          cashier: 375,
          date: 0.0,
          order: 94,
          amount: 0.0,
        },
        {
          invoice: 'Lollipop',
          cashier: 392,
          date: 0.2,
          order: 98,
          amount: 0,
        },
        {
          invoice: 'Honeycomb',
          cashier: 408,
          date: 3.2,
          order: 87,
          amount: 6.5,
        },
        {
          invoice: 'Donut',
          cashier: 452,
          date: 25.0,
          order: 51,
          amount: 4.9,
        },
        {
          invoice: 'KitKat',
          cashier: 518,
          date: 26.0,
          order: 65,
          amount: 7,
        },
      ],
  }),
  components: {
    Topnav
  }
}
</script>

<style>


</style>