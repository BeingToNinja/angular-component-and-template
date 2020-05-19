import { Component, OnInit } from '@angular/core';
import { Hero } from '../classes/hero';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {

  title = "英雄列表";
  heroes: Hero[] = [
    new Hero(1, '钢铁侠'),
    new Hero(5, '咸蛋超人'),
    new Hero(12, '蜘蛛侠'),
    new Hero(14, '蝙蝠侠'),
    new Hero(20, '煎饼侠'),
  ];

  myHero = this.heroes[0];

  constructor() { 
  }

  ngOnInit(): void {
  }
}