<template>
  <div>
    <TopNav />

    <v-container fluid>
      <v-row>
        <Card/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue"
import Card from '../components/Card.vue'


export default {
    name: 'Home',
    data: () => ({
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      books: []
    }),
    components: {
      TopNav,
      Card,
    }
}
</script>

<style>
</style>