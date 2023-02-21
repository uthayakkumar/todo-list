<template>
  <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
       Are you sure you would like to delete this task from database? This action cannot be undone.
      </div>
      <div class="bg-gray-100 px-4 py-3 text-right">
        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded-lg  hover:bg-gray-700 mr-2" @click="$emit('cancel')"><i class="fas fa-times"></i> Cancel</button>
        <button type="button" class="px-4 py-2 text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"  @click="$emit('close')"><i class="fas fa-plus"></i> Confirm</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'VueModel',
}
</script>

<style scoped lang="scss">

</style>