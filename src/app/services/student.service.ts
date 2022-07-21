import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../interfaces/student';

@Injectable({
   providedIn: 'root',
})
export class StudentService {
   constructor(private http: HttpClient) {}

   /**
    * Gets all students from the API
    * @returns An observable list of the `Student` interface
    */
   getStudents(): Observable<Student[]> {
      return this.http
         .get<Student[]>(`${environment.apiUrl}/students`)
         .pipe(
            tap((students: Student[]) => console.log('Students =', students))
         );
   }

   /**
    *
    * @param studentId
    * @returns
    */
   getStudent(studentId: string): Observable<Student> {
      return this.http
         .get<Student>(
            `${environment.apiUrl}/students/find?by=id&id=${studentId}`
         )
         .pipe(tap((student: Student) => console.log('Student =', student)));
   }

   createStudent(postBody: any): Observable<Student[]> {
      return this.http
         .post<Student[]>(`${environment.apiUrl}/students/create`, postBody)
         .pipe(
            tap((resp: any) => console.log('Service Create Response =', resp))
         );
   }

   editStudent(studentId: string, postBody: any): Observable<Student> {
      return this.http
         .put<Student>(
            `${environment.apiUrl}/students/update/${studentId}`,
            postBody
         )
         .pipe(
            tap((resp: any) => console.log('Service Edit Response =', resp))
         );
   }

   deleteStudent(studentId: string) {
      return this.http
         .delete(`${environment.apiUrl}/students/delete/${studentId}`)
         .pipe(tap((resp) => console.log('Service Delete Response =', resp)));
   }
}
