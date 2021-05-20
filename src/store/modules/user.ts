import {
    Module,
    Mutation,
    VuexModule,
    getModule
  } from "vuex-module-decorators";
  import store from "..";
import { UserInfo } from "../../type/global";
  import localServer from "../../utils/localServer";
  
  @Module({
    namespaced: true,
    name: "user",
    store,
    dynamic: true
  })
  export class UserStoreModule extends VuexModule {
    private userInfo: UserInfo = localServer.get("userInfo");
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
      localServer.set("token", token);
    }
  
    @Mutation
    commitUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
      localServer.set("userInfo", userInfo);
    }
  
    @Mutation
    commitReloadData() {
      this.token = localServer.get("token");
      this.userInfo = localServer.get("userInfo");
    }

    @Mutation
    commitClearData() {
      console.log(`localServer.removeItem('token')`, localServer.removeItem('token'));
      localServer.removeItem('token');
      localServer.removeItem('userInfo');
      this.token = localServer.get("token");
      this.userInfo = localServer.get("userInfo");
    }
  }
  
  export const UserStore = getModule<UserStoreModule>(UserStoreModule);
  