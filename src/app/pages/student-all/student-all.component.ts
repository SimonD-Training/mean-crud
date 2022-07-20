import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
   templateUrl: './student-all.component.html',
   styleUrls: ['./student-all.component.scss'],
})
export class StudentAllComponent implements OnInit {
   constructor(
      private studentService: StudentService,
      private router: Router
   ) {}

   students: Student[] = [];
   isLoading: boolean | undefined = true;

   ngOnInit(): void {
      this.studentService.getStudents().subscribe((students: Student[]) => {
         this.students = students;
         this.isLoading = false;
      });
   }

   deleteStudent(studentId: string): void {
      this.studentService.deleteStudent(studentId).subscribe({
         next: (resp: any) => {
            this.students.splice(
               this.students.findIndex(
                  (student: Student) => student._id == studentId
               ),
               1
            );

            if (resp) this.router.navigate(['/students']);
         },
         error: (err) => console.log(err),
      });
   }

   openModal(studentId: string): void {
      const modal = document.querySelector(`#modal-${studentId}`);
      modal?.classList.remove('d-none');
      modal?.classList.add('d-grid');
   }

   closeModal(studentId: string): void {
      const modal = document.querySelector(`#modal-${studentId}`);
      modal?.classList.remove('d-grid');
      modal?.classList.add('d-none');
   }
}
