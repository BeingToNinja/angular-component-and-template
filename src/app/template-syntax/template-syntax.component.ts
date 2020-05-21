import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-syntax',
  templateUrl: './template-syntax.component.html',
  styleUrls: ['./template-syntax.component.css']
})
export class TemplateSyntaxComponent implements OnInit {

  domDisabled: boolean = false;
  htmlDisabled: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 示例1 input 渲染HTML属性和DOM属性到页面上来观察彼此区别
   * @param input 
   * @param render 
   */
  getHTMLAttributeAndDomProperty(input: HTMLInputElement, render: HTMLDivElement){
     render.innerHTML = `<p>HTML的value属性值为<strong>${input.getAttribute('value')}</strong></p>
     <p>DOM的value属性值为<strong>${input.value}</strong></p>`;
  }

  /**
   * 切换HTML的disabled属性
   */
  switchHtmlButton() {
    this.htmlDisabled = this.htmlDisabled ? null : 'disabled';
  }

  /**
   * 切换DOM的disabled属性
   */
  switchDomButton() {
    this.domDisabled = !this.domDisabled;
  }
}
