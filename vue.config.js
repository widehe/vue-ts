const path = require("path");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProd = process.env.NODE_ENV === "production";
//导入速度分析插件
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")

//实例化插件
// const smp = new SpeedMeasurePlugin()
//导入体积分析插件
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}


module.exports = {
  publicPath: "./",

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: '',

  //html的输出路径
  indexPath: "index.html",

  //文件名哈希
  filenameHashing: true,

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [
    /* string or regex */
  ],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  
  configureWebpack: config => {
    let e = ['@babel/polyfill', './src/main.ts']
    config.entry = e
    /* 压缩 */
    if (isProd) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          //超过4kb 压缩
          threshold: 4096
        }),
        // new BundleAnalyzerPlugin()
      )
    } 
    config.resolve = { extensions: [".ts", ".tsx", ".js", ".json"], alias: {
      '@': resolve('src')
    } },
    config.module.rules.push({    
      test: /\.tsx?$/,    
      loader: 'ts-loader',    
      exclude: /node_modules/,    
      options: {
        appendTsSuffixTo: [/\.vue$/],    
      }    
    })
  },
  chainWebpack: config => {
     //打包编译后的 文件名称  【模块名称.版本号.时间戳】
    config.output.filename(`js/[name].${ new Date().getTime()}.js`).end()
    config.output.chunkFilename(`js/[name].${ new Date().getTime()}.js`)
    // config.entry({app:['@babel/polyfill', './src/main.ts']})
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    // 修改图片大小限制
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => {
        // 修改它的选项...
        // console.log(options)
        delete options.limit;
        return options;
      });
  },
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        // 配置全局 scss 变量
        // prependData: `
        //         @import "src/styles/variables.scss";
        //         `
      }
    },

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true
  },


  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    // entry: {
    //   app: "./src/main.ts"
    // },
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    // https: false,
    hotOnly: true,
    disableHostCheck: true,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    // proxy: {
    //   "/cruc/": {
    //     target: "http://47.112.194.46:8083",
    //     changeOrigin: true
    //   }
    // }
  }
}