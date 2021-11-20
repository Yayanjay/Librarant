<template>
  <v-container class="mt-10">

    <v-card >
        <v-card-action>
            <v-btn class="ma-2" to="/">
                <v-icon>fa-arrow-left</v-icon>
                Go back
            </v-btn>
        </v-card-action>
        <v-img 
            class="mx-auto"
            width="70vh" 
            src="https://user-images.githubusercontent.com/34501764/142623186-bfcdfa1a-2502-4212-a516-61472cefdf2a.jpg">

        </v-img>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "unauthorized"
}
</script>

<style>
.tes {
    border: 4px solid black;
}
</style>