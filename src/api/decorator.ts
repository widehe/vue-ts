import { MessageBox } from 'element-ui'
export const testDec = (target: any, name: string, descriptor: any):any => {
  const oldValue = descriptor.value;
  // name 是修饰的方法名字
  descriptor.value = function() {
    console.log(`Calling ${name} with${target}`);
    return oldValue.apply(this);
  };

  return descriptor;
}


/**
 * @description 确认提示框装饰器
 * @param message 提示信息
 * @param title 标题
 * @param cancelFun 取消回调函数
 */
export const confirm = (messsage: string, title: string, cancelFun: any ) => {
  return function (target: any, name: string, descriptor: any) {
    const originFn = descriptor.value;
    descriptor.value = async function(...rest: any) {
      try {
        await MessageBox.confirm(messsage, title, {
            type: 'warning',
            center: true
        })
        originFn.apply(this, rest)
      } catch (err) {
        cancelFun && cancelFun(err)
      }
    }
  }
} 