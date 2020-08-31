<template>
  <div class="hello">
    <h1>welcome my test-vue project</h1>
    <p>$emit 子组件传来的值 --> {{ sonVal }}</p>
    <Button
      @click="
        () => $router.push({ path: '/param/1314520', query: { age: '20' } })
      "
      >路由跳转, 传参</Button
    >
    <Button @click="() => $router.push({ path: '/indexDB' })">indexDb</Button>
    <Button @click="() => $router.push({ path: '/loading' })"
      >loding 装饰器</Button
    >
    <Decorator propA="200" @emitFunc="emitFunc"></Decorator>
  </div>
</template>

<script lang="ts">
import { Button } from 'element-ui'
import Decorator from './Decorator.vue'
import { Vue, Component, Provide } from 'vue-property-decorator'
//枚举
enum MyModel {
  你 = 1,
  我 = 2,
  他 = 3,
}
//自定义类型
interface MyObj {
  name: string
  num: number | string
}

@Component({
  components: {
    Button,
    Decorator,
  },
})
export default class App extends Vue {
  name: string = 'App'
  sonVal: string = ''
  @Provide('bar') bar = 'Provide Inject 父组件注入子组件的值'
  get(obj: MyObj): void {
    console.log(this.name, obj)
  }
  //泛型
  set<T>(name: T): T {
    console.log(typeof name)
    return name
  }
  //子组件处方父组件的自定义事件
  emitFunc(str: string) {
    this.sonVal = str
    console.log('子组件传来的：', str)
  }

  created() {
    console.log(MyModel[1])
    this.get({
      name: '么么哒',
      num: 100,
    })
    this.set<number>(100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
