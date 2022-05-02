import Axios from 'axios'

const state = {
    books : [],
    genres: [],
    types: [],
}

const getters = {
    books: (state) => {
        return state.books
    },
    types: (state) => {
        return state.types
    },
    genres: (state) => {
        return state.genres
    }
}
const actions = {
    fetchBooks({commit}) {
        Axios({
            method: 'GET',
            url: "https://api-librarent.herokuapp.com/api/books",

        })
        .then((res) => {
          commit("SET_BOOKS", res.data.result)
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
}
const mutations = {
    SET_BOOKS(state, data) {
        state.books = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}