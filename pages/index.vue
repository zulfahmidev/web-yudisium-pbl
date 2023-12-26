<template>
  <div class="container m-auto">
    <modalform v-if="showModal" @hide="showModal=false;editData={}" :data="editData" @save="onSave"></modalform>
    <modalparticipants v-if="selectedGelombang != null" id_gelombang="selectedGelombang" @hide="selectedGelombang=null" ></modalparticipants>
    <div class="shadow rounded bg-white overflow-hidden">
      <div class="p-5 bg-yellow-200 border-b border-yellow-500 text-yellow-800">
        <ul class="flex divide-x divide-yellow-600 a">
          <li class="px-3 uppercase font-bold">Kelola Gelombang</li>
        </ul>
      </div>
      <div class="p-5">
        <div class="flex justify-between mb-3 items-end">
          <div class="">Tabel daftar gelombang:</div>
          <!-- <button class="border border-blue-300 bg-blue-100 rounded px-2 py-1 text-blue-600 hover:bg-blue-200 hover:border-blue-400" @click="showModal=true">Tambah Gelombang</button> -->
        </div>
        <table class="table-auto w-full border-collapse">
          <tr class="bg-yellow-200 border-b border-yellow-500 text-yellow-800">
            <td class="p-3">#</td>
            <td class="p-3">Nama Gelombang</td>
            <td class="p-3">Buka Pendaftaran</td>
            <td class="p-3">Tutup Pendaftaran</td>
            <td class="p-3">Jadwal Acara</td>
            <td class="p-3">Actions</td>
          </tr>
          <tr v-if="waves.length == 0" class="bg-slate-50">
            <td colspan="6" class="text-center p-3">Tidak ada data.</td>
          </tr>
          <tr v-for="(v, i) in waves" :key="i" class="even:bg-slate-50 odd:bg-slate-100">
            <td class="p-3">{{ i+1 }}</td>
            <td class="p-3 uppercase">{{ v.name }}</td>
            <td class="p-3">{{ dateFormat(v.register_started_at) }}</td>
            <td class="p-3">{{ dateFormat(v.register_ended_at) }}</td>
            <td class="p-3">{{ dateFormat(v.event_at) }}</td>
            <td>
              <div class="flex">
                <button class="bg-green-100 border-y border-l rounded-l border-green-300 text-green-700 p-2 text-sm hover:bg-green-200 hover:border-green-400" @click="showEditModal(v.id)">UBAH</button>
                <!-- <button class="bg-red-100 border-y border-red-300 text-red-700 p-2 text-sm hover:bg-red-200 hover:border-red-400">HAPUS</button> -->
                <NuxtLink class="bg-yellow-100 border-y border-r rounded-r border-yellow-300 text-yellow-700 p-2 text-sm hover:bg-yellow-200 hover:border-yellow-400" :to="`/participants/${v.name}`">PESERTA</NuxtLink>
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
import { collection, Timestamp, doc, getDoc, addDoc, query, orderBy, updateDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      selectedId: null,
      showModal: false,
      db: useFirestore(),
      waves: [],
      editData: {},
      selectedGelombang: null,
    }
  },
  async mounted() {
    this.waves = useCollection(query(this.getCollection(), orderBy('name', 'asc')))
  },
  methods: {
    getCollection() {
      return collection(this.db, 'Gelombang')
    },
    dateFormat(ts) {
      if (ts instanceof Timestamp) {
        let date = ts.toDate();
        return `${this.addZero(date.getDate())}-${this.addZero(date.getMonth())}-${date.getFullYear()}`;
      }
      return '';
    },
    showParticipants(id) {
      this.$router.push({path: '/participants', params: {id: id}})
    },
    addZero(number) {
      if (number < 10 && number >= 0) return `0`+number
      return number;
    },
    async showEditModal(id) {
      let wave = getDoc(doc(this.getCollection(), id))
      let data = (await wave).data();
      this.editData = {
        id,
        name: data.name,
        register_started_at: data.register_started_at.toDate().toISOString().slice(0,16),
        register_ended_at: data.register_ended_at.toDate().toISOString().slice(0,16),
        event_at: data.event_at.toDate().toISOString().slice(0,16),
        isEdit: true,
      }
      this.showModal = true;
    },
    async onSave(data) {
      if (!data?.isEdit) {
        await addDoc(this.getCollection(), {
          name: data.name.toLowerCase(),
          register_started_at: new Date(data.register_started_at),
          register_ended_at: new Date(data.register_ended_at),
          event_at: new Date(data.event_at),
          created_at: new Date(),
        })
      }else {
        let wave = doc(this.getCollection(), data.id)
        await updateDoc(wave, {
          name: data.name.toLowerCase(),
          register_started_at: new Date(data.register_started_at),
          register_ended_at: new Date(data.register_ended_at),
          event_at: new Date(data.event_at)
        })
      }
    }
  }
}
</script>