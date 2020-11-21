<template>
  <div class="home">
    <Tasks/>
  </div>
</template>

<script>
import Tasks from '@/components/Tasks.vue'

export default {
  name: 'Home',
  components: {
    Tasks,
  }
}
</script>
