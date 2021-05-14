<template>
    <div class="container" v-loading="loading">
        <header>
            <h1>{{ info.title }}</h1>

            <div>
                <el-space wrap>
                    <span>作者：{{ info.author.username }}</span>
                    <span>阅读：{{ info.readNum }}</span>
                    <span>点赞：{{ info.likesNum }}</span>
                </el-space>
            </div>
        </header>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, reactive, ref } from 'vue';
import marked from "../../utils/marked";
import articleAPI from '../../api/article';
import { useRoute } from 'vue-router';

export default defineComponent({

    setup() {

        const info = reactive({
            content: '',
            creTime: 0,
            title: '',
            author: {},
            readNum: 0,
            likesNum: 0
        });
        const loading = ref(false);
        const route = useRoute();

        const loadData = () => {
            loading.value = true;
            const id = route.params.id as string;
            articleAPI.info(id).then(ret => {
                info.content = marked(ret.data.content);
                info.creTime = ret.data.creTime;
                info.title = ret.data.title;
                info.author = ret.data.author;
                info.readNum = ret.data.readNum;
                info.likesNum = ret.data.likesNum;
                loading.value = false;
            }).catch(() => {
                loading.value = false;
            });
        }

        onMounted(() => {
            loadData();
        })

        return {
            info,
            loading
        }

    }
})

</script>

<style lang="scss" scoped>
.container {
    padding: 16px 16px 32px;
}
header {
    text-align: center;

    h1 {
        font-size: 24px;
    }
}
.content {
    max-width: 1000px;
    margin: 0 auto;
}
</style>