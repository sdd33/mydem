import {  makeAutoObservable } from 'mobx';
import axios, { AxiosResponse } from 'axios';

const comlist = axios({
  method:'get',
  url:'http://localhost:3000/commodity/getlist'
})

class ModellistStore {

  list:any = []

  constructor() {
    makeAutoObservable(this)
    comlist.then((res)=>{
      this.list = res.data;
    })
  }

  checkItem = (ID:any) => {
    console.log(ID);
    const item = this.list.find((item: { ID: any; })  => item.ID===ID)
    // @ts-ignore
    item.isDone = !item.isDone
  }
  addItem = (item:any) =>{
    this.list.push(item)
  }
  delItem = (ID:any) => {
    this.list = this.list.filter((item: { ID: any; }) => item.ID !== ID)
  }

}
export default ModellistStore
