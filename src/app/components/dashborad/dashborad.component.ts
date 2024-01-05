import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../modal/task';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrl: './dashborad.component.css',
})
export class DashboradComponent {
  taskObj: Task = new Task();
  taskArray: Task[] = [];

  addtaskValue: string = '';
  edittaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.addtaskValue = '';
    this.edittaskValue = '';
    this.taskObj = new Task();
    this.taskArray = [];
    this.getallTask();
  }
  getallTask() {
    this.crudService.getallTask().subscribe(
      (res) => {
        this.taskArray = res;
      },
      (error) => {
        alert('unable to get list of tasks');
      }
    );
  }

  addtask() {
    this.taskObj.task_name = this.addtaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        // this.addtaskValue = '';
        console.log('add task successfully');
      },
      (error) => {
        alert(error);
        console.log('add task failed');
      }
    );
  }

  edittask() {
    this.taskObj.task_name = this.edittaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (error) => {
        alert('Failed to update task');
        console.log(this.taskObj);
      }
    );
  }

  deletetack(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (error) => {
        alert('Failed to delete task');
      }
    );
  }

  call(etask: Task){
    this.taskObj = etask;
    this.edittaskValue = etask.task_name;
  }
}
