<template>
  <div class="params">
    props 接受参数
    <p>
      {{ paramId }}
    </p>
    <p>{{ age }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class App extends Vue {
  @Prop({ default: '' })
  paramId: any
  @Prop()
  age: any

  getVal() {
    console.log('参数paramId--->', this.paramId)
    console.log('参数age--->', this.age)
  }

  mounted() {
    this.getVal()
  }
}
</script>
