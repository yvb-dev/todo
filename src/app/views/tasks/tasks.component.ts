import {
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import { OperType } from 'src/app/dialog/OperType';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
    private dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

    // ссылки на компоненты таблицы
    @ViewChild(MatPaginator, {static: false})
    private paginator: MatPaginator
    @ViewChild(MatSort, {static: false})
    private sort: MatSort
    private searchTaskText: string = '';
    private selectedStatusFilter: boolean = null;

    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog,
    ) {
    }

    private tasks: Task[];

    @Input("tasks")
    private set setTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.fillTable()
    }

    private selectedCategory: Category;

    @Input("category")
    private set setCategory(category: Category) {
        this.selectedCategory = category;
    }

    private priorities: Priority[];

    @Input("priorities")
    private set setPriorities(priorities: Priority[]) {
        this.priorities = priorities;

    }

    @Output()
    private addTask = new EventEmitter<Task>();

    @Output()
    private filterByPriority = new EventEmitter<Priority>();

    @Output()
    private filterByStatus = new EventEmitter<boolean>();

    @Output()
    private filterByTitle = new EventEmitter();

    @Output()
    private selectCategory = new EventEmitter();

    @Output()
    private deleteTask = new EventEmitter();

    @Output()
    private updateTask = new EventEmitter();
    // private selectTask = new EventEmitter();
    // selectedTask: Task;

    ngOnInit() {

        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();

        this.fillTable();
    }

    toggleTaskCompleted(task: Task): void {
        task.completed = !task.completed
    }

    // в зависимости от статуса задачи - вернуть цвет названия
    private getPriorityColor(task: Task): string {

        if (task.completed) {
            return '#F8F9FA'
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff';

    }

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private fillTable(): string {
        if (!this.dataSource) {
            return;
        }

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

    private openEditTaskDialog(task: Task): void {

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Редактирование задачи', OperType.EDIT],
            autoFocus: false
        })

        dialogRef.afterClosed().subscribe(value => {
            //handling result

            if (value === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (value as Task) {
                this.updateTask.emit(task);
                return;
            }
        })
    }

    openDeleteDialog(task: Task) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: `Подтвердите действие`,
                message: `Вы действительно хотитет удалить задачу: "${task.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteTask.emit(task);
            }
        });
    }

    onToggleStatus(task: Task) {
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }

    onSelectCategory(category: Category) {
        this.selectCategory.emit(category);
    }

//фильтрация по названию
    private onFilterByTitle() {
        this.filterByTitle.emit(this.searchTaskText)
    }


    // фильтрация по статусу
    selectedPriorityFilter: any;

    private onFilterByStatus(value: boolean) {

        // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }

    // фильтрация по приоритету
    private onFilterByPriority(value: Priority) {

        // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
        if (value !== this.selectedPriorityFilter) {
            this.selectedPriorityFilter = value;
            this.filterByPriority.emit(this.selectedPriorityFilter);
        }
    }

    private openAddTaskDialog() {
        const task: Task = new Task(null, '', false, null, this.selectedCategory);
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Добавить Задачу', OperType.ADD],
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addTask.emit(task);
                return
            }
        });
    }
}
