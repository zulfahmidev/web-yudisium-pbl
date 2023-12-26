<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div class="w-96 rounded bg-white overflow-auto">
      <div class="p-4 bg-yellow-200 border-b border-yellow-500 text-yellow-800 flex justify-between">
        <div class="text-md">
          Unggahan
        </div>
        <div class="text-yellow-700 px-2 cursor-pointer rounded-full hover:bg-black/10" @click="hideModal">x</div>
      </div>
      <div class="p-4">
        <div class="mb-2">
          <label for="">Bukti Pembayaran Yudisium:</label>
          <a target="_blank" rel="noopener noreferrer" :href="data['Bukti Pembayaran Yudisium']" class="p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 block w-full rounded text-center hover:bg-yellow-200 hover:border-yellow-400">UNDUH</a>
        </div>
        <div class="mb-2">
          <label for="">Bukti Sudah Sidang:</label>
          <a target="_blank" rel="noopener noreferrer" :href="data['Bukti Sudah Sidang']" class="p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 block w-full rounded text-center hover:bg-yellow-200 hover:border-yellow-400">UNDUH</a>
        </div>
        <div class="mb-2">
          <label for="">Iuran Himpunan:</label>
          <a target="_blank" rel="noopener noreferrer" :href="data['Iuran Himpunan']" class="p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 block w-full rounded text-center hover:bg-yellow-200 hover:border-yellow-400">UNDUH</a>
        </div>
        <div class="mb-2">
          <label for="">Pas Photo:</label>
          <a target="_blank" rel="noopener noreferrer" :href="data['Pas Photo']" class="p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 block w-full rounded text-center hover:bg-yellow-200 hover:border-yellow-400">UNDUH</a>
        </div>

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
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide', true)
    },
  },
  mounted() {
    console.log(this.data)
  }
}
</script>