import {Injectable} from '@angular/core';
import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";
import {CategorySearchValues} from "../search/SearchObjects";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

//JSON формируется автоматически на response and request

export class CategoryService implements CategoryDAO {

    url = 'http://loclahost:8080/category';

    constructor(private httpClient: HttpClient) {
    }

    add(t: Category): Observable<Category> {
        return this.httpClient.post<Category>(this.url + '/add', t);
    }

    delete(id: number): Observable<Category> {
        return this.httpClient.get<Category>(this.url + '/delete/' + id);
    }

    findCategories(categorySearchValues: CategorySearchValues): Observable<any> {
        return this.httpClient.post<Category[]>(this.url + '/search', categorySearchValues);
    }

    findById(id: number): Observable<Category> {
        return this.httpClient.get<Category>(this.url + '/id/' + id);
    }

    findAll(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(this.url + '/all');
    }

    update(t: Category): Observable<Category> {
        return this.httpClient.post<Category>(this.url + '/update', t);
    }
}
