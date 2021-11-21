<template>
  <div>
    <v-app-bar>

			<v-btn plain @click.stop="drawer = !drawer">
        <v-icon>fas fa-bars</v-icon>
      </v-btn>

      <v-btn plain depressed class="" to="/">
        LibraRent
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-btn color="yellow lighten-4" class="mx-3" to="/signin">
        Sign In
      </v-btn>

      <v-btn color="yellow lighten-4 " class="mx-3" to="/signup">
        Sign Up
      </v-btn>
		</v-app-bar>


    <v-navigation-drawer v-model="drawer" :width="400" absolute temporary app >

      <!-- header navigation drawer -->
      <v-card class="text-center" elevation="0">
        
      </v-card>
      <v-row>
        <v-col class="mx-auto">
          <v-img class="mx-auto" src="https://user-images.githubusercontent.com/34501764/142628920-73386364-94d0-495a-9bb9-1ec6ef07cd67.jpg">
          </v-img>
            <div class="text-button mx-auto">May i know who you are?</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn large class="mx-auto" color="yellow lighten-4" to="/signin">
            Sign In
          </v-btn>
        </v-col>
      </v-row>

		</v-navigation-drawer>

  </div>
</template>

<script>
export default {
	name: "TopNav",
  data: () => ({
    drawer: null,
    items: [
      { title: 'Explore', icon: 'fa fa-compass', routes: '/' },
      { title: 'Profile', icon: 'fa fa-user', routes: '/profile' },
    ],
  }),
}
</script>

<style>

</style>