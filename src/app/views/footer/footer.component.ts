import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

// "presentational component": отображает полученные данные
// подвал - нижняя часть страницы
export class FooterComponent implements OnInit {
  private year: Date;
  private site = 'https://javabegin.ru/';
  private blog = 'https://javabegin.ru/blog/tag/angular/';
  private siteName = 'JuR';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.year = new Date(); // текуший год
  }

  // окно "О программе"
  private openAboutDialog() {
    this.dialog.open(AboutDialogComponent,
        {
          autoFocus: false,
          data: {
            dialogTitle: 'О программе',
            message: 'Данное приложение было создано @JuR'
          },
          width: '400px'
        });

  }

}
