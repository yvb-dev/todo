import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Input()
    categories: Category[];
    @Input()
    selectedCategory: Category;

    @Output()
    selectCategory = new EventEmitter<Category>( );
    @Output()
    private deleteCategory = new EventEmitter<Category>();
    @Output()
    private updateCategory = new EventEmitter<Category>();

    indexMouseMove: number;

    constructor(
        private dialog: MatDialog,
        private dataHandlerService: DataHandlerService) {
    }

    ngOnInit() {
    }

    showTasksByCategory(category: Category): void {
        if (this.selectedCategory === category) {
            return
        }
        this.selectedCategory = category;
        this.selectCategory.emit(this.selectedCategory);
    }

    showEditIcon(index: number): void {
        this.indexMouseMove = index;
    }

    openEditDialog(category: Category): void {

        const dialogRef = this.dialog.open(
            EditCategoryDialogComponent,
            {
                data: [category, 'Редактирование категории'],
                autoFocus: false
            })

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
                this.deleteCategory.emit(category);
                return;
            }

            if (result as Category) {
                this.updateCategory.emit(category);
                return;
            }
        })
    }
}
