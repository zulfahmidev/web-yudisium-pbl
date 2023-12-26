<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div class="w-96 rounded bg-white overflow-auto">
      <div class="p-4 bg-yellow-200 border-b border-yellow-500 text-yellow-800 flex justify-between">
        <div class="text-md">
          {{ data?.isEdit ? 'Edit Gelombang' : 'Tambah Gelombang' }}
        </div>
        <div class="text-yellow-700 px-2 cursor-pointer rounded-full hover:bg-black/10" @click="hideModal">x</div>
      </div>
      <div class="p-4">
        <!-- <div class="mb-2">
          <label for="">Nama:</label>
          <input type="text" placeholder="ketik disini..." class="p-2 border rounded bg-slate-50 border-slate-200 w-full outline-none focus:shadow block" v-model="form_data.name" />
        </div> -->
        <div class="mb-2">
          <label for="">Tanggal Buka Pendaftaran:</label>
          <input type="datetime-local" placeholder="ketik disini..." class="p-2 border rounded bg-slate-50 border-slate-200 w-full outline-none focus:shadow block" v-model="form_data.register_started_at" />
        </div>
        <div class="mb-2">
          <label for="">Jadwal Tutup Pendaftaran:</label>
          <input type="datetime-local" placeholder="ketik disini..." class="p-2 border rounded bg-slate-50 border-slate-200 w-full outline-none focus:shadow block" v-model="form_data.register_ended_at" />
        </div>
        <div class="mb-2">
          <label for="">Jadwal Acara:</label>
          <input type="datetime-local" placeholder="ketik disini..." class="p-2 border rounded bg-slate-50 border-slate-200 w-full outline-none focus:shadow block" v-model="form_data.event_at" />
        </div>
        <button class="p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 block w-full rounded hover:bg-yellow-200 hover:border-yellow-400" @click="save">SIMPAN</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      form_data: {
        name: '',
        register_started_at: '',
        register_ended_at: '',
        event_at: '',
      }
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide', true)
    },
    save() {
      this.$emit('save', {...this.form_data, isEdit: this.data?.isEdit})
      this.$emit('hide', true)
    }
  },
  mounted() {
    if (this.data.isEdit) {
      this.form_data = this.data
    }
  }
}
</script>