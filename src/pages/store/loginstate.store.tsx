import {  makeAutoObservable } from 'mobx'

class LoginstateStore {
  isDone = false

  constructor() {
    makeAutoObservable(this)
  }
  login = ()=>{
    this.isDone = true
  }
}

export default LoginstateStore
