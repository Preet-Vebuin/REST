import { Request, Response } from "express";
import connection from "../config/db"; // Import the single connection
import { Todo } from "../Model/model";


// ceate a new task
export const createTodo = async (req: Request, res: Response) : Promise<void>=> {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required!" });
      return;
    }

    const [result] = await connection.execute(
      "INSERT INTO todos (title, description, priority, dueDate) VALUES (?, ?, ?, ?)",
      [title, description, priority || "Low", dueDate]
    );

    res.status(201).json({ 
      message: "Task added successfully!", 
      id: (result as any).insertId 
    });

  } catch (error) {
    console.error("Database Insert Error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

//  Get all tasks
export const getTodos = async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM todos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Get a single task by ID
export const getTodoById = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { id } = req.params;
    const [rows] = await connection.execute("SELECT * FROM todos WHERE id = ?", [id]);

    if ((rows as any[]).length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json((rows as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

//  Update a task
export const updateTodo = async (req: Request, res: Response) : Promise<void>=> {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate } = req.body;

    const [result] = await connection.execute(
      "UPDATE todos SET title = ?, description = ?, priority = ?, dueDate = ? WHERE id = ?",
      [title, description, priority, dueDate, id]
    );

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ message: "Task updated successfully!" });
  } 
  catch (error) {
    res.status(500).json({ error: "Database error" });
  }
  
};

// Delete a task
export const deleteTodo = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { id } = req.params;
    const [result] = await connection.execute("DELETE FROM todos WHERE id = ?", [id]);

    const deleteResult = result as any;

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" }); // Respond early
    }

    return res.json({ message: "Task deleted successfully!" }); // Only one response
  } catch (error) {
    return res.status(500).json({ error: "Database error" });
  }
};

