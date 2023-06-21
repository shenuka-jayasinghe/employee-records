import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[];
  readonly baseURL = 'http://localhost:3000/employees';

  selectedEmployee: Employee;

  postEmployee(emp : Employee){
    return this.http.post(this.baseURL, emp);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee){
    return this.http.put(`${this.baseURL}/${emp._id}`, emp);
  }

  deleteEmployee(_id: string){
    return this.http.delete(`${this.baseURL}/${_id}`);
  }


  
  constructor(private http: HttpClient) {
    this.employees = [];
    this.selectedEmployee = new Employee('', '', '', '', 0);
  }
}
