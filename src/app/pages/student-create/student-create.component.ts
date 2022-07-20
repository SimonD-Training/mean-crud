import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-student-create',
   templateUrl: './student-create.component.html',
   styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent implements OnInit {
   constructor(private studetService: StudentService, private router: Router) {}

   apiUrl = environment.apiUrl;

   createStudent(formData: NgForm) {
      const postBody = {
         name: formData.controls['name'].value,
         email: formData.controls['email'].value,
         cohort: formData.controls['cohort'].value,
         phoneNumber: (formData.controls['phoneNumber'].value as string)
            .toString()
            .replace(/\D/g, ''),
      };

      this.studetService.createStudent(postBody).subscribe({
         next: (resp) => {
            if (resp) this.router.navigate(['/students']);
         },
         error: (err) => console.log(err),
      });
   }

   ngOnInit(): void {}
}
