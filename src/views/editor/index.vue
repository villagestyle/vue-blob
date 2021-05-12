<template>
  <header></header>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <textarea
          v-model="value"
          @input="output"
          :style="{ height: boxHeight + 'px' }"
        ></textarea>
      </el-col>
      <el-col :span="12"
        ><section
          class="markdown-body"
          v-html="content"
          :style="{ height: boxHeight + 'px' }"
        ></section
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import marked from "../../utils/marked";
import { useThrottle } from "../../hooks/useThrottle";

export default defineComponent({
  setup() {
    const value = ref("");
    const title = ref("");
    const content = ref("");
    const innerHeight = ref(document.body.clientHeight);
    const boxHeight = computed(() => innerHeight.value - 42);

    const [update, cancel] = useThrottle(() => {
        console.log('触发');
      content.value = marked(value.value);
    }, 1000);

    const output = () => {
        console.log('zzz');
        update();
    };

    const resizeHandle = () => {
      const h = document.body.clientHeight;
      innerHeight.value = h;
    };

    onMounted(() => {
      window.addEventListener("resize", resizeHandle);
    });

    return {
      value,
      title,
      content,
      boxHeight,
      output,
      resizeHandle
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandle);
  }
});
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
  font-size: 0;
  textarea {
    width: calc(100% - 6px);
    display: block;
    outline: none;
    padding: 8px;
    box-sizing: border-box;
  }
  section {
    padding: 8px;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
