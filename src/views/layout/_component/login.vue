<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    width="600px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <el-form
      label-position="left"
      :model="form"
      label-width="100px"
      :rules="rules"
      status-icon
      v-loading="loading"
      ref="formInstance"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="loading" @click="cancel">取 消</el-button>
        <el-button :disabled="loading" type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { UserLoginRules } from "./lib";
import { UserLoginData } from "../../../type/global";
import { ElMessage } from "element-plus";
import userAPI from "../../../api/user";
import { UserStore } from '../../../store/modules/user';

export default defineComponent({
  props: {
    title: {
      default: "登录",
      type: String
    }
  },
  setup() {
    const dialogVisible = ref(false);
    const loading = ref(false);
    const formInstance = ref();
    const form = reactive<UserLoginData>({
      username: "",
      password: ""
    });
    const rules = UserLoginRules;

    const show = () => {
      dialogVisible.value = true;
    };

    const close = () => {
      dialogVisible.value = false;
    };

    const reset = () => {
      form.username = "";
      form.password = "";
    };

    const cancel = () => {
      reset();
      close();
    };

    const submit = () => {
      loading.value = true;
      formInstance.value.validate(valid => {
        if (valid) {
          userAPI
            .login({ ...form })
            .then(ret => {
              ElMessage.success("登录成功");
              loading.value = false;
              cancel();
              // TODO: 登录处理
              UserStore.commitToken(ret.data.token);
              UserStore.commitUserInfo(ret.data);
              // 刷新页面
              location.reload();
            })
            .catch(() => {
              loading.value = false;
            });
        } else {
          loading.value = false;
        }
      });
    };

    const methods = {
      show,
      close,
      cancel,
      submit
    };

    return {
      dialogVisible,
      form,
      rules,
      loading,
      formInstance,
      ...methods
    };
  }
});
</script>

<style lang="scss" scoped></style>
