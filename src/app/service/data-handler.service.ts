import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {toASCII} from "punycode";
import {TasksComponent} from "../views/tasks/tasks.component";
import {TaskDAO} from "../dao/interface/TaskDAO";
import {TaskDAOArray} from "../dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../dao/impl/CategoryDAOArray";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private taskDAO = new TaskDAOArray();
    private categoryDAO = new CategoryDAOArray();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDAO.getAll();
    }

    getAllCategories(): Observable<Category[]>{
        return this.categoryDAO.getAll();
    }

    // fillTaskByCategory(category: Category) {
    //     const tasks = TestData.tasks.filter(task => task.category === category);
    //     this.tasksSubject.next(tasks)
    // }
}
