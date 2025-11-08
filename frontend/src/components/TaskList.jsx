import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Trash2, Calendar, Tag } from "lucide-react";
import api from "../api/axios";
import clsx from "clsx";

function Badge({ children, tone = "neutral" }) {
  const styles = {
    neutral: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200",
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200",
    red: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-200",
    amber: "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200",
    green: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200"
  }[tone];

  return <span className={`px-2 py-0.5 rounded-md text-xs ${styles}`}>{children}</span>;
}

const anim = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

export default function TaskList({ data, reload }) {
  const toggle = async (id, completed) => {
    await api.patch(`/tasks/${id}`, { completed });
    reload?.();
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    reload?.();
  };

  if (!data?.items?.length) {
    return (
      <div className="card p-10 text-center text-neutral-500 text-sm">
        No tasks found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence>
        {data.items.map((task) => (
          <motion.li
            key={task._id}
            variants={anim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="card p-4 flex items-start gap-3"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggle(task._id, !task.completed)}
              className="mt-1"
            >
              {task.completed ? (
                <CheckCircle2 size={20} className="text-emerald-600" />
              ) : (
                <Circle size={20} className="opacity-50" />
              )}
            </button>

            {/* Title + Description */}
            <div className="flex-1">
              <h3
                className={clsx(
                  "font-medium text-lg",
                  task.completed && "line-through opacity-60"
                )}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                  {task.description}
                </p>
              )}

              {/* Tags + Due Date */}
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-neutral-500">
                {task.dueDate && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}

                {task.tags?.map((t) => (
                  <span key={t} className="flex items-center gap-1">
                    <Tag size={14} /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={() => remove(task._id)}
              className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
