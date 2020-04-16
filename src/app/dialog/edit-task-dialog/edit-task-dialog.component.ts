import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалоговым окном
        @Inject(MAT_DIALOG_DATA)
        private data: [Task, string], // данные, которые передали в диалоговое окно
        private dataHandlerService: DataHandlerService,
        private dialog: MatDialog // для открытия нового диалогового окна(из текущего) - например для подтверждения удаления
    ) {
    }

    private dialogTitle: string;
    private task: Task;

    private tmpTitle: string;

    ngOnInit() {
        this.task = this.data[0];
        this.dialogTitle = this.data[1];
        this.tmpTitle = this.task.title;
    }

    onConfirm(): void {
        this.task.title = this.tmpTitle;
        this.dialogRef.close(this.task);
    }

    onCancel(): void {
        this.dialogRef.close(null);
    }
}
