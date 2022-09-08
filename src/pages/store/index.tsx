import React from "react"
import LoginStore from './login.store'
import LoginstateStore from '@/pages/store/loginstate.store';
import RegistStore from '@/pages/store/regist.store';
import EmailStore from '@/pages/store/email.store';
import ModellistStore from '@/pages/store/modellist.store';
import UpimageStore from '@/pages/store/upimagestore';
import RenderstateStore from '@/pages/store/renderstate.store';

class RootStore {
  loginStore: LoginStore;
  loginstateStore: LoginstateStore;
  registstore: RegistStore;
  emailstore: EmailStore;
  modelliststore: ModellistStore;
  upimagestore: UpimageStore;
  renderstatestore: RenderstateStore;

  constructor() {
    this.loginStore = new LoginStore();
    this.loginstateStore = new LoginstateStore();
    this.registstore = new RegistStore();
    this.emailstore = new EmailStore();
    this.modelliststore = new ModellistStore();
    this.upimagestore = new UpimageStore();
    this.renderstatestore = new RenderstateStore();
  }
}
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
