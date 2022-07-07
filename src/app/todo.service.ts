import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList } from './todo';

@Injectable()
export class TodoService {
  initialData = localStorage.getItem('todo_data')
    ? JSON.parse(localStorage.getItem('todo_data'))
    : {
        active: [],
        completed: [],
      };
  private todos: BehaviorSubject<TodoList> = new BehaviorSubject(
    this.initialData
  );

  public readonly todos$: Observable<TodoList> = this.todos.asObservable();
  constructor() {}

  setData(data) {
    this.todos.next(data);
    localStorage.setItem('todo_data', JSON.stringify(data));
  }

  getData() {
    let data = localStorage.getItem('todo_data');
    this.todos.next(JSON.parse(data));
  }
}
