<template>
  <div v-infinite-scroll="loadData">
    
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {

    const loadData = () => {
      console.log('触发')
    }

    return {
      loadData
    };
  }
});
</script>
