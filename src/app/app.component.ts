import {Component} from '@angular/core';
import {Task} from "./model/Task";
import {MatTableDataSource} from "@angular/material/table";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent {
    title = 'Todo';
    tasks: Task[];
    categories: Category[];
    selectedCategory: Category;
    private searchTaskText: string = '';
    private statusFilter: boolean;
    private priorities: Priority[];
    private priorityFilter: Priority;
    private searchCategoryText: string = '';
    // показать/скрыть статистику
    private showStat = true;

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    }

    private onSelectCategory(category: Category) {
        this.selectedCategory = category;
        this.updateTasksAndStat();
    }

    private onUpdateTask(task: Task) {
        this.dataHandler.updateTask(task).subscribe(cat => {
            this.updateTasksAndStat()
        })
    }

    onDeleteTask(task: Task) {
        this.dataHandler.deleteTask(task.id).subscribe(cat => {
            this.updateTasksAndStat()
        })
    }

    onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(value => {
            this.selectedCategory = null;
            this.onSearchCategory(this.searchCategoryText)
        });
    }

    onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(value => {
            this.onSearchCategory(this.searchCategoryText)
        });
    }

    // поиск задач
    private onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }

    // фильтрация задач по статусу (все, решенные, нерешенные)
    private totalTasksCountInCategory: number;
    private completedCountInCategory: number;
    private uncompletedCountInCategory: number;
    private uncompletedTotalTasksCount: number;

    private onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status;
        this.updateTasks();
    }

    private updateTasks() {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }

    private onFilterTasksByPriority(priority: Priority) {
        this.priorityFilter = priority;
        this.updateTasks()
    }

    private onAddTask(task: Task) {
        this.dataHandler.addTask(task).subscribe(result => {
            this.updateTasksAndStat();
        });
    }

    private onAddCategory(category: Category) {
        this.dataHandler.addCategory(category).subscribe(result => this.updateTasks())
    }

    private onSearchCategory(title: string) {
        this.searchCategoryText = title;
        this.dataHandler.searchCategory(title).subscribe(categories => {
            this.categories = categories;
        })
    }

    private updateTasksAndStat() {
        this.updateTasks();
        this.updateStat();
    }

    // обновить статистику
    private updateStat() {
        zip(
            this.dataHandler.getTotalCountInCategory(this.selectedCategory),
            this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTotalCount())
            .subscribe(array => {
                this.totalTasksCountInCategory = array[0];
                this.completedCountInCategory = array[1];
                this.uncompletedCountInCategory = array[2];
                this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
            });
    }

    // показать-скрыть статистику
    private toggleStat(showStat: boolean) {
        this.showStat = showStat;
    }}
