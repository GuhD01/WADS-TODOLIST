import { useState } from "react"; 
import "./App.css";
import { useNavigate } from 'react-router-dom'; 


function App() {
  const navigate = useNavigate(); 

  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [taskStatus, setTaskStatus] = useState("Incomplete");
  const [showPopup, setShowPopup] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [filter, setFilter] = useState("All"); 
  const handleSignOut = () => {
    navigate('/');
  };

  function handlePopupSubmit(e) {
    e.preventDefault();
    if (!newItem.trim()) return;

    setTodos([
      ...todos,
      { id: crypto.randomUUID(), title: newItem, completed: taskStatus === "Completed" },
    ]);

    setNewItem("");
    setShowPopup(false);
  }

  function getVisibleTodos() {
    if (filter === "Completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "Incomplete") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  }


  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function toggleEdit(id) {
    setEditingId(id);
    const todo = todos.find((todo) => todo.id === id);
    setEditedTitle(todo.title);
  }

  function handleEdit(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, title: editedTitle } : todo))
    );
    setEditingId(null);
  }

  return (
    <>
      <div className="Sign-Out-Button" style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button
          className="sign-out-button"
          style={{
            boxShadow: "inset 0 2px 4px 0 rgb(2 6 23 / 0.3), inset 0 -2px 4px 0 rgb(203 213 225)",
            display: "inline-flex",
            cursor: "pointer",
            alignItems: "center",
            gap: "1rem",
            borderRadius: "0.375rem",
            border: "1px solid rgb(203 213 225)",
            background: "linear-gradient(to bottom, rgb(249 250 251), rgb(229 231 235))",
            padding: "0.5rem 1rem",
            fontWeight: "600",
            opacity: "1",
            textDecoration: "none",
            color: "rgb(55 65 81)",
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      <div className="App">
      <span className="btn-shine">Gde Ngurah Randy Agastya - 2602119165</span>
    </div>
      {showPopup && (
        <div className="overlay">
          <div className="modal">
            <form onSubmit={handlePopupSubmit}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="popup-buttons">
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
                <button type="button" className="btn" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      <form className="new-item-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="item">New item</label>
          
          <input class="input input-alt" placeholder="Type your activity!"
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <span class="input-border input-border-alt"></span>
        </div>
        
        <button className="btn" type="button" onClick={() => setShowPopup(true)}>
          <span>Add</span>
        </button>
      </form>
  
      <div className="todo-header">
        <h1 className="header">Todo List</h1>
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
  
      <ul className="list">
        {getVisibleTodos().map((todo) => (
          <li key={todo.id} className={`flex justify-between items-center my-2 ${todo.completed ? 'completed' : ''}`}>
            <div className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              className="check"
            />
            </div>
            <div className="task-text">
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
              ) : (
                <span className={`ml-2 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.title}
                </span>
              )}
            </div>
            <div className="button-container">
              <button
                type="button"
                onClick={() => toggleEdit(todo.id)}
                className="btn-edit"
              >
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="btn-delete"
              >
                <span>Delete</span>
              </button>
              {editingId === todo.id && (
                <button
                  type="button"
                  onClick={() => handleEdit(todo.id)}
                  className="btn-save"
                >
                  <span>Save</span>
                </button>


              )}
            </div>
          </li>
        ))}
      </ul>
    </>
    );
              }
  
export default App;
