<template>
  <div v-loading="loading">
    <Layout active="articels"></Layout>
    <div v-infinite-scroll="loadData" class="container-with-layout">
      <div v-for="item in data.record" :key="item.id">
        <ArticleCom @remove="remove" :operation="true" :data="item"></ArticleCom>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Article } from "../../type/global";
import articleAPI from "../../api/article";
import { useRoute } from "vue-router";
import ArticleCom from '../../components/article.vue';
import Layout from '../layout/index.vue';
import { UserStore } from '../../store/modules/user';

export default defineComponent({
  components: { 
    ArticleCom,
    Layout
  },
  setup() {
    const action = ref<0 | 1>(1);
    const pageNum = ref(1);
    const loading = ref(false);
    const route = useRoute();
    const loginUserId = UserStore.getUserInfo.id;
    const data = reactive<{
      record: Article[];
    }>({
      record: []
    });

    const loadData = () => {
      articleAPI
        .page({
          pageNum: pageNum.value,
          rows: 10,
          action: action.value,
          creUserId: loginUserId
        })
        .then(ret => {
          pageNum.value++;
          data.record = [...data.record, ...ret.data.records];
        });
    };

    const remove = (id: string) => {
      loading.value = true;
      articleAPI.remove(id).then(ret => {
        loading.value = false;
        pageNum.value = 1;
        data.record = [];
        loadData();
      }).catch(() => {
        loading.value = false;
      })
    }

    onMounted(() => {
      action.value = route.name === "Articel" ? 1 : 0;
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
