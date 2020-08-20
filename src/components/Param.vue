<template>
    <div class="params">props 接受参数</div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class App extends Vue {
    @Prop({default: ''})
    id: any
    @Prop()
    age: any

    getVal() {
        console.log("参数id--->", this.id)
        console.log("参数age--->", this.age)
    }

    mounted () {
        this.getVal();
    }
   
}
</script>
