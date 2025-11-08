import { useEffect, useState } from "react";
import { Filter, Search, SortAsc, SortDesc } from "lucide-react";

export default function TaskFilters({ value, onChange }) {
  const [local, setLocal] = useState({
    q: "",
    status: "",
    priority: "",
    sort: "createdAt:desc",
    page: 1,
    limit: 10,
    ...(value || {})
  });

  useEffect(() => {
    onChange?.(local);
  }, [local]);

  const update = (k, v) => {
    setLocal((p) => ({ ...p, [k]: v, page: 1 }));
  };

  return (
    <div className="card p-4 mb-4">
      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={16} />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent"
            placeholder="Search tasks…"
            value={local.q}
            onChange={(e) => update("q", e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="opacity-60" />

          <select
            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent"
            value={local.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent"
            value={local.priority}
            onChange={(e) => update("priority", e.target.value)}
          >
            <option value="">Any priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Sort */}
        <div className="ml-auto flex items-center gap-2">
          {local.sort.endsWith(":asc") ? <SortAsc size={16} /> : <SortDesc size={16} />}

          <select
            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent"
            value={local.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="createdAt:desc">Newest</option>
            <option value="createdAt:asc">Oldest</option>
            <option value="dueDate:asc">Due date ↑</option>
            <option value="dueDate:desc">Due date ↓</option>
            <option value="priority:desc">Priority ↑</option>
            <option value="priority:asc">Priority ↓</option>
          </select>
        </div>

      </div>
    </div>
  );
}
