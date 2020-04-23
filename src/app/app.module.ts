import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {MatPaginatorModule, MatSortModule, MatTableModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
// import {MatTableModule} from "@angular/material/table";
// import {MatSortModule} from "@angular/material/sort";
// import {MatPaginatorModule} from "@angular/material/paginator";

import {TaskDatePipe} from "./pipe/task-date.pipe";
import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";

registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
        CategoriesComponent,
        TasksComponent,
        EditTaskDialogComponent,
        ConfirmDialogComponent,
        TaskDatePipe,
    ],
    imports: [
        BrowserModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ],
    providers: [],
    entryComponents: [
        EditTaskDialogComponent,
        ConfirmDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
