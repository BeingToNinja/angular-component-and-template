# Angular组件和模块教程

本教程根据官方网站进行编写


## 安装CLI

+ **方法一**: 
    全局安装Angular命令行工具, 安装完成后就可以使用ng命令创建Angular项目了
    ```shell
    $ npm install -g @angular/cli
    $ ng new <Angular项目名称>
    ```
+ **方法二**: 
    使用npx来调用Angular命令行, 这样就不需要全局进行安装了
    ```shell
    $ npx @angular/cli new <Angular项目名称>
    ```

如果觉得方法二使用起来输入太多字符比较麻烦,则可以编辑shell脚本文件来重命名
```
# 如此一来可以和全局安装的方式使用没有任何区别
alias ng="npx @angular/cli"
```

## 常用的Angular命令行指令

+ ng new <项目名称> [可选项]: 

    创建一个新项目 

    可选项:

        --skip-git (-g) 
            不初始化git仓库
        --routing       
            自动添加路由模块, 如果不添加该选项则会在创建项目时进行询问是否添加路由模块.

+ ng generate component <组件名称> [可选项]: 

    新增一个组件

    简写:
        
        ng g c <组件名称>

    可选项:

        --inline-template (-t)
            使用内联模板, 当组件的HTML代码量极少时常会使用

+ ng serve [可选项]: 

    启动Angular服务, 可以打开浏览器输入`http://localhost:4200`进行访问.

    可选项:

        --host
            指定要监听的host, 默认为127.0.0.1, 如果需要局域网内可访问则应当指定为0.0.0.0
        --port
            指定要坚定的端口号, 默认为4200. 如果端口号已被占用则可使用该选项指定其它端口号
        --open
            自动打开默认浏览器来访问

## 清理项目自带的演示代码

修改 src/app/app.component.html 的内容, 将系统自带的代码全部删除. 只留最后一行即可.

    ```html
    <router-outlet></router-outlet>
    ```

## Angular基本使用

如无意外, 每个功能都独立在一个组件中, 方便理解.

+ [显示数据](#显示数据)



## 显示数据



