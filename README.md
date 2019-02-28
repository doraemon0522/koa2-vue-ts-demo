# vue3-koa2-node

## 本demo的全栈思路：后端项目为基础，前端项目为子目录

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 目录结构介绍 ##

	|-- actions                          // 后端路由
	|-- .babel.config.js                 // ES6语法编译配置
	|-- .gitignore                       // 忽略的文件
	|-- vue                              // 前端项目  
	|   |-- src                                
	|   |-- babel.config.js              // babel配置                                
	|   |-- tsconfig.json                // ts配置                                
	|   |-- tslint.json                  // tslint配置                                
	|-- index.dev.js                     // 项目开发环境启动配置
	|-- index.prod.js                    // 项目正式环境编译打包配置
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明
