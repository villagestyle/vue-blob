<template>
  <div class="comment">
    <el-row>
      <el-col :span="operation ? 21 : 24">
        <p class="flex-box">
          <span class="content">{{ data.content }}</span>
          <span class="date">{{ creTime }}</span>
        </p>
      </el-col>
      <el-col :span="3" v-if="operation">
        <div class="operation-box">
          <el-space wrap>
            <a class="state color-info" @click="detail">前往文章</a>
            <a class="state color-info" @click="remove">删除</a>
          </el-space>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { computed, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { Comment } from "../type/global";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Comment>
    },
    operation: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const router = useRouter();
    const creTime = computed(() =>
      moment(props.data.creTime).format("YYYY-MM-DD HH:mm")
    );

    const detail = () => {
      router.push({
        name: "ArticelDetail",
        params: {
          id: props.data.id
        }
      });
    };

    const remove = () => {
      emit("remove", props.data.id);
    };

    return {
      creTime,
      detail,
      remove
    };
  }
});
</script>

<style lang="scss" scoped>
.comment {
  line-height: 33px;
  .date {
    font-size: 14px;
    color: $color-disabled;
    text-align: right;
  }
  .flex-box {
    justify-content: space-between;
    align-items: flex-end;
  }
  .operation-box {
    text-align: right;
    a {
      cursor: pointer;
    }
  }
  padding: 12px 0;
  border-bottom: 1px solid $color-disabled-light;
}
</style>
