<template>
  <div>
    <div class="bg-yellow-50 h-screen flex items-center justify-center">
      <div class="">
        <div class="rounded-full border border-yellow-300 bg-yellow-100 mx-auto mb-3 w-28 h-28 flex justify-center items-center">
          <img src="/logo.png" alt="" class="w-2/3">
        </div>
        <div class="bg-white rounded shadow w-96 overflow-hidden">
          <div class="p-3 bg-yellow-300 font-bold text-center text-lg">
            WELCOME BACK
          </div>
          <div class="p-5">
            <div class="p-3 text-center mb-3 bg-red-50 border border-red-300 text-red-800 rounded" v-if="error">
              {{ error }}
            </div>
            <form action="" onsubmit="event.preventDefault()">
              <input type="text" placeholder="username" class="text-center outline-none focus:border-yellow-300 p-3 border rounded w-full mb-3" autofocus required v-model="username">
              <input type="password" placeholder="password" class="text-center outline-none focus:border-yellow-300 p-3 border rounded w-full mb-3" required v-model="password">
              <button class="p-3 text-center bg-yellow-200 outline-none text-yellow-800 border rounded w-full border-yellow-300" @click="login">
                <span v-if="loading">Loading...</span>
                <span v-if="!loading">LOGIN</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFirestore, useCollection } from 'vuefire';
import { collection, Timestamp, doc, getDocs, addDoc, query, orderBy, updateDoc, where } from 'firebase/firestore'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false,
      db: useFirestore()
    }
  },
  mounted() {
    let isLogged = localStorage.getItem('login')
    if (isLogged) {
      this.$router.replace({
        path: '/'
      })
    }
  },
  methods: {
    async login() {
      this.loading = true
      let col = collection(this.db, 'Admin');
      let data = await getDocs(query(col, where('username','==',this.username)));
      let valid = false;
      data.forEach(v => {
        if (this.password == v.data().password) {
          valid = true;
          return false;
        }
      })
      if (valid) {
        localStorage.setItem('login', true)
        this.$router.replace({
          path: '/'
        })
        return true;
      }
      this.error = 'Username atau password anda salah';
      this.loading = false;
    }
  },
}
</script>