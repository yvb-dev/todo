import {Injectable} from '@angular/core';
import {TaskDAO} from "../interface/TaskDAO";
import {Task} from "../../../model/Task";
import {Observable} from "rxjs";
import {TaskSearchValues} from "../search/SearchObjects";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

//JSON формируется автоматически на response and request

export class TaskService implements TaskDAO {

    url = 'http://loclahost:8080/task';

    constructor(private httpClient: HttpClient) {
    }

    add(t: Task): Observable<Task> {
        return this.httpClient.post<Task>(this.url + '/add', t);
    }

    delete(id: number): Observable<Task> {
        return this.httpClient.get<Task>(this.url + '/delete/' + id);
    }

    findTasks(taskSearchValues: TaskSearchValues): Observable<any> {
        return this.httpClient.post<Task[]>(this.url + '/search', taskSearchValues);
    }

    findById(id: number): Observable<Task> {
        return this.httpClient.get<Task>(this.url + '/id/' + id);
    }

    findAll(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.url + '/all');
    }

    update(t: Task): Observable<Task> {
        return this.httpClient.post<Task>(this.url + '/update', t);
    }
}
