export interface Todo {
  content: string;
  id: number;
  dateCreated: Date;
  isDone: boolean;
}

export interface TodoList {
  active: Array<Todo>;
  completed: Array<Todo>;
}
