import {makeAutoObservable} from 'mobx'
import {http,setToken,getToken} from '@/pages/utils'

class UpimageStore{
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  sendimage = async (forms:FormData)=>{
    const res = await http.post('http://localhost:3000/commodity/update',
      forms,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return res;
  }
}
export default UpimageStore;
