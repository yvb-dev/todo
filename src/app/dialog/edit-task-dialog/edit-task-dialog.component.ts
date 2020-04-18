import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";

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

    private categories: Category[];
    private priorities: Priority[];

    private dialogTitle: string;
    private task: Task;

    private tmpTitle: string;
    private tmpCategory: Category;
    private tmpPriority: Priority;

    ngOnInit() {
        this.task = this.data[0];
        this.dialogTitle = this.data[1];
        this.tmpTitle = this.task.title;
        this.tmpCategory = this.task.category;
        this.tmpPriority = this.task.priority;

        this.dataHandlerService.getAllCategories().subscribe(items => this.categories = items);
        this.dataHandlerService.getAllPriorities().subscribe(value => this.priorities = value);
        console.log(this.dataHandlerService.getAllPriorities())
    }

    onConfirm(): void {
        this.task.title = this.tmpTitle;
        this.task.category = this.tmpCategory;
        this.task.priority = this.tmpPriority;
        this.dialogRef.close(this.task);
    }

    onCancel(): void {
        this.dialogRef.close(null);
    }
}
