<template>
    <div class="loading">
        <p>loading 测试</p>
        <Button type="danger">点击删除</Button>
    </div>
</template>

<script>
import { Button } from "element-ui"
import { Vue, Component } from 'vue-property-decorator'
@Component({
    components: {
        Button
    }
})

export default class App extends Vue {
    
}
</script>

<style lang="ts" scoped>

</style>
