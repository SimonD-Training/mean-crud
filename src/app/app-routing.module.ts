import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './pages/bank/bank.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentAllComponent } from './pages/student-all/student-all.component';
import { StudentCreateComponent } from './pages/student-create/student-create.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentEditComponent } from './pages/student-edit/student-edit.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'students', component: StudentAllComponent },
   { path: 'student/create', component: StudentCreateComponent },
   { path: 'student/create_acc/:id', component: BankComponent },
   { path: 'student/edit/:id', component: StudentEditComponent },
   { path: 'student/details/:id', component: StudentDetailsComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
