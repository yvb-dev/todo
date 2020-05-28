import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OperType} from "../../dialog/OperType";

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

    // категории с кол-вом активных задач для каждой из них
    @Input('categoryMap')
    set setCategoryMap(categoryMap: Map<Category, number>) {
        this.selectedCategoryMap = categoryMap;
    }

    // кол-во невыполненных задач всего
    @Input()
    uncompletedTotal: number;


    // выбрали категорию из списка
    @Output()
    selectCategory = new EventEmitter<Category>();

    // удалили категорию
    @Output()
    deleteCategory = new EventEmitter<Category>();

    // изменили категорию
    @Output()
    updateCategory = new EventEmitter<Category>();

    // добавили категорию
    @Output()
    addCategory = new EventEmitter<string>(); // передаем только название новой категории

    // поиск категории
    @Output()
    searchCategory = new EventEmitter<string>(); // передаем строку для поиска


    // для отображения иконки редактирования при наведении на категорию
    private indexMouseMove: number;
    private searchCategoryTitle: string; // текущее значение для поиска категорий

    private selectedCategoryMap: Map<Category, number>; // список всех категорий и кол-во активных задач


    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog, // внедряем MatDialog, чтобы работать с диалоговыми окнами


    ) {
    }

    // метод вызывается автоматически после инициализации компонента
    ngOnInit() {
        // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }


    private showTasksByCategory(category: Category): void {

        // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
        if (this.selectedCategory === category) {
            return;
        }

        this.selectedCategory = category; // сохраняем выбранную категорию

        // вызываем внешний обработчик и передаем туда выбранную категорию
        this.selectCategory.emit(this.selectedCategory);
    }

    // сохраняет индекс записи категории, над который в данный момент проходит мышка (и там отображается иконка редактирования)
    private showEditIcon(index: number): void {
        this.indexMouseMove = index;

    }

    // диалоговое окно для редактирования категории
    private openEditDialog(category: Category): void {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [category.title, 'Редактирование категории', OperType.EDIT],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'delete') { // нажали удалить

                this.deleteCategory.emit(category); // вызываем внешний обработчик

                return;
            }

            if (result as string) { // нажали сохранить
                category.title = result as string;

                this.updateCategory.emit(category); // вызываем внешний обработчик
                return;
            }
        });
    }

    // диалоговое окно для добавления категории
    private openAddDialog(): void {

        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: ['', 'Добавление категории', OperType.ADD],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addCategory.emit(result as string); // вызываем внешний обработчик
            }
        });
    }

    // поиск категории
    private search(): void {


        if (this.searchCategoryTitle == null) {
            return;
        }

        this.searchCategory.emit(this.searchCategoryTitle);

    }


}
