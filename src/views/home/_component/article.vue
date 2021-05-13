<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ data.title }}</span>
      </div>
    </template>
    <div class="text item">
      {{ data.content }}
    </div>
    <div class="foot">
      <el-space wrap>
        <span> 查看 {{ data.readNum }} </span>
        <span> 评论 {{ data.likesNum }} </span>
        <span> 赞 {{ data.likesNum }} </span>
        <span> {{ date }} </span>
      </el-space>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ElCard } from "element-plus";
import { Article } from "../../../type/global";
import moment from "moment";

export default defineComponent({
  components: {
    [ElCard.name]: ElCard
  },
  props: {
    data: {
      type: Object as PropType<Article>
    }
  },
  setup(prop) {
    const date = computed(() =>
      moment(prop.data.creTime).format("YYYY-MM-DD HH:mm:ss")
    );

    return {
      date
    };
  }
});
</script>

<style lang="scss" scoped>
.box-card {
  margin: 8px 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
