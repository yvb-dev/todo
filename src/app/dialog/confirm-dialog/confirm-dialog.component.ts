import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {DialogAction, DialogResult} from "../../object/DialogResult";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})

// диалоговое окно подтверждения действия
export class ConfirmDialogComponent implements OnInit {
    private dialogTitle: string;
    private message: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>, // для работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } // данные, которые передали в диалоговое окно
    ) {
        this.dialogTitle = data.dialogTitle; // заголовок
        this.message = data.message; // сообщение
    }

    ngOnInit() {
    }

    // нажали ОК
    private confirm(): void {
            this.dialogRef.close(new DialogResult(DialogAction.OK));
    }

    // нажали отмену
    private cancel(): void {
        this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
    }
}

