import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentAcc } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-student-details',
   templateUrl: './student-details.component.html',
   styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
   apiUrl = environment.apiUrl;
   studentId = '';
   student: Student = {
      _id: '',
      name: '',
      email: '',
      cohort: '',
      phoneNumber: 0,
   };
   studentAcc!: StudentAcc;

   isLoading: boolean = true;

   constructor(
      private studentService: StudentService,
      private activatedRoute: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((routerInfo: any) => {
         this.studentId = routerInfo.params.id;

         this.studentService.getStudent(this.studentId).subscribe({
            next: (resp: Student) => {
               this.student = resp;
               this.isLoading = false;
               this.studentService
                  .getStudentAcc(this.studentId)
                  .subscribe({ next: (data) => {
                     this.studentAcc = data;
                     console.log(data);                     
                  }, error: (err) => {
                     console.error(err);
                  } });
            },
            error: (err) => console.log(err),
         });
      });
   }
}
