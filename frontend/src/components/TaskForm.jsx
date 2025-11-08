import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function TaskForm({ initial, onSave }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    tags: ""
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        priority: initial.priority || "medium",
        dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : "",
        tags: initial.tags?.join(",") || ""
      });
    }
  }, [initial]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    };
    onSave(payload);
    setForm({ title: "", description: "", priority: "medium", dueDate: "", tags: "" });
  };

  return (
    <form onSubmit={submit} className="card p-4 mb-4 space-y-3">
      <div className="flex items-center gap-2">
        <Plus size={16} className="opacity-60" />
        <h3 className="font-semibold">Add a task</h3>
      </div>

      <input
        className="w-full p-3 border rounded-lg border-neutral-300 dark:border-neutral-800 bg-transparent"
        placeholder="Task title"
        required
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <textarea
        rows={2}
        className="w-full p-3 border rounded-lg border-neutral-300 dark:border-neutral-800 bg-transparent"
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        {/* Priority */}
        <select
          className="p-3 border rounded-lg border-neutral-300 dark:border-neutral-800 bg-transparent"
          value={form.priority}
          onChange={(e) => update("priority", e.target.value)}
        >
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          className="p-3 border rounded-lg border-neutral-300 dark:border-neutral-800 bg-transparent"
          value={form.dueDate}
          onChange={(e) => update("dueDate", e.target.value)}
        />

        {/* Tags */}
        <input
          className="flex-1 p-3 border rounded-lg border-neutral-300 dark:border-neutral-800 bg-transparent"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
        />
      </div>

      <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition">
        <Plus size={16} />
        Add Task
      </button>
    </form>
  );
}
