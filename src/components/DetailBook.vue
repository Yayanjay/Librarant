<template>
  <div>
    <v-container >
      <v-toolbar flat color="grey lighten-3">
        <v-btn fab small plain to="/"> 
          <v-icon @click="editItem(item)">
            fa-arrow-left
          </v-icon> 
        </v-btn>  
      </v-toolbar>
      <v-row>
        <v-col cols="4" class="pa-3">
          <v-img 
            class="ma-4"
            width="90%"
            src="https://user-images.githubusercontent.com/34501764/141655848-f3e40db4-152d-4b9d-8a73-35256ba45702.jpg"
          >
          </v-img>
        </v-col>
        <v-col cols="8">
          <v-card height="50vh">
            <div class="ma-2">
              <v-chip
                class="my-2 mx-1"
                color="orange"
                text-color="white"
              >
                Comic
              </v-chip>
              <v-chip
                class="my-2 mx-1"
                color="green"
                text-color="white"
              >
                Fantasy
              </v-chip>
            </div>
            <v-card-title>Jujutsu Kaisen 1</v-card-title>
            <v-card-text class="text-button ">Gege Akutami</v-card-text>
            <v-card-text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ab? Dolore eos labore minus voluptatum ratione ipsam sed temporibus? Modi deserunt veritatis excepturi dignissimos incidunt minus temporibus iste voluptates est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, sed optio? Beatae mollitia, minus temporibus ipsum magni quia sint nisi minima facere nobis architecto, ex consequuntur ut deserunt. Quasi, error, asperiores molestiae praesentium consequuntur obcaecati cupiditate officia unde quisquam rem alias quo debitis? Sapiente impedit recusandae, natus exercitationem accusamus ut vitae doloribus corporis, veniam id eaque cupiditate fugit laboriosam magnam odit dicta perferendis dignissimos consequatur. Ea nam amet deleniti iure voluptas fuga quas debitis fugit dolor aperiam? Commodi quidem consequuntur, facilis odio fugiat totam recusandae nihil, rem expedita eius, eaque cumque? A ut dolorem asperiores nostrum debitis, tempora sed quas.
            </v-card-text>
          </v-card>
          <v-btn class="mt-4" dark color="yellow darken-2" @click="borrow">Borrow this Book</v-btn>
        </v-col>
      </v-row>
    </v-container>
	</div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "DetailBook",
	data: () => ({
    borrowForm: {

    }

	}),
  methods: {
    borrow() {
      const creds = JSON.parse(localStorage.getItem("creds"))

      Axios({
        method: 'POST',
        url: 'https://api-librarent.herokuapp.com/api/books',
        headers: {'Authorization': `Bearer ${creds.token}`},
      })
    }
  }


}
</script>

<style scoped>

</style>