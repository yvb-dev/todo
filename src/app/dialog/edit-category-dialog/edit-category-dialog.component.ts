import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../model/Category";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import { OperType } from '../OperType';

@Component({
    selector: 'app-edit-category-dialog',
    templateUrl: './edit-category-dialog.component.html',
    styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
    private dialogTitle: string;
    private tmpTitle: string;
    private category: Category;
    private operType: OperType;

    constructor(
        private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для возможности работы с текущим диалоговым окном
        @Inject(MAT_DIALOG_DATA)
        private data: [Category, string, OperType], // данные, которые передали в диалоговое окно
        private dialog: MatDialog // для открытия нового диалогового окна(из текущего) - например для подтверждения удаления
    ) {
    }

    ngOnInit() {
        this.category = this.data[0];
        this.dialogTitle = this.data[1];
        this.operType = this.data[2];
        this.tmpTitle = this.category.title;
    }

    onConfirm() {
        this.category.title = this.tmpTitle;
        this.dialogRef.close(this.category);
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    delete() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: `Подтвердите действие`,
                message: `Вы действительно хотите удалить категорию: "${this.category.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('delete');
            }
        });
    }

    canDelete(): boolean {
        return this.operType === OperType.EDIT;
    }
}
