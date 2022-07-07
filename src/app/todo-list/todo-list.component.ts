import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo, TodoList } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoList = [];
  todoData: TodoList;
  @Input() type: String;
  @Output() valueChange = new EventEmitter();
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos$.subscribe((data: TodoList) => {
      this.todoData = data;
      if (this.type === 'Completed') {
        this.todoList = data.completed;
      } else {
        this.todoList = data.active;
      }
    });
  }

  changeToDone(item) {
    item.isDone = true;
    this.todoList.push(item);
    this.todoData['completed'].push(item);
    this.todoData['active'] = this.todoData['active'].filter(
      (items) => items.id !== item.id
    );
    this.todoService.setData(this.todoData);
  }

  undo(item) {
    item.isDone = false;
    this.todoData['active'].push(item);
    this.todoData['completed'] = this.todoData['completed'].filter(
      (items) => items.id !== item.id
    );
    this.todoService.setData(this.todoData);
  }

  edit(item) {
    this.valueChange.emit(item);
  }

  delete(data) {
    if (data['isDone']) {
      this.todoData['completed'] = this.todoData['completed'].filter(
        (items) => items.id !== data.id
      );
    } else {
      this.todoData['active'] = this.todoData['active'].filter(
        (items) => items.id !== data.id
      );
    }
    this.todoService.setData(this.todoData);
  }
}
