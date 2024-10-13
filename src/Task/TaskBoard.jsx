import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModel from "./AddTaskModel";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Task 1",
    description: "This is the first task",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]); // original list
  const [filteredTasks, setFilteredTasks] = useState([defaultTask]); // filtered list
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
      setFilteredTasks([...tasks, newTask]); // update both states
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // update both states
    }
    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // update both states
  }

  function handleDeleteAll() {
    setTasks([]);
    setFilteredTasks([]); // clear both states
  }

  function SearchHandle(value) {
    if (value === "") {
      setFilteredTasks(tasks); // reset to original tasks when search is cleared
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }

  function handleFavorite(taskId) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // update both states
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModel
          taskToUpdate={taskToUpdate}
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={SearchHandle} />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            onDeleteAll={handleDeleteAll}
          />
          <TaskList
            tasks={filteredTasks} // render filteredTasks
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onFvt={handleFavorite}
          />
        </div>
      </div>
    </section>
  );
}
