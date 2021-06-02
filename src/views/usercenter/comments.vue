<template>
  <div v-loading="loading">
    <Layout active="articels"></Layout>
    <div v-infinite-scroll="loadData" class="container-with-layout">
      <comment-com
        v-for="item in data.record"
        :key="item.id"
        :data="item"
        @remove="remove"
        :operation="true"
      ></comment-com>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Comment } from "../../type/global";
import commentAPI from "../../api/comment";
import CommentCom from "../../components/comment.vue";
import Layout from "../layout/index.vue";

export default defineComponent({
  components: {
    CommentCom,
    Layout
  },
  setup() {
    const pageNum = ref(1);
    const loading = ref(false);
    const data = reactive<{
      record: Comment[];
    }>({
      record: []
    });

    const loadData = () => {
      commentAPI
        .page({
          pageNum: pageNum.value,
          rows: 10
        })
        .then(ret => {
          pageNum.value++;
          data.record = [...data.record, ...ret.data.records];
        });
    };

    const remove = (id: string) => {
      loading.value = true;
      commentAPI
        .remove(id)
        .then(() => {
          loading.value = false;
          pageNum.value = 1;
          data.record = [];
          loadData();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      loadData();
    });

    return {
      loadData,
      data,
      remove,
      loading
    };
  }
});
</script>

<style lang="scss" scoped></style>
