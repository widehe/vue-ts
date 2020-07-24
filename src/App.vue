<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>111</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <IndexDB></IndexDB>
    <Decorator propA="200" @emitFunc="emitFunc"></Decorator>
  </div>
</template>

<script lang='ts'>
import HelloWorld from './components/HelloWorld.vue'
import IndexDB from "./components/IndexDB.vue"
import Decorator from "./components/Decorator.vue"
import { Vue, Component, Provide } from 'vue-property-decorator'
//枚举
enum MyModel {
  你 = 1,
  我 = 2,
  他 = 3
}
//自定义类型
interface MyObj {
  name: string;
  num: number;
}
//组件装饰器
@Component({
    components: { HelloWorld, IndexDB, Decorator }
})
export default class App extends Vue {
  name:string = 'App' 
  @Provide('bar') bar = 'Provide 父组件注入子组件的值';
  get(num: MyObj):void {
    console.log(this.name, num)
  }
  //泛型
  set<T>(name: T):T {
    console.log(typeof name)
    return name;
  }
  //子组件处方父组件的自定义事件
  emitFunc(str: string){
    console.log("子组件传来的：", str)
  }

  created () {
    console.log(MyModel[1])
    this.get({
      name: "么么哒",
      num: 100
    })
    this.set<number>(110)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
