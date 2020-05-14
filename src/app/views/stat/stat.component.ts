import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  @Input()
  completeTasksInCategory: number;
  @Input()
  totalTasksInCategory: number;
  @Input()
  uncompleteTasksInCategory: number;

  @Input()
  showStat: boolean; // показать или скрыть статистику

  constructor() {
  }

  ngOnInit() {
  }

}
