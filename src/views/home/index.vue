<template>
  <div>
    <Layout active="Root"></Layout>
    <div v-infinite-scroll="loadData" class="container-with-layout">
      <div v-for="item in data.record" :key="item.id">
        <ArticleCom :data="item"></ArticleCom>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import articleAPI from "../../api/article";
import ArticleCom from "../../components/article.vue";
import Layout from "../layout/index.vue";
import { Article } from '../../type/global'; 

export default defineComponent({
  components: {
    ArticleCom,
    Layout
  },
  setup() {
    const pageNum = ref(1);
    const data = reactive<{
      record: Article[]
    }>({
      record: []
    });

    const loadData = () => {
      articleAPI
        .page({
          pageNum: pageNum.value,
          rows: 10,
          action: 1
        })
        .then(ret => {
          pageNum.value++;
          data.record = [...data.record, ...ret.data.records];
        });
    };

    onMounted(() => {
      loadData();
    });

    return {
      loadData,
      data
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
