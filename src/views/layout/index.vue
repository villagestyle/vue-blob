<template>
  <header>
    <div class="weaper">
      <el-row :gutter="20">
        <el-col :span="3">
          <div>
            <el-image
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="cover"
              alt="logo"
              class="logo"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="16"><Nav v-model:active="active"></Nav></el-col>
        <el-col :span="5">
          <template v-if="!token">
            <el-button size="small" type="primary" @click="login"
              >登录</el-button
            >
            <el-button size="small" type="success" @click="regiester"
              >注册</el-button
            >
          </template>
          <template v-else>
            <el-space wrap>
              <router-link to="/editor">
                <el-button size="small" type="primary">写文章</el-button>
              </router-link>
              <el-button size="small" type="danger" @click="logout">
                登出
              </el-button>
            </el-space>
          </template>
        </el-col>
      </el-row>
    </div>
    <LoginDialog ref="loginDialog"></LoginDialog>
    <RegisterDialog ref="registerDialog"></RegisterDialog>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Nav from "./_component/nav.vue";
import LoginDialog from "./_component/login.vue";
import RegisterDialog from "./_component/register.vue";
import { UserStore } from "../../store/modules/user";
import { ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    Nav,
    LoginDialog,
    RegisterDialog
  },
  props: {
    active: {
      type: String,
      default: "Root"
    }
  },
  setup(prop) {
    const active = ref(prop.active);
    const loginDialog = ref<typeof LoginDialog>();
    const registerDialog = ref<typeof RegisterDialog>();
    const token = ref(UserStore.getToken);
    const router = useRouter();
    const route = useRoute();

    const login = () => {
      loginDialog.value && loginDialog.value.show();
    };

    const logout = () => {
      ElMessageBox.confirm(`确定登出吗？`, {
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(() => {
          UserStore.commitClearData();
          if (route.name === 'Home') {
            location.reload();
            return;
          }
          router.push({
            name: "Root"
          });
        })
        .catch(() => {
          console.log("嘿嘿");
        });
    };

    const regiester = () => {
      registerDialog.value && registerDialog.value.show();
    };

    return {
      active,
      login,
      regiester,
      loginDialog,
      registerDialog,
      token,
      logout
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  padding: 16px 16px 0;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 9;
  .logo {
    width: 48px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    transform: translateY(-15%);
  }
  border-bottom: 1px solid $color-disabled-light;
}

main {
  margin-top: 66px;
}
.weaper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
