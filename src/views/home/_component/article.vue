<template>
  <el-card class="box-card" @click="detail">
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
        <!-- <span> 评论 {{ data.likesNum }} </span> -->
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
import { useRouter } from "vue-router";

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
    const router = useRouter();
    const date = computed(() =>
      moment(prop.data.creTime).format("YYYY-MM-DD HH:mm:ss")
    );

    const detail = () => {
      router.push({
        name: 'ArticelDetail',
        params: {
          id: prop.data.id
        }
      })
    }

    return {
      date,
      detail
    };
  }
});
</script>

<style lang="scss" scoped>
.box-card {
  margin: 8px 0;
  cursor: pointer;
  transition: all .2s;
  &:hover {
    transform: scale(1.01);
    background-color: #00000005;
  }
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item {
  margin-bottom: 18px;
}
</style>
