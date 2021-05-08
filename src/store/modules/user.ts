import {
    Module,
    Mutation,
    VuexModule,
    getModule
  } from "vuex-module-decorators";
  import store from "..";
  import localServer from "../../utils/localServer";
  
  @Module({
    namespaced: true,
    name: "user",
    store,
    dynamic: true
  })
  export class UserStoreModule extends VuexModule {
    private userInfo: any = localServer.get("userInfo");
    private token: string = localServer.get("token");
  
    get getUserInfo() {
      return this.userInfo;
    }
  
    get getToken() {
      return this.token;
    }
  
    @Mutation
    commitToken(token: string) {
      this.token = token;
    }
  
    @Mutation
    commitUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    }
  
    @Mutation
    commitReloadData() {
      this.token = localServer.get("token");
      this.userInfo = localServer.get("userInfo");
    }
  }
  
  export const UserStore = getModule<UserStoreModule>(UserStoreModule);
  