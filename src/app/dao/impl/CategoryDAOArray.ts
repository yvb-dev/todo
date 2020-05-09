import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../model/Category";
import {Observable, of} from "rxjs";
import {Task} from "../../model/Task";
import {TestData} from "../../data/TestData";

export class CategoryDAOArray implements CategoryDAO {

    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    };

    add(category: Category): Observable<Category> {
        if (category === null || category.id === 0) {
            category.id = this.getLastIdCategory();
        }
        TestData.categories.push(category);
        return of(category);
    }

    private getLastIdCategory() {
        return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1;
    }

    delete(id: number): Observable<Category> {

        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === id) {
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

    search(title: string): Observable<Category[]> {
        return of(TestData.categories
            .filter(cat => cat.title.toUpperCase().includes(title.toUpperCase()))
            .sort((c1, c2) => c1.title.localeCompare(c2.title)));
    }

    update(category: Category): Observable<Category> {
        const categoryTmp = TestData.categories.find(value => value.id === category.id);
        TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1, category);
        return of(categoryTmp);
    }
}
