import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {IntroService} from "./service/intro.service";
import {CategoryService} from "./data/dao/impl/CategoryService";
import {CategorySearchValues, TaskSearchValues} from "./data/dao/search/SearchObjects";
import {TaskService} from "./data/dao/impl/TaskService";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    categories: Category[];     // все категории
    tasks: Task[];
    uncompletedCountForCategoryAll: number;
    showStat = true;     // показать/скрыть статистику
    selectedCategory: Category = null;     // выбранная категория
    categorySearchValues = new CategorySearchValues(); // параметры поисков // экземпляр можно создать тут же, т.к. не загружаем из cookies
    taskSearchValues = new TaskSearchValues(); // параметры поисков // экземпляр можно создать тут же, т.к. не загружаем из cookies
    totalTasksFounded: number;

    constructor(
        private  categoryService: CategoryService,
        private  taskService: TaskService,
        private introService: IntroService
    ) {
    }

    ngOnInit() {
        this.fillAllCategories();
    }

    // заполняет категории и кол-во невыполненных задач по каждой из них (нужно для отображения категорий)
    private fillAllCategories() {
        this.categoryService.findAll().subscribe(result => {
            this.categories = result;
        })
    }

    // поиск категории
    private searchCategory(categorySearchValues: CategorySearchValues): void {
        this.categoryService.findCategories(categorySearchValues).subscribe(result => {
            this.categories = result;
        })
    }

    // добавление категории
    private addCategory(category: Category): void {
        this.categoryService.add(category).subscribe(result => {
            this.searchCategory(this.categorySearchValues);
        })
    }

    // удаление категории
    private deleteCategory(category: Category) {
        this.categoryService.delete(category.id).subscribe(result => {
            this.searchCategory(this.categorySearchValues);
        })
    }

    // обновлении категории
    private updateCategory(category: Category): void {
        this.categoryService.update(category).subscribe(result => {
            this.searchCategory(this.categorySearchValues);
        })
    }

    // изменение категории
    private selectCategory(category: Category): void {

        this.selectedCategory = category;
        this.taskSearchValues.categoryId = category ? category.id : null;
        this.searchTasks(this.taskSearchValues);
    }


    // обновление задачи
    private onUpdateTask(task: Task): void {
    }

// удаление задачи
    private onDeleteTask(task: Task) {
        // this.dataHandler.deleteTask(task.id).pipe(
        //     concatMap(task => {
        //             return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
        //                 return ({t: task, count});
        //             }));
        //         }
        //     )).subscribe(result => {
        //
        //     const t = result.t as Task;
        //
        // 	// если указана категория - обновляем счетчик для соотв. категории
        //     // чтобы не обновлять весь список - обновим точечно
        //     if (t.category) {
        //         this.categoryMap.set(t.category, result.count);
        //     }
        //
        //     this.updateTasksAndStat();
        //
        // });
    }


// поиск задач
    private onSearchTasks(searchString: string): void {
        // this.searchTaskText = searchString;
        // this.updateTasks();
    }

// фильтрация задач по статусу (все, решенные, нерешенные)
    private onFilterTasksByStatus(status: boolean): void {
        // this.statusFilter = status;
        // this.updateTasks();
    }

// фильтрация задач по приоритету
    private onFilterTasksByPriority(priority: Priority): void {
        // this.priorityFilter = priority;
        // this.updateTasks();
    }

    private updateTasks(): void {
        // this.dataHandler.searchTasks(
        //     this.selectedCategory,
        //     this.searchTaskText,
        //     this.statusFilter,
        //     this.priorityFilter
        // ).subscribe((tasks: Task[]) => {
        //     this.tasks = tasks;
        // });
    }

// добавление задачи
    private onAddTask(task: Task) {
        // this.dataHandler.addTask(task).pipe(// сначала добавляем задачу
        //     concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
        //         // .. и считаем кол-во задач в категории с учетом добавленной задачи
        //         return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
        //                 return ({t: task, count}); // в итоге получаем массив с добавленной задачей и кол-вом задач для категории
        //             }));
        //         }
        //     )).subscribe(result => {
        //
        //     const t = result.t as Task;
        //
        //     // если указана категория - обновляем счетчик для соотв. категории
        //     // чтобы не обновлять весь список - обновим точечно
        //     if (t.category) {
        //         this.categoryMap.set(t.category, result.count);
        //     }
        //
        //     this.updateTasksAndStat();
        //
        // });
    }


// показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private updateTasksAndStat(): void {
        // this.updateTasks(); // обновить список задач
        //
        // // обновить переменные для статистики
        // this.updateStat();
    }

// обновить статистику
    private updateStat(): void {
        // zip(
        //     this.dataHandler.getTotalCountInCategory(this.selectedCategory),
        //     this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
        //     this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
        //     this.dataHandler.getUncompletedTotalCount())
        //
        //     .subscribe(array => {
        //         this.totalTasksCountInCategory = array[0];
        //         this.completedCountInCategory = array[1];
        //         this.uncompletedCountInCategory = array[2];
        //         this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
        //     });
    }

// показать-скрыть статистику
    private toggleStat(showStat: boolean): void {
        // this.showStat = showStat;
    }

    private searchTasks(taskSearchValues: TaskSearchValues) {
        this.taskSearchValues = taskSearchValues;
        this.taskService.findTasks(this.taskSearchValues).subscribe(result => {
            this.totalTasksFounded = result.totalElements;
            this.tasks = result.content;
        });
    }

    paging(pageEvent: PageEvent) {
        // если изменили настройку "кол-во на странице" - заново делаем запрос и показываем с 1й страницы
        if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
            this.taskSearchValues.pageNumber = 0; // новые данные будем показывать с 1-й страницы (индекс 0)
        } else {
            // если просто перешли на другую страницу
            this.taskSearchValues.pageNumber = pageEvent.pageIndex;
        }

        this.taskSearchValues.pageSize = pageEvent.pageSize;
        this.taskSearchValues.pageNumber = pageEvent.pageIndex;

        this.searchTasks(this.taskSearchValues); // показываем новые данные
    }
}
