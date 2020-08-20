<template>
    <div class="indexdb">
        <button @click="add">写入数据</button>
        <button @click="readAll">读取数据</button>
        <button @click="() => $router.push('/param/1314520/20')">路由跳转</button>
        <div class="show">
            <span v-for="(item, i) in data" :key="i">{{item.id}}-{{item.name}}-{{item.age}}
                <button @click="del(item.id)">删除</button>
                <button @click="update(item.id)">修改数据</button>-----------
            </span>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class App extends Vue {
    db: any = ""
    objectStore: any = ""
    data: any[] = []
    /* 写入数据 */
    add() {
        let req: any = this.db.transaction(["person"], "readwrite").objectStore("person").add({
                id: Math.random(),
                name: "张子飒",
                age: Math.random()
            }
            
        )
        req.onsuccess = () => {
            this.readAll()
            console.log("数据写入成功")
        }
        req.onerror = () => {
            console.log("数据写入失败")
        }
    }
    /* 读取单条数据 */
    read() {
        let transaction: any = this.db.transaction(['person']);
        let os: any = transaction.objectStore('person');
        //获取单条数据
        let req: any  = os.get(1);
        req.onerror = () => {
            console.log("读取失败")
        }
        req.onsuccess = (e: any) => {
            const { result } = e.target;
            if (result) {
                this.data = result;
                console.log(e)
            } else {
                console.log("未获得数据")
            }
        }
    }
    readAll() {
        let req: any = this.db.transaction('person').objectStore('person');
        this.data = []
         req.openCursor().onsuccess =  (e: any) => {
            let cursor = e.target.result;

            if (cursor) {
                this.data.push(cursor.value)
                cursor.continue();
            } else {
            console.log('没有更多数据了！');
            }
        }
    }
    del(key: number) {
         let req: any = this.db.transaction(['person'], 'readwrite')
            .objectStore('person')
            .delete(key);

        req.onsuccess =  () => {
            this.readAll()
            console.log('数据删除成功');
        };
    }
    update(id: number) {
        let req = this.db.transaction(['person'], 'readwrite')
            .objectStore('person')
            .put({ id, name: '王祖贤', age: Math.random() });

        req.onsuccess =  () => {
            this.readAll();
            console.log('数据更新成功');
        };

        req.onerror =  () => {
            console.log('数据更新失败');
        }
    }

    created () {
        /* 入参  数据库名，版本号 */
        let request: any = window.indexedDB.open("TestIndexDB", 2);
        
        //新增数据库
        request.onupgradeneeded = (e: any) => {
            //获取实例
            this.db = e.target.result;
            //先判断是否存在改数据库 
            if (!this.db.objectStoreNames.contains('person')) {
                this.objectStore = this.db.createObjectStore('person', { keyPath: 'id', autoIncrement: true });
                //新建索引
                this.objectStore.createIndex('name', 'name', { unique: false });
                this.objectStore.createIndex('age', 'age', { unique: false });
            }
            
        }
        request.onerror = (e: any) => {
            console.log(e, "数据库出错")
        } 

        request.onsuccess = (e: any) => {
            this.db = request.result;
            this.readAll();
            console.log(e, "数据库打开成功", this.db)
        }

    }
}
</script>
<style>
.indexdb > button {
   width: 120px;
   height: 50px;
   margin: 0 10px;
}
.indexdb .show {
    border: 1px solid green;
    width: 100%;
    height: 200px;
}
.indexdb .show button {
    cursor: pointer;
}
</style>
