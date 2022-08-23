import {  makeAutoObservable } from 'mobx'

class ModellistStore {
  list = [
    {
      id:1,
      name: '学习react',
      isDone: true
    },
    {
      id:2,
      name: '搞定mobx',
      isDone: true
    },
    {
      id:3,
      name: '搞定mobx',
      isDone: true
    },
    {
      id:4,
      name: '搞定mobx',
      isDone: true
    },
    {
      id:5,
      name: '搞定mobx',
      isDone: true
    }
  ]

  constructor() {
    makeAutoObservable(this)
  }

  checkItem = (id:any) => {
    console.log(id);
    const item = this.list.find(item  => item.id===id)
    // @ts-ignore
    item.isDone = !item.isDone
  }
  addItem = (item:any) =>{
    this.list.push(item)
  }
  delItem = (id:any) => {
    this.list = this.list.filter(item => item.id !== id)
  }

  get isAll () {
    return this.list.every(item => item.isDone)
  }
  allCheckitem = (checked:any) => {
    this.list.forEach(item => {
      item.isDone = checked
    })
  }


}
export default ModellistStore
