import { Component, OnInit, VERSION } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoList } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todoList: Array<Todo>;
  list: TodoList = {
    active: [],
    completed: [],
  };
  inputValue = '';
  addFlag = true;
  modifyItem = {};
  constructor(public snackBar: MatSnackBar, private todoService: TodoService) {}
  ngOnInit() {
    this.todoService.todos$.subscribe((data) => {
      this.list = data
        ? data
        : {
            active: [],
            completed: [],
          };
    });
  }

  addTodo() {
    this.list.active.push({
      content: this.inputValue,
      isDone: false,
      dateCreated: new Date(),
      id: new Date().getTime(),
    });
    this.todoService.setData(this.list);
    this.openSnackBar('Added Successfuly!', 'OK');
  }

  modify(e) {
    this.modifyItem = e;
    this.inputValue = e.content;
    this.addFlag = false;
    alert(this.addFlag);
  }

  modifyTodo() {
    if (this.modifyItem['isDone']) {
      this.list.completed.map((items) => {
        if (items.id == this.modifyItem['id']) {
          items.content = this.inputValue;
        }
      });
    } else {
      this.list.active.map((items) => {
        if (items.id == this.modifyItem['id']) {
          items.content = this.inputValue;
        }
      });
    }
    this.todoService.setData(this.list);
    this.addFlag = true;
    this.inputValue = '';
    this.openSnackBar('Modified Successfuly!', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
