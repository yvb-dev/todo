import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Subject} from "rxjs";
import {toASCII} from "punycode";
import {TasksComponent} from "../views/tasks/tasks.component";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    taskObservable = new BehaviorSubject<Task[]>(TestData.tasks);
    categoryObservable = new BehaviorSubject<Category[]>(TestData.categories);


    constructor() {
    }

    // getCategory(): Category[] {
    //     return TestData.categories;
    // }

    fillTask() {
        this.taskObservable.next(TestData.tasks);
    }

    fillTaskByCategory(category: Category) {
        const tasks = TestData.tasks.filter(task => task.category === category);
        this.taskObservable.next(tasks)
    }
}
