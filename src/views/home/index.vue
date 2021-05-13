<template>
  <div v-infinite-scroll="loadData" class="weaper">
    <div v-for="item in data.record" :key="item.id">
      <Article :data="item"></Article>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import articleAPI from '../../api/article';
import Article from './_component/article.vue';

export default defineComponent({
  components: {
    Article
  },
  setup() {

    const pageNum = ref(1);
    const data = reactive({
      record: []
    });

    const loadData = () => {
      articleAPI.page({
        pageNum: pageNum.value,
        rows: 10,
        action: 1
      }).then(ret => {
        pageNum.value++;
        data.record = [...data.record, ...ret.data.records]
      })
    }

    onMounted(() => {
      loadData();
    })

    return {
      loadData,
      data
    };
  }
});
</script>

<style lang="scss" scoped>
.weaper {
  padding: 16px 0;
}
</style>
