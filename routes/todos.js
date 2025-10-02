const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET toate
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Eroare la preluarea task-urilor" });
  }
});

// POST nou
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Textul este obligatoriu" });
    }
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Eroare la salvare:", err); // afișează eroarea reală în terminal
    res.status(500).json({ error: err.message }); // trimite mesajul exact în Postman
  }
});


// PUT update
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: "Todo nu există" });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Eroare la actualizare task" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: "Todo nu există" });
    res.json({ message: "✅ Task șters!" });
  } catch (err) {
    res.status(500).json({ error: "Eroare la ștergere task" });
  }
});

module.exports = router;
