// jshint esversion:6 
const path = require('path');
const glob = require('glob'); // glob.sync()返回正则路径下所有匹配的文件
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// __dirname为当前绝对路径
// path.resolve:会把一个路径或者一个路径片段的序列解析为一个绝对路径
// path.join: 使用平台特定的分割符号(/或者\)把给定的path片段连接到一起，并且规范化成路径，若任意一个路径片段类型错误，会报错
//* *和 *一样，可以匹配任何内容，但**不经可以匹配路径中的某一段，而且可以匹配'a/b/c'这样带有'/'的内容，所以它还可以匹配子文件夹下的文件

let DIST_PATH = path.resolve(__dirname, '../dist');
let SRC_PATH = path.resolve(__dirname, '../src');

let entryFiles = {}; // 入口文件
let pluginAll = []; // 存放所有的html插件
// let filesTest = path.join(SRC_PATH + '/../*.js');
// console.log(filesTest);
// [\s]表示只要出现空白就匹配
// [\S]表示非空白就匹配
let jsFiles = glob.sync(SRC_PATH + '/**/*.js');
// console.log(jsFiles);
jsFiles.forEach((value) => {
    let subkey = value.match(/src\/(\S*)\.js/)[1];
    entryFiles[subkey] = value;
});

let htmlFiles = glob.sync(SRC_PATH + '/**/*.html');
// console.log(htmlFiles);

htmlFiles.forEach((value) => {
    let pageStr = value.match(/src\/(\S*)\.html/);
    let name = pageStr[1];
    // console.log(name);
    let htmlConfig = {
        filename: path.join(DIST_PATH, name + '.html'),
        title: name,
        template: path.join(SRC_PATH, name + '.html'),
        inject: true, // script放在html里面的位置 body head true(默认值) false
        hash: true,
        chunks: [name],
        excludeChunks: [], // 排除的js
        date: new Date(),
        minify: false
        // minify: {
        // removeComments: true,
        // collapseWhitespace: true, //压缩空格
        // }
    };
    // 如果是index页面，需要添加common.js到页面中
    if (name === 'index/index') {
        htmlConfig.chunks = [name, 'app'];
    } else if (name === 'test/test') {
        htmlConfig.chunks = [name, 'app'];
    }
    // console.log(htmlConfig.chunks);
    let htmlPlugin = new htmlWebpackPlugin(htmlConfig);
    pluginAll.push(htmlPlugin);
});

pluginAll.push(new CleanWebpackPlugin());

const devMode = process.env.NODE_ENV === 'development'; // 是否是开发模式
// console.log(process.env);

module.exports = {
    // 入口js文件
    // entry : path.resolve(__dirname,'../src/index.js') , //方式一：打包一个js
    // entry : ['./src/index.js','./src/test.js'],         //方式二:把多个js打包在一起
    // entry: {                                            //方式三:把多个js分别打包成不同目录
    //     index: './src/index.js',
    //     test: './src/test.js'
    // },
    entry: entryFiles,
    // 编译输出的路径
    output: {
        path: DIST_PATH, // 本地编译后地址
        filename: '[name].[chunkhash:5].js',
        // publicPath: 'http://cdn.com', // 上线地址
    },
    // 模块解析
    module: {
        // loader意义： 用于对模块的源代码进行转换
        // loader用途： 可以使你在 import 或"加载"模块时预处理文件，
        // loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，
        // 将内联图像转换为 data URL。
        // loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: SRC_PATH,
                use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
            }, {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1, // 代表import的css提前
                            sourceMap: devMode
                        }
                    },
                    // postcss-loader负责进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等
                    {
                        loader: "postcss-loader",  // 加前缀
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['> 0.15% in CN']
                                }),
                            ],
                            sourceMap: devMode
                        }
                    },
                ]
            }, {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1, // 代表import的css提前
                            sourceMap: devMode
                        }
                    },
                    // postcss-loader负责进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等
                    {
                        loader: "postcss-loader",  // 加前缀
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['> 0.15% in CN']
                                }),
                            ],
                            sourceMap: devMode
                        }
                    }, { loader: 'less-loader', options: { sourceMap: devMode } }
                ]
            }, {
                test: /\.scss$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    "css-loader",  // 将 CSS 转化成 CommonJS 模块
                    {
                        loader: "postcss-loader",  // 加前缀
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['> 0.15% in CN']
                                }),
                            ],
                            sourceMap: devMode
                        }
                    },
                    "sass-loader" // 将 Sass 编译成 CSS
                ]
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, { // 虽然html-webpack-plugin会默认解析ejs语法，但我测试的时候无法解析导入的侧栏、头部、底部的模板
                test: /\.ejs$/,
                loader: "ejs-loader?variable=data"
            }, {
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]', // 配置自定义文件名模板
                    // outputPath: '/assets/', // 指定输出目录l,不建议使用这个目录
                    publicPath: "/dist/", //建议使用该地址不是唯一的，根据你的代码实际路由地址进行修改
                    limit: 8 * 1024, //图片大小小于8kb，就会被base64处理
                }
            }

        ]
    },
    // 插件
    plugins: pluginAll,
    // 并发服务器
    devServer: {
        hot: true, // 热更新
        contentBase: DIST_PATH,
        port: 8011, // 服务端口
        host: '0.0.0.0',// host体地址
        historyApiFallback: true,
        open: true, // 自动打开浏览器
        useLocalIp: true,// 是否在打包的时候用自己的ip
        proxy: {
            '/api': 'http://localhost:3000'
        },
        https: true
    },
    watchOptions: {
        poll: 1000,// 每秒检查一次变动
        aggregateTimeout: 500, // 防止重复按键，500毫米内算按键一次
        ignored: path.resolve(__dirname, 'node_modules'),// 不监测大型文件夹
    }
};