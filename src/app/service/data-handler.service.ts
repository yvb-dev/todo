import {Injectable} from '@angular/core';
import {TestData} from "../data/TestData";
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {toASCII} from "punycode";
import {TasksComponent} from "../views/tasks/tasks.component";
import {TaskDAO} from "../dao/interface/TaskDAO";
import {TaskDAOArray} from "../dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../dao/impl/PriorityDAOArray";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private taskDAO = new TaskDAOArray();
    private categoryDAO = new CategoryDAOArray();
    private priorityDAO = new PriorityDAOArray();

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

    getAllPriorities(): Observable<Priority[]> {
        return this.priorityDAO.getAll();
    }

    searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return this.taskDAO.search(category, searchText, status, priority);
    }

    updateTask(task: Task): Observable<Task> {
        return this.taskDAO.update(task);
    }

    deleteTask(id: number): Observable<Task> {
        return this.taskDAO.delete(id);
    }

    updateCategory(category: Category): Observable<Category> {
        return this.categoryDAO.update(category);
    }

    deleteCategory(id: number): Observable<Category> {
        return this.categoryDAO.delete(id);
    }

    addTask(task: Task): Observable<Task> {
        return this.taskDAO.add(task);
    }

    addCategory(category: Category): Observable<Category> {
        return this.categoryDAO.add(category);
    }

    searchCategory(title: string): Observable<Category[]> {
        return this.categoryDAO.search(title);
    }
}
