import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../model/Category";
import {Observable} from "rxjs";

export class CategoryDAOArray implements CategoryDAO{
    getAll: Observable<Category[]>;

    add(T): Observable<Category> {
        return undefined;
    }

    delete(id: number): Observable<Category> {
        return undefined;
    }

    get(id: number): Observable<Category> {
        return undefined;
    }

    search(name: string): Observable<Category[]> {
        return undefined;
    }

    update(T): Observable<Category> {
        return undefined;
    }

}
