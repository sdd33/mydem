import {makeAutoObservable} from 'mobx'
import {http,setToken,getToken} from '@/pages/utils'


class LoginStore{
  token = getToken() || ''
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

    return res.data
    // setToken(res.data.data.token)
  }
}
export default LoginStore
