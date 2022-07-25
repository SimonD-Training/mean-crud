import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-student-edit',
   templateUrl: './student-edit.component.html',
   styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit {
   studentId = '';
   student: Student = {
      _id: '',
      name: '',
      email: '',
      cohort: '',
      phoneNumber: 0,
   };

   constructor(
      private studentService: StudentService,
      private router: Router,
      private activatedRoute: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((routerInfo: any) => {
         this.studentId = routerInfo.params.id;

         this.studentService.getStudent(this.studentId).subscribe({
            next: (resp: Student) => {
               this.student = resp;
            },
            error: (err) => console.log(err),
         });
      });
   }

   editStudent(studentId: string, formData: NgForm) {
      studentId = this.studentId;

      const postBody = {
         name: formData.controls['name'].value,
         email: formData.controls['email'].value,
         cohort: formData.controls['cohort'].value,
         phoneNumber: (formData.controls['phoneNumber'].value as string)
            .toString()
            .replace(/\D/g, ''),
      };

      this.studentService.editStudent(studentId, postBody).subscribe({
         next: (resp) => {
            if (resp) this.router.navigate(['/students']);
         },
         error: (err) => console.log(err),
      });
   }
}
