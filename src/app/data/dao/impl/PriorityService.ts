import {Injectable} from '@angular/core';
import {Priority} from "../../../model/Priority";
import {Observable} from "rxjs";
import {PrioritySearchValues} from "../search/SearchObjects";
import {HttpClient} from "@angular/common/http";
import {PriorityDAO} from "../interface/PriorityDAO";

@Injectable({
    providedIn: 'root'
})

//JSON формируется автоматически на response and request

export class PriorityService implements PriorityDAO {

    url = 'http://loclahost:8080/priority';

    constructor(private httpClient: HttpClient) {
    }

    add(t: Priority): Observable<Priority> {
        return this.httpClient.post<Priority>(this.url + '/add', t);
    }

    delete(id: number): Observable<Priority> {
        return this.httpClient.get<Priority>(this.url + '/delete/' + id);
    }

    findPriorities(prioritySearchValues: PrioritySearchValues): Observable<any> {
        return this.httpClient.post<Priority[]>(this.url + '/search', prioritySearchValues);
    }

    findById(id: number): Observable<Priority> {
        return this.httpClient.get<Priority>(this.url + '/id/' + id);
    }

    findAll(): Observable<Priority[]> {
        return this.httpClient.get<Priority[]>(this.url + '/all');
    }

    update(t: Priority): Observable<Priority> {
        return this.httpClient.post<Priority>(this.url + '/update', t);
    }
}
