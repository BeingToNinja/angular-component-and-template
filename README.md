# Angular组件和模块教程

本教程根据官方网站进行编写


+ [安装CLI](#安装CLI)
+ [常用的Angular命令行指令](#常用的Angular命令行指令)
+ [运行本项目](#运行本项目)
+ [清理项目自带的演示代码](#清理项目自带的演示代码)
+ [Angular基本使用](#Angular基本使用)
    - [显示数据](#显示数据)

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






+ ng generate class <类名称> [可选项]: 

    在src/app目录下新增一个类文件以及一个测试文件. 与服务器数据交互基本上都会有固定的结构, 类似于数据库表结构, 通常可以声明一个类与之保持一致. 不过如果类过多则会显得src/app目录下过于拥挤不堪, 可以将其放入一个特定的目录下进行管理体验会更加不错.

    可选项:

        --skip-tests
            将不会生成以`spec.ts`结尾的测试文件

+ ng serve [可选项]: 

    启动Angular服务, 可以打开浏览器输入[http://localhost:4200](http://localhost:4200)进行访问.

    可选项:

        --host
            指定要监听的host, 默认为127.0.0.1, 如果需要局域网内可访问则应当指定为0.0.0.0
        --port
            指定要坚定的端口号, 默认为4200. 如果端口号已被占用则可使用该选项指定其它端口号
        --open
            自动打开默认浏览器来访问

## 运行本项目

1. 使用Git下载本项目
```shell
$ git clone https://github.com/BeingToNinja/angular-component-and-template.git
```
2. 安装Node库文件
```shell
$ cd angular-component-and-template && npm intall
```
3. 运行项目
```
$ ng serve
```
4. 查看路由文件`src/app/app-routing.module.ts`, 可以根据路由文件展示的路由进行访问

## 清理项目自带的演示代码

修改 src/app/app.component.html 的内容, 将系统自带的代码全部删除. 只留最后一行即可.

```html
<router-outlet></router-outlet>
```

## Angular基本使用

如无意外, 每个功能都独立在一个组件中, 方便理解.




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

5. 简单介绍Angular HTML模板语法.

    + 在HTML中可以使用组件类中存在的公有变量和公有方法

    + 双括号语法`{{ }}`: 将组件类中的公共成员变量和公共成员方法调用写在双括号中时, Angular会自动解析并将数据渲染出来

    + for循环语法: 可以遍历数组或对象等数据类型

        ```html
        <!-- for语法会重复当前标签进行遍历, heros为组件类的成员变量, hero是遍历heros时动态获取的元素 -->
        <ul>
            <li *ngFor="let hero of heros">
                {{ hero }}
            </li>
        </ul>
        <!-- 假设heros中的数据为['钢铁侠', '蜘蛛侠'], 则渲染数据如下 -->
        <ul>
            <li>钢铁侠</li>
            <li>蜘蛛侠</li>
        </ul>
        ```

    + if语法: 通过if判断为true的标签会显示, 如果为false的标签则会隐藏

        ```html
        <p *ngIf="10 > 3">该段话会显示出来</p>
        <p *ngIf="heros.length > 3">当heros元素的长度大于3时显示,否则隐藏</p>
        ```

    + 如果使用VScode编写代码,则推荐两个插件来写Angular模板非常好

        1. Angular Language Service: 可以在模板中自动提示成员变量和成员方法, 并且有简单的错误提示
        2. Angular Snippets: 提供了快速生成模板语法, 比如if, for等

6. 从服务端传输过来的数据一般都是特定字段的对象, 可以定义一个与之相同的类进行管理

    1. 生成一个Hero类, 并保存在src/app/classes目录下

        ```shell
        $ ng g class classes/hero
        ```

    2. 设置Hero类的字段

        ```typescript
        export class Hero {
            // 在构造函数中给参数赋予访问属性时, TypeScript会自动创建并将之赋值给成员变量, 不需要手动去赋值.
            constructor(
                public id: number,
                public name: string
            ) {}
        }
        ```
    3. 在组件中引入Hero类

        ```typescript
        import { Hero } from '../classes/hero';
        ```

    4. 在组件中实例化Hero类

        ```typescript
        ...

        export class DisplayDataComponent implements OnInit {

            heroes: Hero[] = [
                new Hero(1, '钢铁侠'),
                new Hero(5, '咸蛋超人'),
                new Hero(12, '蜘蛛侠'),
                new Hero(14, '蝙蝠侠'),
                new Hero(20, '煎饼侠'),
            ];

            myHero = this.heroes[0];

            ...
        }
        ```

    5. 在HTML模板中渲染数据

        ```html
        <!-- 由于heroes不再是字符串数组, 而是一个对象数组, 所以遍历时需要进行更改 -->
        <ul>
            <li *ngFor="let hero of heroes">
                <!-- 修改前: {{ hero }} -->
                {{ hero.name }}
            </li>
        </ul>
        ```

7. 至此, 已经可以完整在浏览器中显示我们编写的页面了