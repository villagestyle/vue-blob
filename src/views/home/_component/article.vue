<template>
  <el-card class="box-card" @click="detail">
    <template #header>
      <div>
        <el-row>
          <el-col :span="18"
            ><span class="title">{{ data.title }}</span></el-col
          >
          <el-col :span="6" class="align-right" v-if="showoperation">
            <el-space wrap>
              <a @click.stop="edit" class="state color-info">编辑</a>
              <a class="state color-info" @click="remove">删除</a>
            </el-space>
          </el-col>
        </el-row>
      </div>
    </template>
    <div class="text item">
      {{ data.content }}
    </div>
    <div class="foot">
      <el-space wrap>
        <span> 查看 {{ data.readNum }} </span>
        <span> 评论 {{ data.commentNum || 0 }} </span>
        <span> 赞 {{ data.likesNum }} </span>
        <span> {{ date }} </span>
      </el-space>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ElCard, ElMessage } from "element-plus";
import { Article } from "../../../type/global";
import moment from "moment";
import { useRouter } from "vue-router";
import { UserStore } from "../../../store/modules/user";

export default defineComponent({
  components: {
    [ElCard.name]: ElCard
  },
  props: {
    data: {
      type: Object as PropType<Article>
    },
    operation: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, { emit }) {
    const router = useRouter();
    const loginUserId = UserStore.getUserInfo.id;
    const showoperation = computed(
      () => prop.operation && prop.data.creUserId === loginUserId
    );
    const date = computed(() =>
      moment(prop.data.creTime).format("YYYY-MM-DD HH:mm:ss")
    );

    const detail = () => {
      router.push({
        name: "ArticelDetail",
        params: {
          id: prop.data.id
        }
      });
    };

    const remove = () => {
      console.log(prop.data.id);
      ElMessage.success("删除成功");
      // emit('update');
    };

    const edit = () => {
      router.push(`/editor/${prop.data.id}`);
    };

    return {
      date,
      detail,
      showoperation,
      remove,
      edit
    };
  }
});
</script>

<style lang="scss" scoped>
.box-card {
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.01);
    background-color: #00000005;
  }
}

.title {
  font-size: 16px;
  font-weight: bold;
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
