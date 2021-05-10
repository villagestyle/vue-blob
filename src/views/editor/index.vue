<template>
    <div>
        这是编辑器页面
        <!-- <mavon-editor v-model="value"/> -->
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const value = ref('');

        return {
            value
        }
    }
})

</script>

<style lang="scss" scoped>

</style>