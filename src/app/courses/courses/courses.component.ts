import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from "../../shared/shared.module";

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    providers: [
        CoursesService
    ],
    imports: [AppMaterialModule, CommonModule, HttpClientModule, SharedModule]
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Course[]>;
  courses2: Course[] = [];

  displayedColumns = ['name','category'];

  constructor(
    private coursesService: CoursesService,
    public  dialog        : MatDialog
  )
  {
    // Formas de obter os dados
    //this.courses$  = this.coursesService.list(); // para Observable
    //this.coursesService.list().subscribe(courses => this.courses2 = courses); // Para array

    this.courses$  = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of([]) // O operador 'of' retorna qualquer coisa que vc queira, e retorna um Observable
      })
    )

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void{

  }

}
