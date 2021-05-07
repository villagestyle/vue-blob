<template>
  <header>
    <div class="weaper">
      <el-row :gutter="20">
        <el-col :span="3">
          <div>
            <el-image
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="cover"
              alt="logo"
              class="logo"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="16"><Nav v-model:active="active"></Nav></el-col>
        <el-col :span="5">
          <el-button size="small" type="primary">登录</el-button>
          <el-button size="small" type="success">注册</el-button>
        </el-col>
      </el-row>
    </div>
  </header>
  <main>
    <div class="weaper">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElImage } from "element-plus";
import Nav from "./_component/nav.vue";

export default defineComponent({
  components: {
    [ElImage.name]: ElImage,
    Nav
  },
  setup() {
    const active = ref('home');

    return {
      active
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  padding: 16px 16px 0;
  .logo {
    width: 48px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    transform: translateY(-15%);
  }
  border-bottom: 1px solid $color-disabled-light;
}

.weaper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
