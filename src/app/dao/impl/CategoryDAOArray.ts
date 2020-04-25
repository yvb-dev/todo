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

        TestData.tasks.forEach(task => {
            if(task.category && task.category.id === id){
                task.category = null;
            }
        })
        const categoryTmp = TestData.categories.find(category => category.id === id);
        TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1);
        return of(categoryTmp);
    }

    get(id: number): Observable<Category> {
        return undefined;
    }

    search(name: string): Observable<Category[]> {
        return undefined;
    }

    update(category: Category): Observable<Category> {
        const categoryTmp = TestData.categories.find(value => value.id === category.id);
        TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1, category);
        return of(categoryTmp);
    }
}
