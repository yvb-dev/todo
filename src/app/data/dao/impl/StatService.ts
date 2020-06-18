import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {StatDAO} from "../interface/StatDAO";
import {Stat} from "../../../model/Stat";
import {CommonService} from "./CommonService";

export const STAT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
    providedIn: 'root'
})

//JSON формируется автоматически на response and request

export class StatService extends CommonService<Stat> implements StatDAO {

    constructor(@Inject(STAT_URL_TOKEN) private baseUrl, private http: HttpClient) {
        super(baseUrl, http);
    }

    getOverallStat(): Observable<Stat> {
        return this.http.get<Stat>(this.baseUrl);
    }
}
