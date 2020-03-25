import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

    tasks: Task[];

    // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
    private dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

    // ссылки на компоненты таблицы
    @ViewChild(MatPaginator, {static: false})
    private paginator: MatPaginator
    @ViewChild(MatSort, {static: false})
    private sort: MatSort

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);

        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();

        this.refreshTable();
    }

    ngAfterViewInit(): void {
        this.addTableObject();
    }

    toggleTaskCompleted(task: Task) {
        task.completed = !task.completed
    }

    // в зависимости от статуса задачи - вернуть цвет названия
    private getPriorityColor(task: Task) {

        if (task.completed) {
            return '#F8F9FA'
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff';

    }

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private refreshTable() {
        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
        this.addTableObject();

        // когда получаем новые данные..
        // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
        // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
        this.dataSource.sortingDataAccessor = (task, colName) => {
            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'date': {
                    return task.date ? task.date : null;
                }
                case 'title': {
                    return task.title;
                }

            }
        }
    }

    private addTableObject(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
}
