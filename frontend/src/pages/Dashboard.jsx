import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";
import api from "../api/axios";

export default function Dashboard() {
  // query state for filters/sorting/pagination
  const [query, setQuery] = useState({
    q: "",
    status: "",
    priority: "",
    sort: "createdAt:desc",
    page: 1,
    limit: 10
  });

  // backend response
  const [data, setData] = useState({
    items: [],
    total: 0,
    page: 1,
    pages: 1
  });

  const [loading, setLoading] = useState(false);

  // Build URL params
  const buildParams = () => {
    const p = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== "" && value !== null) p.append(key, value);
    });
    return p.toString();
  };

  // Fetch tasks with filters + pagination + sorting
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks?${buildParams()}`);

      // supports both:
      // ✅ advanced API { items, total, page, pages }
      // ✅ simple API [ ]
      if (Array.isArray(res.data)) {
        setData({
          items: res.data,
          total: res.data.length,
          page: 1,
          pages: 1
        });
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
    setLoading(false);
  };

  // Fetch whenever filters/query change
  useEffect(() => {
    fetchTasks();
  }, [JSON.stringify(query)]);

  // Add new task
  const createTask = async (payload) => {
    await api.post("/tasks", payload);
    fetchTasks();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Your Tasks</h1>

      {/* Filters */}
      <TaskFilters value={query} onChange={setQuery} />

      {/* Create Task Form */}
      <TaskForm onSave={createTask} />

      {/* List or Loading */}
      {loading ? (
        <div className="card p-8 text-center text-sm text-neutral-500">
          Loading tasks…
        </div>
      ) : (
        <>
          {/* Task List */}
          <TaskList data={data} reload={fetchTasks} />

          {/* Pagination */}
          <Pagination
            page={data.page}
            pages={data.pages}
            onPage={(p) => setQuery((q) => ({ ...q, page: p }))}
          />
        </>
      )}
    </Layout>
  );
}
