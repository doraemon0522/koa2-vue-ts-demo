# vue3-koa2-node

## 本demo的全栈思路：后端项目为基础，前端项目为子目录
vue部分：使用vue-cli3，选择支持ts语法，less，配置vue-router+vuex进行vue开发，基于webpack4.x。

## Project setup
```
npm install
```
## 脚本命令参看package.json scripts

## 目录结构介绍 ##

	|-- actions                          // 后端路由
	|-- .babel.config.js                 // ES6语法编译配置
	|-- .gitignore                       // 忽略的文件
	|-- vue                              // 前端项目  
	|   |-- src                                
	|   |-- babel.config.js              // babel配置 
	|   |-- webpack.config.js            // webpack配置                                              
	|-- index.dev.js                     // 项目开发环境启动配置
	|-- index.prod.js                    // 项目正式环境编译打包配置
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- tsconfig.json                    // ts配置                                
	|-- tslint.json                      // tslint配置 
	|-- README.md                        // 说明
