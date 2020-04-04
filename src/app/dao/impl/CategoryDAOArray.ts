import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../model/Category";
import {Observable, of} from "rxjs";
import {Task} from "../../model/Task";
import {TestData} from "../../data/TestData";

export class CategoryDAOArray implements CategoryDAO {

    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    };

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
