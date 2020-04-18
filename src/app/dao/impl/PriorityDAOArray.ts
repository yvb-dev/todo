import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable, of} from "rxjs";
import {Priority} from "../../model/Priority";
import {TestData} from "../../data/TestData";

export class PriorityDAOArray implements PriorityDAO{
    getAll(): Observable<Priority[]>{
        return of(TestData.priorities);
    };

    add(T): Observable<Priority> {
        return undefined;
    }

    delete(id: number): Observable<Priority> {
        return undefined;
    }

    get(id: number): Observable<Priority> {
        return undefined;
    }

    update(T): Observable<Priority> {
        return undefined;
    }

}
