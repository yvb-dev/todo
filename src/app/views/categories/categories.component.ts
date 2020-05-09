import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {OperType} from "../../dialog/OperType";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    indexMouseMove: number;
    searchCategoryTitle: string;

    @Input()
    categories: Category[];
    @Input()
    selectedCategory: Category;

    @Output()
    selectCategory = new EventEmitter<Category>();
    @Output()
    private deleteCategory = new EventEmitter<Category>();
    @Output()
    private updateCategory = new EventEmitter<Category>();
    @Output()
    private addCategory = new EventEmitter<Category>();
    @Output()
    private searchCategory = new EventEmitter();

    constructor(private dialog: MatDialog) {
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
                data: [category, 'Редактирование категории', OperType.EDIT],
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

    private openAddCategoryDialog() {
        const category: Category = new Category(null, '');
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [category, 'Добавление категории', OperType.ADD],
            autoFocus: false
        })

        dialogRef.afterClosed().subscribe(result => {
            this.addCategory.emit(category);
            return;
        })
    }

    private search() {
        if (this.searchCategoryTitle == null) {
            return
        }
        this.searchCategory.emit(this.searchCategoryTitle)
    }
}
