import {makeAutoObservable} from 'mobx'
import {http,setToken,getToken} from '@/pages/utils'


class EmailStore{
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  requstcaptcha = async ({email}:any)=>{
    const res = await http.post('http://localhost:3000/email/post', {email})
    return res.data
  }
}
export default EmailStore
