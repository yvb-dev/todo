import {Component} from '@angular/core';
import {Task} from "./model/Task";
import {MatTableDataSource} from "@angular/material/table";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

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

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    }

    private onSelectCategory(category: Category) {
        this.selectedCategory = category;

        this.updateTasks();

        // this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
        //     .subscribe(tasks => {
        //         this.tasks = tasks
        //     });
    }

    private onUpdateTask(task: Task) {
        this.dataHandler.updateTask(task).subscribe(() => {
            this.dataHandler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null
            ).subscribe(value => this.tasks = value)
        })
    }

    // private writeConsoleTask(task: Task) {
    //     console.log(task);
    // }
    onDeleteTask(task: Task) {
        this.dataHandler.deleteTask(task.id).subscribe(() => {
            this.dataHandler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null
            ).subscribe(value => this.tasks = value)
        })

    }

    onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(value => {
            this.selectedCategory = null;
            this.onSelectCategory(this.selectedCategory)
        });
    }

    onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(value => {
            this.onSelectCategory(this.selectedCategory);
        });
    }

    // поиск задач
    private onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }

    // фильтрация задач по статусу (все, решенные, нерешенные)
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
            this.updateTasks()
        });
    }

    private onAddCategory(category: Category) {
        this.dataHandler.addCategory(category).subscribe(result => this.updateTasks())
    }
}
