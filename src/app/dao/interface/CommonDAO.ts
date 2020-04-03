import {Observable} from "rxjs";

export interface CommonDAO<T> {
    // CRUD

    add(T): Observable<T>;

    update(T): Observable<T>;

    delete(id: number): Observable<T>;

    get(id: number): Observable<T>;

    getAll: Observable<T[]>;

}
