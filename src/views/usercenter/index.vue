<template>
  <div>
    <Layout active="UserCenter"></Layout>
    <div class="weaper container-with-layout">
      <el-row :gutter="20" v-loading="loading">
        <el-col :span="12">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span class="title"
                  >文章<span>（{{ data.articleNum }}）</span></span
                >
                <el-button class="button" type="text" @click="more(1)"
                  >更多</el-button
                >
              </div>
            </template>
            <div class="text item">
              <el-row :gutter="20" v-for="item in data.article" :key="item.id">
                <el-col :span="12">{{ item.title }}</el-col>
                <el-col :span="6">{{ item.creTime }}</el-col>
                <el-col class="color-info state" :span="6">
                  <el-space wrap>
                    <a @click="detail(item)">详情</a>
                    <a @click="edit(item)">编辑</a>
                    <a @click="remove(item)">删除</a>
                  </el-space>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span class="title"
                  >草稿箱<span>（{{ data.draftNum }}）</span></span
                >
                <el-button class="button" type="text" @click="more(0)"
                  >更多</el-button
                >
              </div>
            </template>
            <div class="text item">
              <el-row :gutter="20" v-for="item in data.draft" :key="item.id">
                <el-col :span="12">{{ item.title }}</el-col>
                <el-col :span="6">{{ item.creTime }}</el-col>
                <el-col class="color-info state" :span="6">
                  <el-space wrap>
                    <a @click="detail(item)">详情</a>
                    <a @click="edit(item)">编辑</a>
                    <a @click="remove(item)">删除</a>
                  </el-space>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElCard, ElMessage, ElMessageBox } from "element-plus";
import articleAPI from "../../api/article";
import { Article } from "../../type/global";
import { TransformDateToFormatStr } from "../../utils";
import { useRouter } from "vue-router";
import { UserStore } from "../../store/modules/user";
import Layout from "../layout/index.vue";
import DrawBoard from "../../components/draw-board.vue";

export default defineComponent({
  components: {
    [ElCard.name]: ElCard,
    Layout,
    DrawBoard
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const data = reactive<{
      draft: Article[];
      article: Article[];
      draftNum: number;
      articleNum: number;
    }>({
      draft: [],
      article: [],
      draftNum: 0,
      articleNum: 0
    });

    const loadData = () => {
      loading.value = true;
      const draft = articleAPI.page({
        pageNum: 1,
        rows: 5,
        action: 0,
        creUserId: UserStore.getUserInfo.id
      });
      const article = articleAPI.page({
        pageNum: 1,
        rows: 5,
        action: 1,
        creUserId: UserStore.getUserInfo.id
      });

      Promise.all([draft, article])
        .then(ret => {
          loading.value = false;
          const data1: Article[] = ret[0].data.records;
          const data2: Article[] = ret[1].data.records;
          data.draftNum = ret[0].data.total;
          data.articleNum = ret[1].data.total;
          data.draft = TransformDateToFormatStr(
            data1,
            "creTime",
            "YYYY-MM-DD HH:mm"
          );
          data.article = TransformDateToFormatStr(
            data2,
            "creTime",
            "YYYY-MM-DD HH:mm"
          );
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const detail = (item: Article) => {
      router.push({
        name: "ArticelDetail",
        params: {
          id: item.id
        }
      });
    };

    const edit = (item: Article) => {
      router.push({
        name: "ArticelEdit",
        params: {
          id: item.id
        }
      });
    };

    const remove = (item: Article) => {
      ElMessageBox.confirm("确定删除？", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        confirmButtonClass:
          "state bg-danger color-default clear-border btn-hover",
        cancelButtonClass: "state bg-info color-default clear-border btn-hover",
        showClose: false
      }).then(() => {
        loading.value = true;
        articleAPI
          .remove(item.id)
          .then(() => {
            ElMessage.success("删除成功");
            loadData();
          })
          .catch(() => {
            loading.value = false;
          });
      }).catch(() => {
        console.log('嘿嘿');
      });
    };

    const more = (type: 0 | 1) => {
      router.push({
        name: type ? "Articel" : "Draft"
      });
    };

    onMounted(() => {
      loadData();
    });

    return {
      data,
      detail,
      edit,
      remove,
      loading,
      more
    };
  }
});
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.weaper {
  padding: 16px 0;
}
.title {
  font-size: 16px;
  > span {
    font-size: 13px;
    font-weight: normal;
    color: $color-disabled;
  }
}
.item {
  > div {
    margin-top: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    padding: 6px 2px;
    transition: all 0.1s;
    &:hover {
      background-color: lighten($color-disabled-light, 10%);
    }
  }
}

.state {
  cursor: pointer;
  text-align: right;
}
</style>
