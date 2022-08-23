import React from "react"
import LoginStore from './login.store'
import LoginstateStore from '@/pages/store/loginstate.store';
import RegistStore from '@/pages/store/regist.store';
import EmailStore from '@/pages/store/email.store';
import ModellistStore from '@/pages/store/modellist.store';

class RootStore {
  // 组合模块
  private loginStore: LoginStore;
  private loginstateStore: LoginstateStore;
  private registstore: RegistStore;
  private emailstore: EmailStore;
  private modelliststore: ModellistStore;

  constructor() {
    this.loginStore = new LoginStore()
    this.loginstateStore = new LoginstateStore()
    this.registstore = new RegistStore();
    this.emailstore = new EmailStore();
    this.modelliststore = new ModellistStore()
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
