<template>
  <div>
    <v-app-bar>

			<v-btn plain @click.stop="drawer = !drawer">
        <v-icon>fas fa-bars</v-icon>
      </v-btn>

      <v-btn plain class="" to="/">
        LibraRent
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-btn outlined color="green" class="mx-3" to="/signin">
        Sign In
      </v-btn>

      <v-btn outlined color="green " class="mx-3" to="/signup">
        Sign Up
      </v-btn>
		</v-app-bar>


    <v-navigation-drawer v-model="drawer" :width="400" absolute temporary app >

      <!-- header navigation drawer -->
      <v-card class="text-center" elevation="0">
        <v-avatar >
          <v-img class="ava mx-auto mt-10" src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-avatar>
        <v-card-title class="justify-center">Admin Magang</v-card-title>
        <v-card-subtitle>adminmagang@gmail.com</v-card-subtitle>
      </v-card>

			<!-- menu list navigation drawer -->
      <v-list>
        <!-- default render (any user can access) -->
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.routes"
					link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

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
      { title: 'History', icon: 'fa fa-history', routes: '/history' },
      { title: 'Profile', icon: 'fa fa-user', routes: '/profile' },
      { title: 'Books', icon: 'fa fa-book', routes: '/books' },
    ],
    features: [
      { title: 'Book', icon: 'fa fa-book', routes: '/book'},
    ]
  }),
}
</script>

<style>

</style>