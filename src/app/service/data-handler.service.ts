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
import {Priority} from "../model/Priority";

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

    getTaskById(id: number): Observable<Task> {
        return this.taskDAO.get(id)
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoryDAO.getAll();
    }

    searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return this.taskDAO.search(category, searchText, status, priority);
    }

    updateTask(task: Task): Observable<Task> {
        return this.taskDAO.update(task);
    }

}
