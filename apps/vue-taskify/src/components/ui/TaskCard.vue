<script setup>

</script>

<template>
  <div class="bg-zinc-700 rounded-xl p-4">
    <div class="text-white text-xl">
      <slot name="title" />
    </div>
    <div class="text-zinc-500">
      <slot name="description" />
    </div>
  </div>
</template>