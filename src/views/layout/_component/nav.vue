<template>
  <el-row :gutter="20">
    <el-col :span="20">
      <el-tabs v-model="activeName" class="nav" :stretch="true" @tab-click="tabClick">
        <el-tab-pane label="首页" name="home"></el-tab-pane>
        <el-tab-pane label="文章" name="articles"></el-tab-pane>
        <el-tab-pane label="归档" name="archive"></el-tab-pane>
        <el-tab-pane label="项目" name="project"></el-tab-pane>
        <el-tab-pane label="历程" name="timeline"></el-tab-pane>
        <el-tab-pane label="留言" name="message"></el-tab-pane>
        <el-tab-pane label="关于" name="about"></el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ElTabs, ElTabPane } from "element-plus";

export default defineComponent({
  components: {
    [ElTabs.name]: ElTabs,
    [ElTabPane.name]: ElTabPane
  },
  props: {
    active: String
  },
  setup(props, ctx) {
    const activeName = ref();

    const tabClick = (tab) => {
      ctx.emit('update:active', tab.props.name)
    }

    onMounted(() => {
      activeName.value = props.active;
    });

    return {
      activeName,
      tabClick
    };
  }
});
</script>

<style lang="scss" scoped>
.nav {
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
  :deep(.el-tabs__nav-wrap::after) {
    width: 0;
  }
  :deep(.el-tabs__item) {
    height: 50px;
    font-size: 15px;
  }
}
</style>
