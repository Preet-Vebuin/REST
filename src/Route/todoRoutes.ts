import express from "express";
import {
  createTodo,
  getTodos,
 updateTodo,
 deleteTodo,
 getTodoById
} from "../Controller/todoController";

const router = express.Router();

// 🟢 Create a new To-Do
router.post("/todos", createTodo);

// 🔵 Get all To-Dos
router.get("/todos", getTodos);

// 🟡 Update a To-Do
router.put("/todos/:id", updateTodo);
router.get("/todos/:id", getTodoById);

// 🔴 Delete a To-Do
router.delete("/todos/:id", deleteTodo);

export default router;
