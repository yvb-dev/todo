import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Category} from "../../model/Category";
import {DialogAction, DialogResult} from "../../object/DialogResult";


@Component({
    selector: 'app-edit-category-dialog',
    templateUrl: './edit-category-dialog.component.html',
    styleUrls: ['./edit-category-dialog.component.css']
})

// создание/редактирование категории
export class EditCategoryDialogComponent implements OnInit {

    dialogTitle: string; // текст для диалогового окна
    category: Category; // текст для названия категории (при реактировании или добавлении)
    canDelete = false;

    constructor(
        private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: [Category, string], // данные, которые передали в диалоговое окно
        private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    ) {
    }

    ngOnInit() {
        // получаем переданные в диалоговое окно данные
        this.category = this.data[0];
        this.dialogTitle = this.data[1];
        if (this.category && this.category.id && this.category.id > 0) {
            this.canDelete = true;
        }
    }

    // нажали ОК
    private confirm(): void {
        this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.category));
    }

    // нажали отмену (ничего не сохраняем и закрываем окно)
    private cancel(): void {
        this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
    }

    // нажали Удалить
    private delete(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить категорию: "${this.category.title}"? (сами задачи не удаляются)`
            },
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close(new DialogResult(DialogAction.DELETE)); // нажали удалить
            }
        });
    }
}
