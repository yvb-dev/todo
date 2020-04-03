import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable} from "rxjs";
import {Priority} from "../../model/Priority";

export class PriorityDAOArray implements PriorityDAO{
    getAll: Observable<Priority[]>;

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
