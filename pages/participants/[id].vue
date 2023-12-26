<template>
  <div class="container m-auto">
    <modalunggahan v-if="selectedUser" :data="selectedUser" @hide="selectedUser=null"></modalunggahan>
    <div class="shadow rounded bg-white overflow-hidden">
      <div class="p-5 bg-yellow-200 border-b border-yellow-500 text-yellow-800">
        <ul class="flex divide-x divide-yellow-600">
          <li class="px-3 hover:underline uppercase cursor-pointer" @click="$router.back()">KEMBALI</li>
          <li class="px-3 uppercase font-bold">{{ title }}</li>
        </ul>
      </div>
      <div class="p-5">
        <div class="flex justify-between mb-3 items-end">
          <div class="">Daftar Peserta:</div>
        </div>
        <table class="table-auto w-full border-collapse">
          <tr class="bg-yellow-200 border-b border-yellow-500 text-yellow-800">
            <td class="p-3">#</td>
            <td class="p-3">Nim</td>
            <td class="p-3">Nama</td>
            <td class="p-3">Email</td>
            <td class="p-3">Actions</td>
          </tr>
          <tr v-for="(v, i) in users" :key="i" class="even:bg-slate-50 odd:bg-slate-100">
            <td class="p-3">{{ i+1 }}</td>
            <td class="p-3">{{ v.nim }}</td>
            <td class="p-3">{{ v.nama }}</td>
            <td class="p-3">{{ v.email }}</td>
            <td>
              <div class="flex">
                <button class="bg-yellow-100 border rounded border-yellow-300 text-yellow-700 p-2 text-sm hover:bg-yellow-200 hover:border-yellow-400" @click="selectedUser=v.dataFile">UNGGAHAN</button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useFirestore, useCollection } from 'vuefire';
import { collection, Timestamp, doc, getDocs, addDoc, query, orderBy, updateDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      users: [],
      db: useFirestore(),
      title: '',
      selectedUser: null,
    }
  },
  async mounted() {
    await this.getUsers()
  },
  methods: {
    async getUsers() {
      this.users = [];
      let users = await getDocs(query(collection(this.db, 'Pengguna')))
      await users.forEach(async (user) => {
        let data = await getDocs(query(collection(this.db, `Pengguna/${user.id}/Pendaftaran`)))
        let dataFile = data.docs[0]?.data();
        let dataInput = data.docs[1]?.data();
        let {id} = this.$route.params;
        if (dataInput?.Gelombang.toLowerCase() == id.toLowerCase()) {
          this.title = dataInput.Gelombang;
          this.users.push({
            ...user.data(),
            dataFile, dataInput
          })
        }
      });
    },
    dateFormat(ts) {
      if (ts instanceof Timestamp) {
        let date = ts.toDate();
        return `${this.addZero(date.getDate())}-${this.addZero(date.getMonth())}-${date.getFullYear()}`;
      }
      return '';
    },
    addZero(number) {
      if (number < 10 && number >= 0) return `0`+number
      return number;
    }
  }
}
</script>