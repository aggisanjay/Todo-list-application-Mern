export const buildTaskQuery = ({ q, status, priority, from, to, tags }) => {
  const query = {};

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
  }

  if (status === "completed") query.completed = true;
  if (status === "open") query.completed = false;

  if (priority) query.priority = priority;

  if (from || to) {
    query.dueDate = {};
    if (from) query.dueDate.$gte = new Date(from);
    if (to) query.dueDate.$lte = new Date(to);
  }

  if (tags)
    query.tags = { $all: tags.split(",").map((t) => t.trim()).filter(Boolean) };

  return query;
};
