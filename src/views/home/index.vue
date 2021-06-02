<template>
  <div>
    <Layout active="Root"></Layout>
    <div v-infinite-scroll="loadData" class="container-with-layout">
      <div v-for="item in data.record" :key="item.id">
        <Article :data="item"></Article>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import articleAPI from "../../api/article";
import Article from "../../components/article.vue";
import Layout from "../layout/index.vue";

export default defineComponent({
  components: {
    Article,
    Layout
  },
  setup() {
    const pageNum = ref(1);
    const data = reactive({
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
