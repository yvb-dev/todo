import {Inject, Injectable, InjectionToken} from '@angular/core';
import {TaskDAO} from "../interface/TaskDAO";
import {Task} from "../../../model/Task";
import {Observable} from "rxjs";
import {TaskSearchValues} from "../search/SearchObjects";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./CommonService";

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
    providedIn: 'root'
})

//JSON формируется автоматически на response and request

export class TaskService extends CommonService<Task> implements TaskDAO {


    constructor(@Inject(TASK_URL_TOKEN) private baseUrl, private http: HttpClient) {
        super(baseUrl, http);
    }

    findTasks(taskSearchValues: TaskSearchValues): Observable<any> {
        return this.http.post<Task[]>(this.baseUrl + '/search', taskSearchValues);
    }
}
