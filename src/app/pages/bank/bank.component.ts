import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAcc } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-bank',
   templateUrl: './bank.component.html',
   styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements OnInit {
   id: string;
   studentAcc: StudentAcc = {
      _id: '',
      bank: '',
      branch: '',
      account_num: '',
      account_type: '',
      status: '',
      student_id: '',
   };

   constructor(
      private studentService: StudentService,
      private router: Router,
      private route: ActivatedRoute
   ) {
      this.id = this.route.snapshot.paramMap.get('id')!;
      studentService
         .getStudentAcc(this.id)
         .subscribe({ next: (data) => {
          if (data) this.studentAcc = data;
         }, error: (err) => {
          console.error(err);          
         } });
   }

   apiUrl = environment.apiUrl;

   createStudentAcc(formData: NgForm) {
      const postBody = {
         _id: this.studentAcc._id,
         bank: formData.controls['bank'].value,
         branch: formData.controls['branch'].value,
         account_num: formData.controls['account_num'].value,
         account_type: formData.controls['account_type'].value,
         status: formData.controls['status'].value,
         student_id: formData.controls['student_id'].value,
      };

      this.studentService.createStudentAcc(postBody).subscribe({
         next: (resp) => {
            if (resp) this.router.navigate(['/students']);
         },
         error: (err) => console.log(err),
      });
   }

   ngOnInit(): void {}
}
