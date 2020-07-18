import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {Priority} from '../../model/Priority';
import {Category} from '../../model/Category';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DialogAction, DialogResult} from "../../object/DialogResult";

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.css']
})

// редактирование/создание задачи
export class EditTaskDialogComponent implements OnInit {

    categories: Category[];
    priorities: Priority[];
    dialogTitle: string; // заголовок окна
    task: Task; // задача для редактирования/создания

    // сохраняем все значения в отдельные переменные
    // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
    newTitle: string;
    newCategoryId: number;
    newPriorityId: number;
    newDate: Date;

    oldCategoryId: number;

    canDelete: boolean;
    canComplete: boolean;

    today = new Date();

    constructor(
        private dialogRef: MatDialogRef<EditTaskDialogComponent>, // // для возможности работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: [Task, string, Category[], Priority[]], // данные, которые передали в диалоговое окно
        private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    ) {
    }

    ngOnInit() {
        this.task = this.data[0]; // задача для редактирования/создания
        this.dialogTitle = this.data[1]; // текст для диалогового окна
        this.categories = this.data[2];
        this.priorities = this.data[3];

        if (this.task && this.task.id > 0) {
            this.canDelete = true;
            this.canComplete = true;
        }

        this.newTitle = this.task.title;

        if (this.task.priority) {
            this.newPriorityId = this.task.priority.id;
        }

        if (this.task.category) {
            this.newCategoryId = this.task.category.id;
            this.oldCategoryId = this.task.category.id;
        }

        if (this.task.date) {
            this.newDate = new Date(this.task.date);
        }
    }

    // нажали ОК
    private confirm(): void {
        // считываем все значения для сохранения в поля задачи
        this.task.title = this.newTitle;
        this.task.priority = this.findPriorityById(this.newPriorityId);
        this.task.category = this.findCategoryById(this.newCategoryId);
        this.task.oldCategory = this.findCategoryById(this.oldCategoryId);
        if (!this.newDate) {
            this.task.date = null;
        } else {
            this.task.date = this.newDate;
        }
        // передаем добавленную/измененную задачу в обработчик
        // что с ним будут делать - уже не задача этого компонента
        this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.task));
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
                message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) { // просто закрыли окно, ничего не нажав.
                return
            }
            if (result.action = DialogAction.OK) {
                this.dialogRef.close(new DialogResult(DialogAction.DELETE)); // нажали удалить
            }
        });
    }

    // нажали Выполнить (завершить) задачу
    private complete(): void {
        this.dialogRef.close(new DialogResult(DialogAction.COMPLETE));
    }

    // делаем статус задачи "незавершенным" (активируем)
    private activate(): void {
        this.dialogRef.close(new DialogResult(DialogAction.ACTIVATE));
    }

    private findPriorityById(newPriorityId: number): Priority {
        return this.priorities.find(t => t.id === newPriorityId);
    }

    private findCategoryById(newCategoryId: number): Category {
        return this.categories.find(t => t.id === newCategoryId);
    }

    addDays(days: number) {
        this.newDate = new Date();
        this.newDate.setDate(this.today.getDate() + days)
    }

    setToday() {
        this.newDate = this.today;
    }
}
