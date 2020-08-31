<template>
  <div class="decorator">
    装饰器模式
    <p>{{ bar }}--->{{ calNumber }}</p>
    <p>porps 父传子 {{ propA }}</p>
  </div>
</template>

<script lang="ts">
import { testDec } from '../api/decorator'
import {
  Vue,
  Component,
  Prop,
  Watch,
  Emit,
  Inject,
} from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
  testWatchVal: number = 0
  index: number = 10

  @Inject('bar') bar: any

  @Prop({ default: '' })
  propA: any

  @testDec
  test(a: number, b: number) {
    return a + b
  }

  go() {
    console.log(this.propA)
  }
  //computed 的用法  get/set
  get calNumber() {
    return this.index * 2
  }
  // set calNumber(val) {
  //     console.log("--->",val)
  // }

  @Emit('emitFunc')
  toStr(): string {
    return '哈哈哈'
  }

  @Watch('testWatchVal')
  changeTestWatch(val: number) {
    console.log('testWatchVal--->', val)
  }

  mounted() {
    this.go()
    console.log('test--->', this.test(2, 4))
    setTimeout(() => {
      this.testWatchVal++
      this.toStr()
    }, 3000)
  }
}
</script>

<style>
.decorator {
  margin-top: 50px;
}
</style>
