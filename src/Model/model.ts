export interface Todo {
    id?: number;  // Optional because it's AUTO_INCREMENT
    title: string;
    description?: string;  // Optional because it can be NULL
    priority?: "Low" | "Medium" | "High"; // Limiting to valid values
    dueDate?: Date; // Can be null, so it's optional
  }

