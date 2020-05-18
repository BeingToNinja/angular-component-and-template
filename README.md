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

    新增一个组件, 组件新增成功后会在src/app目录下创建一个与组件名称相同的目录. 同时会自动在`app.module.ts`文件中将组件导入(注意: 如果未将组件导入则无法使用!). 

    目录下通常包含如下几个文件:

        组件名.component.css: css样式文件
        组件名.component.html: 组件HTML, 如果使用内联模板参数-t则不会生成该文件
        组件名.component.spec.ts: 测试文件
        组件名.comonent.ts: 核心逻辑处理文件

    组件名称命名问题:

        当组件名称使用下划线`_`时, Angular命令行工具会自动转化成短横线`-`. 如果使用驼峰式命令组件时, 会自动分隔驼峰并用短横线`-`连接.
        ng g c display-data
        ng g c display_data
        ng g c displayData
        这三种方式新增的组件目录均为display-data. 组件的类名则是使用驼峰式并且首字母大写. 以上方式创建的组件类名为DisplayDataComponent.

    简写:
        
        ng g c <组件名称>

    可选项:

        --inline-template (-t)
            使用内联模板, 当组件的HTML代码量极少时常会使用

+ ng serve [可选项]: 

    启动Angular服务, 可以打开浏览器输入[http://localhost:4200](http://localhost:4200)进行访问.

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

1. 通过Angular命令行工具创建一个名为`display-data`的组件
```shell
$ ng g c display-data
```

2. 新增一个路由用来显示`display-data`组件, 以此校验该组件是否添加成功.
   路由是比较复杂的, 这里我们只使用最简单的路由方式, 故所有的路由都添加在`app-routing.module.ts`文件中. 该文件中有一个routes数组变量就是用来储存路由的. 添加方式如下:
   ```typescript
    // 须将组件导入方可使用
    import { DisplayDataComponent } from './display-data/display-data.component';

    const routes: Routes = [
        // path代表路由地址
        // component为该路由地址对应的组件
       { path: 'display-data', component: DisplayDataComponent}
    ];
   ```

3. 做完这一切之后, 就可以通过浏览器打开对应的地址[http://localhost:4200/display-data](http://localhost:4200/display-data). 此时, 可以看到已经显示了`src/app/display-data/display-data.component.html`中的内容了. 如果没有正常显示请查看服务器是否启动(ng serve), 且本教程启动服务的方式不指定host和port, 故全采用默认, 以后就不再赘述. 

4. 在编写代码前需要了解 display-data.component.ts 文件中的一些语法以及相关知识.
```typescript
// 从@angular/core库中引入Component, 所有组件都需要引入Component
import { Component, OnInit } from '@angular/core';

// 修饰器语法
@Component({
  // 一个CSS选择器，它告诉Angular在模板HTML中找到相应标记的位置创建并插入此组件的实例
  // <app-display-data></app-display-data>
  selector: 'app-display-data',
  // 此组件的HTML模板的模块相对地址。该模板定义了组件的宿主视图。
  templateUrl: './display-data.component.html',
  // 内联HTML模板, 与templateUrl字段二选一, 通常在HTML代码短小时使用
  // template: `<h1>Hello World</h1>`,
  // 样式文件列表
  styleUrls: ['./display-data.component.css'],
  // 组件所需的服务提供者数组, 等用到之后再介绍
  providers: [],
})

// 将组件类导出, 这样就可以供其它组件使用
export class DisplayDataComponent implements OnInit {

  /**
   * 构造函数, 几乎不会在该函数中书写逻辑代码 
   */
  constructor() { }

 /**
  * 所有初始化的逻辑应该在该函数中书写, 而不是构造函数中
  * 需要实现 OnInit 接口
  */  
  ngOnInit(): void {
  }
}
```


