
const prodPlugin = []
/* 生产环境删除 console.log */
if (process.env.NODE_ENV === "production") {
  prodPlugin.push([
    'transform-remove-console',
    {
      exclude: ["error", "warn"]
    }
  ])
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodPlugin
  ]
}
