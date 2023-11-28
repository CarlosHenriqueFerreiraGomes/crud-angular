import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses/courses.component';

export const routes: Routes = [
  //{ path: '', component: CoursesComponent },
  // {
  //   path: 'courses',
  //   loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule),
  // }
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses', component: CoursesComponent },
];
