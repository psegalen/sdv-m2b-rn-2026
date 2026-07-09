export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export interface ApiGetTodoResponse {
  todos: ApiTodo[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const todoToApiTodo = (todo: Todo): ApiTodo => ({
  id: parseInt(todo.id, 10),
  todo: todo.title,
  completed: todo.done,
  userId: 1,
});

export const Api = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch("https://dummyjson.com/todos");
    if (response.ok) {
      const data: ApiGetTodoResponse = await response.json();
      return data.todos.map((apiTodo) => ({
        id: apiTodo.id.toString(),
        title: apiTodo.todo,
        done: apiTodo.completed,
      }));
    }
    throw new Error("Failed to fetch todos");
  },
  addTodo: async (title: string): Promise<Todo> => {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: title, completed: false, userId: 1 }),
    });
    if (response.ok) {
      const data: ApiTodo = await response.json();
      console.log("Added todo:", data);
      return {
        id: data.id.toString(),
        title: data.todo,
        done: data.completed,
      };
    }
    throw new Error("Failed to add todo");
  },
  updateTodo: async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: todo.title, completed: todo.done }),
    });
    if (response.ok) {
      const data: ApiTodo = await response.json();
      console.log("Updated todo:", data);
      return {
        id: data.id.toString(),
        title: data.todo,
        done: data.completed,
      };
    }
    console.log(response);
    throw new Error("Failed to update todo");
  },
  deleteTodo: async (id: string): Promise<void> => {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
    console.log(`Deleted todo with id: ${id}`);
  },
};
