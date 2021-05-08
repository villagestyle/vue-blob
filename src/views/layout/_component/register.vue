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
      ref="formInstance"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="cellphone">
        <el-input v-model="form.cellphone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1" :value="9">男</el-radio>
          <el-radio :label="0">女</el-radio>
          <el-radio :label="9">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="flex-box">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="动态验证码" prop="code">
              <el-input v-model="form.captcha"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-image
                @click="loadCaptcha"
                :src="picCodeUrl"
                fit="cover"
                alt="logo"
                class="logo"
              ></el-image>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { UserRegiesterRules } from "./lib";
import { UserRegiestData } from "../../../type/global";
import { uuid } from "../../../utils";
import userAPI from "../../../api/user";

export default defineComponent({
  props: {
    title: {
      default: "注册",
      type: String
    }
  },
  setup() {
    const dialogVisible = ref(false);
    const formInstance = ref();
    const picCodeUrl = ref("");
    const validateToken = ref(uuid());
    const form = reactive<UserRegiestData>({
      name: "",
      username: "",
      cellphone: "",
      email: "",
      sex: 9,
      password: "",
      captcha: "",
      token: ""
    });
    const rules = UserRegiesterRules;

    const show = () => {
      loadCaptcha();
      dialogVisible.value = true;
    };

    const close = () => {
      dialogVisible.value = false;
    };

    const reset = () => {
      form.name = "";
      form.username = "";
      form.cellphone = "";
      form.email = "";
      form.sex = 9;
      form.password = "";
      form.captcha = "";
      form.token = "";
    };

    const cancel = () => {
      reset();
      close();
    };

    const submit = () => {
      console.log({ ...form });
      formInstance.value.validate(valid => {
        if (valid) {
          userAPI
            .register({ ...form, token: validateToken.value })
            .then(ret => {
              console.log(ret);
            })
            .catch(() => {
              loadCaptcha();
            });
        }
      });
    };

    const loadCaptcha = () => {
      userAPI.captcha(validateToken.value).then(ret => {
        const blob = new Blob([ret.data], { type: "image/svg+xml" });
        picCodeUrl.value = URL.createObjectURL(blob);
      });
    };

    return {
      dialogVisible,
      picCodeUrl,
      show,
      close,
      form,
      rules,
      cancel,
      submit,
      formInstance,
      loadCaptcha
    };
  }
});
</script>

<style lang="scss" scoped></style>
