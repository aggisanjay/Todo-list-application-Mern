export default function Pagination({ page, pages, onPage }) {
  if (!pages || pages <= 1) return null;

  const go = (p) => () => onPage(p);

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        disabled={page <= 1}
        onClick={go(page - 1)}
        className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 
                   disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition"
      >
        Prev
      </button>

      <span className="text-sm opacity-80">
        Page {page} / {pages}
      </span>

      <button
        disabled={page >= pages}
        onClick={go(page + 1)}
        className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 
                   disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition"
      >
        Next
      </button>
    </div>
  );
}
