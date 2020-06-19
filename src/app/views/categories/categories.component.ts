import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../model/Category";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog, MatDialogActions} from "@angular/material/dialog";
import {DialogAction} from "../../object/DialogResult";
import {CategorySearchValues} from "../../data/dao/search/SearchObjects";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    filterTitle: string; // текущее значение для поиска категорий
    filterChanged: boolean;
    indexMouseMove: number;  // для отображения иконки редактирования при наведении на категорию

    @Input()
    categories: Category[];
    @Input()
    selectedCategory: Category;
    @Input()
    categorySearchValues: CategorySearchValues
    ues;
    // поиск категории

    @Output()
    searchCategory = new EventEmitter<CategorySearchValues>(); // передаем CategorySearchValues для поиска
    // удалили категорию
    @Output()
    deleteCategory = new EventEmitter<Category>();
    // изменили категорию
    @Output()
    updateCategory = new EventEmitter<Category>();
    // добавили категорию
    @Output()
    addCategory = new EventEmitter<Category>(); // передаем только название новой категории


    // кол-во невыполненных задач всего
    @Input()
    uncompletedCountForCategoryAll: number;


    constructor(
        private dialog: MatDialog // внедряем MatDialog, чтобы работать с диалоговыми окнами
    ) {
    }

    // метод вызывается автоматически после инициализации компонента
    ngOnInit() {
    }

    private showTasksByCategory(category: Category): void {

        // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
        if (this.selectedCategory === category) {
            return;
        }

        this.selectedCategory = category; // сохраняем выбранную категорию

        // вызываем внешний обработчик и передаем туда выбранную категорию
        // this.selectCategory.emit(this.selectedCategory);
    }

    // сохраняет индекс записи категории, над который в данный момент проходит мышка (и там отображается иконка редактирования)
    private showEditIcon(index: number): void {
        this.indexMouseMove = index;

    }

    // диалоговое окно для редактирования категории
    private openEditDialog(category: Category): void {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [new Category(category.id, category.title), 'Редактирование категории'],
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return
            }
            if (result.action === DialogAction.DELETE) {
                this.deleteCategory.emit(category); // вызываем внешний обработчик
            }
            if (result.action === DialogAction.SAVE) {
                this.updateCategory.emit(result.obj as Category); // вызываем внешний обработчик
            }
        });
    }

    // диалоговое окно для добавления категории
    private openAddDialog(): void {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [new Category(null, ''), 'Добавление категории'],
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return
            }
            if (result.action === DialogAction.SAVE) {
                this.addCategory.emit(result.obj as Category); // вызываем внешний обработчик
            }
        });
    }

    // поиск категории
    private search(): void {
        this.filterChanged = false;
        if (!this.categorySearchValues) {
            return;
        }
        this.categorySearchValues.title = this.filterTitle;
        this.searchCategory.emit(this.categorySearchValues)
    }

    checkFilterChanged() {
        this.filterChanged = false;
        if (this.filterTitle !== this.categorySearchValues.title) {
            this.filterChanged = true;
        }
        return this.filterChanged;
    }

    clearAndSearch() {
        this.filterTitle = null;
        this.search()
    }
}
