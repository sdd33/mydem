import {makeAutoObservable} from 'mobx'
import {http,setToken} from '@/pages/utils'


class LoginStore{
  constructor() {
    makeAutoObservable(this)
  }
  settoken = async ({mobile,code}:any)=>{
    const res = await http.post('http://localhost:3000/login/post', {
      mobile,
      code
    }, {
      headers: {
        "my_token": "abc"
      }
    })
    setToken(res.data.data.token);
    return res.data;
  }
}
export default LoginStore
