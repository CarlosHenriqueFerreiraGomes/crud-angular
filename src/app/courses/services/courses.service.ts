import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, take, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(
    private httpClient: HttpClient
  )
  {

  }

  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(), // Primeira resposta
      //delay(5000),
      take(1), //
      tap(courses => console.log(courses)) // Cano - Trata os dados antes de retornar através do método 'pipe'
    )
  }

}
