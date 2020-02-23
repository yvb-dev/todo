import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    constructor() {
    }

    getCategory(): Category[] {
        return TestData.categories;
    }

    getTask(): Task[]{
        return TestData.tasks;
    }
}
