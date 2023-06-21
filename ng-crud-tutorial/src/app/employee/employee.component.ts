import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';


import { EmployeeService } from '../shared/employee.service';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent {
  

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }
  

  resetForm( form?: NgForm ) {
    if (form)
      // Reset form controls
      form.reset();
      // Reset model values
      this.employeeService.selectedEmployee = {
        _id: "",
        name: "",
        position: "",
        office: "",
        salary: 0
      }
  }
  
  onSubmit( form: NgForm ){
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res => {
        console.log(form.value);
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'Saved successfully', classes: 'rounded' })
    }));
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res => {
        console.log(form.value);
        console.log('http://localhost:3000/employees/'+form.value._id);
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'Updated successfully', classes: 'rounded' })
    }));
    }
}

  onEdit( emp: Employee ){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({html: 'Deleted successfully', classes: 'rounded' });
      });  
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    })
  }
  

  

}
