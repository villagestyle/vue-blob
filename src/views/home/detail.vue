<template>
  <div>
    <Layout active="ArticleDetail"></Layout>
    <div class="container-with-layout container" v-loading="loading">
      <div class="head">
        <h1>{{ info.title }}</h1>

        <div>
          <el-space wrap>
            <span>作者：{{ info.author.username }}</span>
            <span>阅读：{{ info.readNum }}</span>
            <span>点赞：{{ info.likesNum }}</span>
          </el-space>
        </div>
      </div>
      <div class="content" v-html="info.content"></div>
      <div class="foot">
        <h3>发表评论</h3>
        <el-input
          class="comment-input"
          type="textarea"
          placeholder="请输入评论内容"
          :autosize="{ minRows: 2}"
        >
        </el-input>
        <el-button type="primary" @click="comment">发表</el-button>
      </div>
      <div class="comment">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import marked from "../../utils/marked";
import articleAPI from "../../api/article";
import { useRoute } from "vue-router";
import Layout from "../layout/index.vue";

export default defineComponent({
  components: {
    Layout
  },

  setup() {
    const info = reactive({
      content: "",
      creTime: 0,
      title: "",
      author: {},
      readNum: 0,
      likesNum: 0
    });
    const loading = ref(false);
    const route = useRoute();

    const loadData = () => {
      loading.value = true;
      const id = route.params.id as string;
      articleAPI
        .info(id)
        .then(ret => {
          info.content = marked(ret.data.content);
          info.creTime = ret.data.creTime;
          info.title = ret.data.title;
          info.author = ret.data.author;
          info.readNum = ret.data.readNum;
          info.likesNum = ret.data.likesNum;
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const comment = () => {

    }

    onMounted(() => {
      loadData();
    });

    return {
      info,
      loading,
      comment
    };
  }
});
</script>

<style lang="scss" scoped>
.container {
  padding: 16px 16px 32px;
}
.head {
  text-align: center;

  h1 {
    font-size: 24px;
  }
}
.content,
.foot {
  max-width: 1000px;
  margin: 0 auto;
  &.foot {
    text-align: center;
    > h3 {
      text-align: left;
    }
  }
}
.comment-input {
  margin-bottom: 24px;
}
</style>
