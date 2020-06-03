# Angular组件和模块教程

本教程根据官方网站进行编写


+ [安装CLI](#安装CLI)
+ [常用的Angular命令行指令](#常用的Angular命令行指令)
+ [运行本项目](#运行本项目)
+ [清理项目自带的演示代码](#清理项目自带的演示代码)
+ [Angular基本使用](#Angular基本使用)
    - [显示数据](#显示数据)
    - [模板语法](#模板语法)

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


## 模板语法

语法详细示例与使用可以在`template-syntax`组件中查看或下载运行示例以加深了解.

HTML是Angular的模板语言, 几乎所有HTML语法都是有效的模板语法. 但是`<script>`标签是不被允许的, 之所以禁止是为了消除脚本注入攻击的风险.

1. 插值和模板表达式

    1. 插值: 将表达式嵌入到标记的文本中, 默认情况下使用双花括号`{{ }}`来作为其定界符

        ```html
        <!-- 双花括号之间的文本通常是组件类属性的名称 -->
        <h3>当前用户: {{ currentUser }}</h3>
        <div><img src="{{ itemImageUrl }}"></div>

        <!-- Angular在解析双花括号时 先计算所有表达式, 再将结果转化为字符串, 之后与相邻的字符串连接, 最后赋值给元素或指令属性 进行页面渲染 -->
        <p>1 + 1 = {{ 1 + 1 }}. </p>

        <!-- 也可以调用组件类的方法 -->
        <p>1 + 1 != {{ 1 + 1 + getVal() }}</p>
        ```

    2. 模板表达式

        许多JavaScript表达式都是合法的模板表达式, 含有以下操作的表达式不允许出现在Angular模板中:

        + 赋值运算 (=, +=, -=, ...)
        + new, typeof, instanceof 等操作
        + ;和,表达式
        + ++和--运算符
        + 一些ES2015+的操作
        + 不支持按位运算符, 如 | 和 &
        + 不能引用全局命名空间中的任何东西, 也无法引用window或document.
        + 不能调用console.log(), Math.max()等方法

    3. 表达式上下文
    ```html
    <!-- customer 就是customers数组遍历时动态读取其元素的变量 -->
    <ul>
    <li *ngFor="let customer of customers">{{customer.name}}</li>
    </ul>

    <!-- 在标签元素上添加 #变量名, 则可以在HTML模板中通过该变量获取该标签元素的引用 -->
    <label>Type something:
    <input #customerInput>{{customerInput.value}}
    </label>
    ```

    4. 表达式准则

        + 简单
        + 快速执行
        + 没有明显可见的副作用

2. 模板语句

模板语句用于响应绑定目标(例如元素、组件或指令)引发的**事件**. 在[事件绑定](#事件绑定)部分会有更详细的介绍. 基本结构为 (事件名称)="语句"
```typescript
<button (click)="deleteHero()">删除英雄</button>
```
模板语句有副作用, 会通过用户操作触发相应的事件而更新应用程序的状态.

响应事件是Angular单向数据流的另一面. 在此事件循环期间, 可以随时随地更改任何内容.

模板语句与模板表达式一样, 都类似与JavaScript语言. 但模板语句的解析器与模板表达式的解析器略有不同, 模板语句支持基本赋值(=)和链接表达式(;). 除此之外并无不同.

模板语句上下文与使用准则也与模板表达式一致.


3. 数据绑定

数据绑定让开发者只需声明绑定源, 目标HTML元素之间的绑定, 剩余任务全交由框架去做, 使得应用程序更易于编写、读取和维护.

Angular提供了多种数据绑定. 其类型根据数据流的方式可以分为3类:

| 类型   |  语法  | 类别 |
|-------| ------ | ----|
| 插值   | `{{expression}}` | 单向, 从数据到视图
| 属性、状态、类名、样式| `[target]="expression"` | 单向, 从数据到视图
| 事件  | `(target)="statement"` | 单向, 从视图到数据
| 双向  | `[(target)]="expression"` | 双向绑定


+ 数据绑定和HTML

    在HTML开发的正常过程中, 您将创建带有HTML元素的视觉结构,并通过使用字符串常量设置元素属性来修改这些元素

    ```html
    <div class="special">Plain old HTML</div>
    <img src="images/item.png">
    <button disabled>Save</button>
    ```

    使用数据绑定, 您可以控制诸如按钮状态之类的事情:

    ```html
    <!-- 将按钮的不可用状态与 isUnchanged 变量进行绑定-->
    <button [disabled]="isUnchanged">Save</button>
    ```

    这里要注意的是 *绑定的是button的DOM元素的disabled属性, 而不是HTML属性. 通常, 数据绑定都是作用于DOM元素、组件和指令的属性, 而不是HTML属性*

+ HTML属性和DOM属性

    HTML属性和DOM属性之间的区别是了解Angular绑定如何工作的关键. **属性(attribute)由HTML定义, 可从DOM节点访问属性(property).**

    - 有少数HTML属性1:1映射到DOM属性上, 比方说 id
    - 一些HTML属性没有对应的DOM属性, 比方说 aria-*
    - 一些DOM属性没有对应的HTML属性, 比方说 textContent

    要记住, 即使HTML属性和DOM属性具有相同的名称, 它们也是不同的. 在Angular中, HTML属性的唯一作用是初始化元素和指令状态.

    **模板绑定适用于DOM属性和事件, 而不是HTML属性.** 即在编写数据绑定时, 您仅仅是在处理DOM属性和目标对象的事件.
    
    > 该通用规则可以帮助您建立HTML属性和DOM属性的思维模型: **HTML属性初始化DOM属性, DOM属性可以改变而HTML属性不能.** 此规则有一个例外: 可以通过setAttribute()重新初始化相应的DOM属性.

    #### 示例1: `<input>`
    #### 示例2: 禁用的按钮

    请在template-syntax组件中查看这两个示例, 很好的展现了HTML属性和DOM属性的区别.

数据绑定的目标是DOM对象. 根据绑定类型, 目标可以是属性(元素、组件或指令), 事件(元素、组件或指令)或有时是属性名称. 详情总结请看下表:

| 类型   |  目标  | 示例 |
|-------| ------ | ----|
| DOM属性   | 元素属性 | `<img [src]="heroImageUrl" />`
| DOM属性   | 组件属性 | `<app-component [property]="some-property"></app-component>`
| DOM属性   | 指令属性 | `<div [ngClass]="{'special': isSpecial}"></div>`
| 事件   | 元素属性 | `<button (click)="onSave()"></button>`
| 事件   | 组件属性 | `<app-component (action)="some-action"></app-component>`
| 事件   | 指令属性 | `<div (myClick)="clicked=$event" clickable>click me</div>`
| 双向  | 事件和DOM属性 | `<input [(ngModel)]="name" />`
| HTML属性  | HTML属性 | `<button [attr.aria-label]="help">help</button>`
| 类  | class属性 | `<div [class.special]="isSpecial">Special</div>`
| 样式  | style属性 | `<input type="button" [style.color]="isSpecial ? 'red' : 'green'" />`

4. DOM属性绑定

使用属性绑定来设置目标元素的DOM属性和@Input()指令

+ 单向绑定

DOM属性绑定从组件属性单方向传递到目标元素属性.
您不能使用属性绑定从目标元素读取值, 同样也不能在目标元素上调用方法. 如果该元素引发事件, 则需要使用**事件绑定**来监听.

+ 例子

    大部分属性绑定都是将一个元素属性赋值给组件属性.


    - 将img元素的src属性绑定到组件的itemImageUrl属性上

    ```html
    <img [src]="itemImageUrl" />
    ```

    - 绑定*colSpan*属性. 要注意这不是HTML的*colspan*属性!

    ```html
    <tr><td [colSpan]="2">Span 2 columns</td></tr>
    ```

    - 通过一个Angular指令来设置属性

    ```html
    <p [ngClass]="classes">[ngClass]绑定了classes属性/p>
    ```

    - 设置自定义组件的模型属性, 这是父子组件之间通信的好方法

    ```html
    <app-component [childItem]="parentItem"></app-component>
    ```

+ 绑定目标

    绑定目标属性使用方括号进行括起, 可以在属性前添加`bind-`来替代方括号. 不过这里推荐使用方括号语法, 比较方便. 在绝大多数情况下, 绑定目标名称同HTML属性的名称相同, 其依然是DOM属性, 而非HTML属性.

    如果忘记使用方括号或`bind-`, 则Angular会将字符串视为常量, 并使用该字符串初始化目标属性

+ 避免副作用

+ 返回正确的类型

    模板表达式应为目标属性期望的值类型. 即目标属性需要什么类型就应该返回什么类型.

+ 组件之间数据的传递

    在组件中接受传递过来的数据需要使用@Input()指令进行修饰

    ```typescript
    @Input() myString: string;
    @Input() myNumberArray: Array<number>;
    @Input() someElseType: Person;
    @Input() someElseTypeArray: Person[];
    ```

    在使用需要传递特定属性的组件时必须传递与要求的参数一致, 否则会发生错误导致无法运行或不可预估的结果.

+ 一次性字符串初始化

    如果满足一下所有条件, 则不应该使用绑定:
    - 目标属性接受一个字符串值
    - 字符串是一个固定值, 可以直接放入模板中
    - 此初始值永不变

+ 属性绑定与插值

    通常情况在插值和属性绑定之间可以互换. 插值是属性绑定的便捷替代方法. 但是, 将元素属性设置为*非字符串数据值*时, 必须使用属性绑定.

+ 内容安全

    假设字符串中含有脚本代码, 则在插值中使用时会对处于危险的HTML进行警报. 且HTML会按原样输出并不会执行JavaScript代码. 可以使用innerHTML属性绑定对之进行过滤:
    ```typescript
    // 含有恶意脚本的组件属性
    evilTitle = '模板 <script>alert("恶意攻击永不止步")</script> 语法';
    ```
    ```html
    <p>使用插值显示evilTitle变量: <span>{{ evilTitle }}</span></p>
    <p>使用属性绑定形式显示: <span [innerHTML]="evilTitle"></span></p>
    ```
    两者处理方法虽不同, 但均不会使恶意代码生效:
    ```
    使用插值显示evilTitle变量: 模板语法
    使用属性绑定形式显示: 模板 <script>alert("恶意攻击永不止步")</script> 语法
    ```

5. HTML属性、类和样式绑定

模板语法为不太适合属性绑定的情况提供了专门的单向绑定.

+ HTML属性绑定

直接使用HTML属性绑定来设置HTML属性的值.
通常, 使用**属性绑定**来设置一个元素的属性优先级高于使用字符串来设置. 然而, 有时候没有元素属性需要绑定, 此时便可以使用HTML属性绑定. 比方说[aria](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)和[svg](https://developer.mozilla.org/en-US/docs/Web/SVG), 它们是纯粹的HTML属性, 不对应元素的DOM属性, 也不设置元素的DOM属性. 在这些情况下, 没有要绑定的DOM属性.
HTML属性绑定语法类似于DOM属性绑定, 只不过是在方括号中的元素属性前多了`attr.`. 这样就可以解析为字符串的表达式来设置HTML属性值, 或者在删除时表达式解析为NULL.
HTML属性绑定的主要用例之一就是设置ARIA属性, 如下所示:
```html
<button [attr.aria-label]="actionName">{{actionName}} with Aria</button>
```

> colspan 和 colSpan  
  注意colspan属性(HTML)和colSpan属性(DOM)之间的区别.  
  如果如下书写:  
  ```<tr><td colspan="{{ 1 + 1 }}">Three-Four</td></tr>```
  就会收到如下错误:  
  ```
  Template parse errors:
  Can't bind to 'colspan' since it isn't a known native property.
  ```  
> 如消息所示, 该td元素没有colspan属性. 这是正确的. 因为colspan是colSpan相应的HTML属性. **插值和属性绑定只能设置DOM属性, 而不能设置HTML属性**. 所以, 应该如下编写代码:  
  ```<tr><td [colSpan]="1 + 1">Three-Four</td></tr>```

+ 类绑定

以下是类在纯HTML中设置没有绑定的属性的方法:
```html
<div class="foo bar">Some text</div>
```
您还可以使用**类绑定**从元素的属性中添加和删除CSS类名称.  
要创建单个类绑定, 请以前缀`class.`开头, 后跟CSS类的名称 (如`[class.foo]="hasFoo"`). Angular在绑定表达式为真时添加类, 在表达式为假时删除类.
要创建对多个类的绑定, 请使用[class]的通用绑定 (如`[class]="classExpr"`). 该表达式可以是一个以空格分隔的类名称字符串, 也可以将其格式化为一个对象, 并以类名作为键且使用true/fasle作为值. 对于对象格式, Angular仅在其关联的值为真时才添加一个类.
如果同一类名有多个绑定, 则使用·样式优先级·解决冲突.

| 绑定类型   |  语法  | 输入类型 | 示例 
|-------| ------ | ----| --- |
| 单类绑定   | [class.foo]="hasFoo" |  boolean \| undefined \|null | true, false 
| 多类绑定   | [class]="classExpr" | string | "my-class-1 my-class-2 my-class-3" 
| | | {[key: string]: boolean \| undefined \| null} | {foo: true, bar: false}
| | | Array\<string> | ['foo', 'bar']

`NgClass`指令与[class]绑定如出一辙, 然而该指令未来可能会被废弃, 请尽量不要使用.

+ 样式绑定

以下是样式在纯HTML中设置的样例:
```html
<div style="color: blue">Some text</div>
```
您可以通过样式绑定来动态设置样式.
要创建单个样式绑定, 请以前缀`style.`开头, 后跟CSS样式属性的名称(如`[style.width]="width"`). 该属性将设置为绑定表达式的值, 该表达式通常是一个字符串. 您还可以添加数字类型的单位扩展名, 例如em或%.

> 请注意, 样式属性名称可以使用*破折号*, 或*驼峰式*

如果想切换多种样式, 则可以直接绑定到属性. 绑定中附加的表达式通常是样式字符串列表, 例如: [style]="styleExpr", [style]="width: 100px; height: 100px;".

您还可以将表达式格式化为对象, 并以样式名为键, 样式值为值. 例如 {width: '100px', height: '100px'}.

如果同一样式属性有多个绑定，则使用样式优先级规则解决冲突。

| 绑定类型   |  语法  | 输入类型 | 示例 
|-------| ------ | ----| --- |
| 单样式绑定   | [style.width]="width" |  string \| undefined \|null | "100px"
| 含单位的单样式绑定   | [style.width.px]="width" |  number \| undefined \|null | "100"
| 多样式绑定   | [style]="styleExpr" | string | "width: 100px; height: 100px" 
| | | {[key: string]: string \| undefined \| null} | {width: '100px', height: '100px'}
| | | Array\<string> | ['width', '100px']

`NgStyle`指令与[style]绑定如出一辙, 然而该指令未来可能会被废弃, 请尽量不要使用.

+ 样式优先级

当有多个绑定到相同的类名或样式属性时, Angular使用一组优先规则来解决冲突并确定最终将哪些类或样式应用于元素

+ 委托较低优先级的样式


