import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api.js";

function Dashboard({ token, logout, userRole }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      const data = await res.json();
      if (res.ok) setTasks(data);
      else setMsg(data.error || "Failed to fetch tasks");
    } catch (err) {
      setMsg("Network error: " + err.message);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAdd = async () => {
    if (!title) return setMsg("Title is required");
    try {
      const res = await createTask({ title, description }, token);
      const data = await res.json();
      if (res.ok) { setTitle(""); setDescription(""); fetchTasks(); setMsg("Task added"); }
      else setMsg(data.error || "Failed to add task");
    } catch (err) { setMsg("Network error: " + err.message); }
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleUpdate = async (id) => {
    if (!editTitle) return setMsg("Title is required");
    try {
      const res = await updateTask(id, { title: editTitle, description: editDescription }, token);
      const data = await res.json();
      if (res.ok) { cancelEdit(); fetchTasks(); setMsg("Task updated"); }
      else setMsg(data.error || "Failed to update task");
    } catch (err) { setMsg("Network error: " + err.message); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTask(id, token);
      const data = await res.json();
      if (res.ok) fetchTasks();
      else setMsg(data.error || "Failed to delete task");
    } catch (err) { setMsg("Network error: " + err.message); }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>Dashboard ({userRole})</h2>
      <button onClick={logout}>Logout</button>
      <p style={{ color: "red" }}>{msg}</p>

      {/* Add new task */}
      <div style={{ marginTop: 20 }}>
        <h3>Add New Task</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 5 }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 5 }}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      {/* Task list */}
      <ul style={{ marginTop: 20 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: 10, borderBottom: "1px solid #ccc", paddingBottom: 5 }}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ width: "100%", marginBottom: 5, padding: 5 }}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ width: "100%", marginBottom: 5, padding: 5 }}
                />
                <button onClick={() => handleUpdate(task.id)}>Save</button>{" "}
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{task.title}</strong>: {task.description || "No description"}{" "}
                <button onClick={() => startEdit(task)}>Edit</button>{" "}
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Admin-only info */}
      {userRole === "ADMIN" && (
        <div style={{ marginTop: 20, color: "blue" }}>
          <strong>Admin privileges enabled</strong>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
