import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Input()
    categories: Category[];
    activeCategory: Category;

    constructor(private dataHandlerService: DataHandlerService) {
    }

    ngOnInit() {
    }

    showTasksByCategory(category: Category) {
        // this.activeCategory = category;
        // this.dataHandlerService.fillTaskByCategory(category);
    }
}
