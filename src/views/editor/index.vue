<template>
  <div>
    <header>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input placeholder="请输入文章标题" v-model="title"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button :disabled="loadding" type="warning" @click="submit(0)"
            >保存</el-button
          >
          <el-button :disabled="loadding" type="primary" @click="submit(1)"
            >提交</el-button
          >
        </el-col>
      </el-row>
    </header>
    <div class="container">
      <el-row>
        <el-col :span="12">
          <textarea
            ref="textarea"
            v-model="value"
            :style="{ height: boxHeight + 'px' }"
          ></textarea>
        </el-col>
        <el-col :span="12"
          ><section
            ref="markdownBody"
            class="markdown-body"
            v-html="content"
            :style="{ height: boxHeight + 'px' }"
          ></section
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  onUnmounted,
  nextTick,
  reactive
} from "vue";
import marked from "../../utils/marked";
import articleAPI, { ArticleEdit } from "../../api/article";
import { useRoute, useRouter } from "vue-router";
import { useMarked } from "../../hooks/useMarked";
import { SingleElMessage } from "../../utils";
import { useBothScroll } from "../../hooks/useBothScroll";
import { Fn } from "../../type/global";

export default defineComponent({
  setup() {
    const id = ref("");
    const value = ref("");
    const title = ref("");
    const [content] = useMarked(value, { timeout: 300, useThrottle: true });
    const router = useRouter();
    const route = useRoute();
    const innerHeight = ref(document.body.clientHeight);
    const boxHeight = computed(() => innerHeight.value - 42 - 72);
    const loadding = ref(false);
    const textarea = ref<HTMLTextAreaElement>();
    const markdownBody = ref<HTMLElement>();
    let scrollEventListenerCancel: Fn<void> = null;

    nextTick(() => {
      [scrollEventListenerCancel] = useBothScroll<
        HTMLTextAreaElement,
        HTMLElement
      >(textarea, markdownBody);
    });

    const resizeHandle = () => {
      const h = document.body.clientHeight;
      innerHeight.value = h;
    };

    const submit = (action: 0 | 1) => {
      if (!title.value && action) {
        SingleElMessage("请输入文章标题");
        return;
      }
      loadding.value = true;
      const req = id.value
        ? (data: ArticleEdit) => articleAPI.edit(id.value, data)
        : articleAPI.add;
      req({
        action,
        title: title.value || "无标题",
        content: value.value
      })
        .then(() => {
          loadding.value = false;
          SingleElMessage("提交成功", { type: "success" });
          router.back();
        })
        .catch(() => {
          loadding.value = false;
        });
    };

    const loadData = () => {
      loadding.value = true;
      articleAPI
        .info(id.value)
        .then(ret => {
          loadding.value = false;
          title.value = ret.data.title;
          value.value = ret.data.content;
          content.value = marked(value.value);
        })
        .catch(() => {
          loadding.value = false;
        });
    };

    onMounted(() => {
      window.addEventListener("resize", resizeHandle);
      id.value = route.params.id as string;
      if (id.value) {
        loadData();
      }
    });

    onUnmounted(() => {
      window.removeEventListener("resize", resizeHandle);
      scrollEventListenerCancel();
    });

    return {
      value,
      title,
      content,
      boxHeight,
      submit,
      loadding,
      textarea,
      markdownBody
    };
  }
});
</script>

<style lang="scss" scoped>
.container,
header {
  padding: 16px;
  font-size: 0;
  textarea {
    width: calc(100% - 6px);
    display: block;
    outline: none;
    padding: 8px;
    box-sizing: border-box;
    line-height: 22px;
    font-size: 14px;
    font-family: "element-icons";
  }
  section {
    padding: 8px;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
