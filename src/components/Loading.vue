<template>
    <div class="loading">
        <p>loading 测试</p>
        <Button type="danger" @click="del">点击删除</Button>
        <Button type="primary" @click="update">点击修改</Button>
    </div>
</template>

<script>
import { Button } from "element-ui"
import { Vue, Component } from 'vue-property-decorator'
import { confirm } from "../api/decorator"
@Component({
    components: {
        Button
    }
})

export default class App extends Vue {
    @confirm("是否删除？", "提示", () => { console.log("我已取消操作") })
    del() {
        console.log("这里做删除操作")
    }

    @confirm("是否修改？", "提示", () => { console.log("我已取消操作") })
    update() {
        console.log("这里做修改操作")
    }
}
</script>

<style lang="ts" scoped>

</style>
