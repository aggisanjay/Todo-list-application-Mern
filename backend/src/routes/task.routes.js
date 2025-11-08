import { Router } from "express";
import Task from "../models/Task.js";
import { buildTaskQuery } from "../utils/buildQuery.js";

const router = Router();

router.post("/", async (req, res) => {
  const task = await Task.create({ ...req.body, owner: req.user.id });
  res.status(201).json(task);
});

router.get("/", async (req, res) => {
  const { page = 1, limit = 10, sort = "createdAt:desc" } = req.query;

  const query = { owner: req.user.id, ...buildTaskQuery(req.query) };

  const [items, total] = await Promise.all([
    Task.find(query)
      .sort(sort.replace(":", " "))
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    Task.countDocuments(query)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
});

router.patch("/:id", async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );

  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  res.json({ ok: true });
});

export default router;
