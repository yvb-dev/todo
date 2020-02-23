import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    categories: Category[];

    constructor(private dataHandlerService: DataHandlerService) {
    }

    ngOnInit() {
        this.categories = this.dataHandlerService.getCategory();
    }

}
