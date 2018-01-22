# 简介

> 基于vue.js抽奖项目，附带背景音乐

> 技术栈：vue + vuex + vue-router + axios + elementUI + nprogress + less + ECMAjavascript6

## 说明
本项目主要有以下几个点需要`注意`：
1. 为了保证数据安全，需要设置登录，在登录成功之后的前提下获取后天传递的数据；
2. 由于抽奖的数据都上千条，cookie和storage存储空间受限都不够用，依次考虑利用浏览器支持的indexDB来存储用户数据库，以及主要奖项和该奖项抽取的人数的；
3. 每次抽奖完成的结果，须返回给后台存储数据，以保障前后台数据一致性（具体抽奖的逻辑功能，不受限，取决于前后台同事自己沟通结果）；
4. 记录单次抽奖人数，不论抽多少次，只要满足本轮奖项人数，即宣告本轮抽取结束，代码逻辑不以抽取多少次为依据；
5. 考虑抽奖现场肯定会加抽奖项的环节（不多说，参与过年会的都知道，没抽中的人肯定会叫喊老板现场再抽的），故这里也设置了前端可选项其他奖，默认设置抽取99人，毕竟加抽的奖项人数，99人足够啦，这里也可灵活变动；

## 功能
1. 抽奖前，选择需要抽取的奖项
2. 点击开始抽奖按钮(或Enter回车键)，数据滚动
3. 点击抽取(或space空格键)结束滚动，显示中奖人员
4. 再点击开始抽取进入第2步循环，若完成本轮抽取，则进入第1步选择抽取其他奖项

## 截图
针对1920*1080大屏以上显示，不适配移动端，以下为该项目主要界面截图：
![登录界面](screenshot/1.png)
![抽奖界面](screenshot/2.png)


## 开发

``` bash
# 克隆项目
git clone https://github.com/renmingliang/vue-lottery.git

# 安装依赖
npm install

# 本地浏览器地址：localhost:8080
npm run dev

# 发布正式版本
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
