import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {OperType} from "../../dialog/OperType";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    // ссылки на компоненты таблицы
    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;


    @Output()
    deleteTask = new EventEmitter<Task>();

    @Output()
    selectCategory = new EventEmitter<Category>(); // нажали на категорию из списка задач

    @Output()
    updateTask = new EventEmitter<Task>();

    @Output()
    filterByTitle = new EventEmitter<string>();

    @Output()
    filterByStatus = new EventEmitter<boolean>();

    @Output()
    filterByPriority = new EventEmitter<Priority>();

    @Output()
    addTask = new EventEmitter<Task>();


    // текущие задачи для отображения на странице
    @Input('tasks')
    private set setTasks(tasks: Task[]) { // напрямую не присваиваем значения в переменную, только через @Input
        this.tasks = tasks;
        this.fillTable();
    }

    @Input('priorities')
    set setPriorities(priorities: Priority[]) {
        this.priorities = priorities;
    }

    @Input()
    selectedCategory: Category;


    private dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы


    // поиск
    private searchTaskText: string; // текущее значение для поиска задач
    private selectedStatusFilter: boolean = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
    private selectedPriorityFilter: Priority = null;   // по-умолчанию будут показываться задачи по всем приоритетам



    // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];

    private priorities: Priority[]; // список приоритетов (для фильтрации задач)
    private tasks: Task[];



    constructor(
        private dataHandler: DataHandlerService, // доступ к данным
        private dialog: MatDialog, // работа с диалоговым окном

    ) {
    }

    ngOnInit() {

        // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();

        this.onSelectCategory(null);

    }



    // в зависимости от статуса задачи - вернуть цвет названия
    private getPriorityColor(task: Task): string {

        // цвет завершенной задачи
        if (task.completed) {
            return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

    }

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private fillTable(): void {


        if (!this.dataSource) {
            return;
        }

        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

        this.addTableObjects();


        // когда получаем новые данные..
        // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
        // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
        this.dataSource.sortingDataAccessor = (task, colName) => {

            // по каким полям выполнять сортировку для каждого столбца
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
        };


    }

    private addTableObjects(): void {
        this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
        this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
    }

    // диалоговое редактирования для добавления задачи
    private openEditTaskDialog(task: Task): void {

        // открытие диалогового окна
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Редактирование задачи', OperType.EDIT],
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            // обработка результатов

            if (result === 'complete') {
                task.completed = true; // ставим статус задачи как выполненная
                this.updateTask.emit(task);
            }


            if (result === 'activate') {
                task.completed = false; // возвращаем статус задачи как невыполненная
                this.updateTask.emit(task);
                return;
            }

            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (result as Task) { // если нажали ОК и есть результат
                this.updateTask.emit(task);
                return;
            }

        });
    }


    // диалоговое окно подтверждения удаления
    private openDeleteDialog(task: Task): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить задачу: "${task.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали ОК
                this.deleteTask.emit(task);
            }
        });
    }

    private onToggleStatus(task: Task): void {
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }


    private onSelectCategory(category: Category): void {
        this.selectCategory.emit(category);
    }

    // фильтрация по названию
    private onFilterByTitle(): void {
        this.filterByTitle.emit(this.searchTaskText);
    }

    // фильтрация по статусу
    private onFilterByStatus(value: boolean): void {

        // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }


    // фильтрация по приоритету
    private onFilterByPriority(value: Priority): void{

        // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
        if (value !== this.selectedPriorityFilter) {
            this.selectedPriorityFilter = value;
            this.filterByPriority.emit(this.selectedPriorityFilter);
        }
    }

    // диалоговое окно для добавления задачи
    private openAddTaskDialog(): void {

        // то же самое, что и при редактировании, но только передаем пустой объект Task
        const task = new Task(null, '', false, null, this.selectedCategory);

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи', OperType.ADD]});

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали ОК и есть результат
                this.addTask.emit(task);
            }
        });

    }


}
