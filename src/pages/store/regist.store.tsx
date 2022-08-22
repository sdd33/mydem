import {makeAutoObservable} from 'mobx'
import {http,setToken,getToken} from '@/pages/utils'


class RegistStore{
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  setUser = async ({username,password,email,captcha}:any)=>{
    const res = await http.post('http://localhost:3000/regist/post', {
      username,
      password,
      email,
      captcha
    }, {
      headers: {
        "my_token": "abc"
      }
    })

    return res.data
    // setToken(res.data.data.token)
  }
}
export default RegistStore
