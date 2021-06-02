<template>
  <div>
    <Layout active="ArticleDetail"></Layout>
    <div class="container-with-layout container" v-loading="loading">
      <div class="head">
        <h1>{{ info.title }}</h1>
        <div>
          <el-space wrap>
            <span>作者：{{ info.author.name }}</span>
            <span>阅读：{{ info.readNum }}</span>
            <span>点赞：{{ info.likesNum }}</span>
          </el-space>
        </div>
      </div>
      <div class="content markdown-body" v-html="info.content"></div>
      <div class="comment-list" v-loading="commentLoading" v-if="info.action">
        <h3>评论：</h3>
        <CommentCom v-for="comment in commentList.data" :key="comment.id" :data="comment"></CommentCom>
      </div>
      <div class="foot" v-if="info.action">
        <h3>发表评论</h3>
        <el-input
          class="comment-input"
          type="textarea"
          placeholder="请输入评论内容"
          :autosize="{ minRows: 2}"
          v-model="commentContent"
        >
        </el-input>
        <el-button type="primary" @click="comment">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import marked from "../../utils/marked";
import articleAPI from "../../api/article";
import commentAPI from '../../api/comment';
import { useRoute } from "vue-router";
import Layout from "../layout/index.vue";
import { Comment } from '../../type/global';
import CommentCom from '../../components/comment.vue';
import { SingleElMessage } from "../../utils";

export default defineComponent({
  components: {
    Layout,
    CommentCom
  },

  setup() {
    const info = reactive({
      content: "",
      creTime: 0,
      title: "",
      author: {},
      readNum: 0,
      likesNum: 0,
      action: 0
    });
    const loading = ref(false);
    const commentLoading = ref(false);
    const commentContent = ref('');
    const id = ref('');
    const route = useRoute();
    const commentList = reactive<{
      data: Comment[]
    }>({
      data: []
    })

    const loadData = () => {
      loading.value = true;
      id.value = route.params.id as string
      articleAPI
        .info(id.value)
        .then(ret => {
          info.content = marked(ret.data.content);
          info.creTime = ret.data.creTime;
          info.title = ret.data.title;
          info.author = ret.data.author;
          info.readNum = ret.data.readNum;
          info.likesNum = ret.data.likesNum;
          info.action = ret.data.action;
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const loadComment = () => {
      commentLoading.value = true;
      commentAPI.list(id.value).then(ret => {
        commentList.data = ret.data;
        commentLoading.value = false;
      }).catch(() => {
        commentLoading.value = false;
      })
    }

    const comment = () => {
      const content = commentContent.value;
      if (!content) {
        SingleElMessage('请输入评论内容', { type: 'warning' })
        return;
      }
      loading.value = true;
      commentAPI.add(id.value, content).then(() => {
        SingleElMessage('评论成功', { type: 'success' });
        commentContent.value = '';
        loading.value = false;
        loadComment();
      }).catch(() => {
        loading.value = false;
      })
    }

    onMounted(() => {
      loadData();
      loadComment();
    });

    return {
      info,
      loading,
      commentLoading,
      comment,
      commentContent,
      commentList
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
.foot,
.comment-list {
  max-width: 1000px;
  margin: 0 auto;
  &.foot {
    text-align: center;
    > h3 {
      text-align: left;
    }
  }
}

.comment-list {
  margin: 32px auto;
}

.comment-input {
  margin-bottom: 24px;
}
</style>
