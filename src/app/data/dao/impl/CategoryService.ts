import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";
import {CategorySearchValues} from "../search/SearchObjects";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./CommonService";

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
    providedIn: 'root'
})

//JSON формируется автоматически на response and request

export class CategoryService extends CommonService<Category> implements CategoryDAO {

    constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl: string, private http: HttpClient) {
        super(baseUrl, http);
    }

    findCategories(categorySearchValues: CategorySearchValues): Observable<any> {
        return this.http.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
    }
}
