export const testDec = (target: any, name: string, descriptor: any):any => {
    const oldValue = descriptor.value;
    // name 是修饰的方法名字
    descriptor.value = function() {
      console.log(`Calling ${name} with${target}`, arguments);
      return oldValue.apply(this, arguments);
    };
  
    return descriptor;
}