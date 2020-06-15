import {Injectable} from '@angular/core';
import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";
import {CategorySearchValues} from "../search/SearchObjects";
import {HttpClient} from "@angular/common/http";
import {StatDAO} from "../interface/StatDAO";
import {Stat} from "../../../model/Stat";

@Injectable({
    providedIn: 'root'
})

//JSON формируется автоматически на response and request

export class StatService implements StatDAO {

    url = 'http://loclahost:8080/category';

    constructor(private httpClient: HttpClient) {
    }

    getOverallStat(): Observable<Stat> {
        return this.httpClient.get<Stat>(this.url);
    }
}
