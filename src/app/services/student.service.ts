import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
      return this.http.get<Student[]>(`${environment.apiUrl}/students`);
   }

   /**
    *
    * @param studentId
    * @returns
    */
   getStudent(studentId: string): Observable<Student> {
      return this.http.get<Student>(
         `${environment.apiUrl}/students/find?by=id&q=${studentId}`
      );
   }

   /**
    * Create a student documnet and add them to the MongoDB
    * @param postBody The FormData used to create a student
    */
   createStudent(postBody: any): Observable<Student[]> {
      return this.http.post<Student[]>(
         `${environment.apiUrl}/students/create`,
         postBody
      );
   }

   /**
    * Edit a student document in the MongoDB
    * @param studentId The ObjectId for the MongoDB document
    * @param postBody The FormData used to create a student
    */
   editStudent(studentId: string, postBody: any): Observable<Student> {
      return this.http.put<Student>(
         `${environment.apiUrl}/students/update/${studentId}`,
         postBody
      );
   }

   /**
    * Delete a student document from the MongoDB
    * @param studentId The ObjectId for the MongoDB document
    */
   deleteStudent(studentId: string) {
      return this.http.delete(
         `${environment.apiUrl}/students/delete/${studentId}`
      );
   }
}
