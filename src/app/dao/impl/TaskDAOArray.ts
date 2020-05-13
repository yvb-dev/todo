import {TaskDAO} from "../interface/TaskDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {Task} from "../../model/Task";
import {TestData} from "../../data/TestData";

export class TaskDAOArray implements TaskDAO {

    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

    add(task: Task): Observable<Task> {
        if (task.id === null || task.id === 0) {
            task.id = this.getLastIdTask();
        }
        TestData.tasks.push(task)
        return of(task);
    }

    private getLastIdTask(): number {
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
    }

    delete(id: number): Observable<Task> {
        const taskTmp = TestData.tasks.find(value => value.id === id)
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
        return of(taskTmp);
    }

    get(id: number): Observable<Task> {
        return undefined;
    }

    // кол-во завершенных задач в заданной категории (если category === null, то для всех категорий)
    getCompletedCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(category, null, true, null).length);
    }

    // кол-во незавершенных задач в заданной категории (если category === null, то для всех категорий)
    getUncompletedCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(category, null, false, null).length);
    }

    // кол-во всех задач в заданной категории (если category === null, то для всех категорий)
    getTotalCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(category, null, null, null).length);
    }

    // кол-во всех задач в общем
    getTotalCount(): Observable<number> {
        return of(TestData.tasks.length);
    }

    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return of(this.searchTasks(category, searchText, status, priority));
    }

    private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

        let allTasks = TestData.tasks;

        // поочереди применяем все условия (какие не пустые)
        if (status != null) {
            allTasks = allTasks.filter(task => task.completed === status);
        }

        if (category != null) {
            allTasks = allTasks.filter(task => task.category === category);
        }

        if (priority != null) {
            allTasks = allTasks.filter(task => task.priority === priority);
        }

        if (searchText != null) {
            allTasks = allTasks.filter(
                task =>
                    task.title.toUpperCase().includes(searchText.toUpperCase()) // учитываем текст поиска (если '' - возвращаются все значения)
            );
        }

        return allTasks;
    }

    update(task: Task): Observable<Task> {
        const tmpTask = TestData.tasks.find(value => value.id == task.id);
        TestData.tasks.splice(TestData.tasks.indexOf(tmpTask), 1, task);
        return of(task);
    }
}
