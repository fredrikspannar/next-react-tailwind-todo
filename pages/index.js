import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Message from "../components/Message";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import PuffLoader from "react-spinners/PuffLoader";
import { getAllTodos } from "../services/todo-service";

// get all todos on load when server is rendering the page
export const getServerSideProps = async() => {
  let error = "";
  let todos = await getAllTodos();
  
  return {
    props: {
      todos: todos,
      error: error
    }
  }
}


// page component
export default function Home({todos,error}) {
  const router = useRouter();
  const [ isLoading, setIsLoading] = useState(false);
  const [ newTodoTitle, setNewTodoTitle ] = useState("");
  const [ successMessage, setSuccessMessage ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ isEditingId, setIsEditing ] = useState(false);
  const [ editTodoTitle, setEditTodoTitle ] = useState("");


  // event handler to save new title
  const handleSetNewTodoTitle = (e) => {
    setNewTodoTitle(e.target.value);
  }

  // event handler to save new todo
  const handleSaveNewTodo = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // send to frontend-api which forwards to the real backend
    const response = await fetch("/api/todo/create",{
      method: 'post',
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: JSON.stringify( {title: newTodoTitle} )
    });

    const json = await response.json();

    if ( response.status == 200 && json.todo && json.todo.id ) {
      setSuccessMessage("New todo was saved");

      setNewTodoTitle("");

    } else {
      setErrorMessage("Failed to save new todo");
    }
    
    setIsLoading(false);

    router.replace("/"); // reloads page and list with all
  }

  // event handler to toggle completed
  const handleToggleCompleted = async (e, item) => {
    e.preventDefault();

    setIsLoading(true);

    // send to frontend-api which forwards to the real backend
    const response = await fetch("/api/todo/completed",{
      method: 'post',
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: JSON.stringify( {id: item.id, completed: (item.isCompleted == 1 ? 0 : 1)} )
    });

    const json = await response.json();

    if ( response.status == 200 && json.todo && json.todo.id ) {
      setSuccessMessage("Todo was updated");

      setNewTodoTitle("");

    } else {
      setErrorMessage("Failed to update todo");
    }
    
    setIsLoading(false);

    router.replace("/"); // reloads page and list with all
  }

  // event handler to set state to editing or cancel editing
  const handleSetEditing = (e, item) => {
    e.preventDefault();

    if ( item ) {
      // state for start editing
      setIsEditing(item.id);
      setEditTodoTitle(item.title);
    } else {
      // cancel state for editing
      setIsEditing(false);
    }

  }

  // event handler to update editing title
  const handleSetEditTitle = (e) => {
    setEditTodoTitle(e.target.value);
  }

  // event handler to save updated todo
  const handleSaveUpdatedTodo = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // send to frontend-api which forwards to the real backend
    const response = await fetch("/api/todo/update",{
      method: 'post',
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: JSON.stringify( {id: isEditingId, title: editTodoTitle } )
    });

    const json = await response.json();

    if ( response.status == 200 && json.todo && json.todo.id ) {
      setSuccessMessage("Todo was updated");

      setEditTodoTitle("");

    } else {
      setErrorMessage("Failed to update todo");
    }
    
    setIsEditing(false);
    setIsLoading(false);

    router.replace("/"); // reloads page and list with all
  }


  // render page
  return (
    <>
      {(error || errorMessage) && <Message type="error" onTimeoutCallback={() => setErrorMessage("")}>{error || errorMessage}</Message> }
      {successMessage && <Message onTimeoutCallback={() => setSuccessMessage("")}>{successMessage}</Message> }

      <main className={`z-10 ${isLoading ? "bg-zinc-300 opacity-60" : ""}`}>
  
        {/* Common loader */}
        <div className="z-30 absolute top-[25%] left-[45%]">
          <PuffLoader color="#000" loading={isLoading} />
        </div>

        <div className={`z-10 ${isLoading ? "opacity-20" : ""}`}>
          {todos.length > 0 && todos.map((item) => 
              <div className={`todo-row flex justify-end ${!isLoading ? "border-b-2 border-blue-600" : ""}`} key={item.id}>
                {/* Display todo */}
                <div className="flex w-3/4">
                  { (!isEditingId || isEditingId !== item.id) && <>
                    <span className="completed mr-2">
                      <button disabled={isLoading} onClick={(e) => handleToggleCompleted(e, item)} className="text-xl hover:opacity-40" title="Toggle completed">{item.isCompleted ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</button>
                    </span>
                    <span className="title">{item.title}</span>
                    </>
                  }

                  {/* Update title in todo */}
                  { (isEditingId && isEditingId == item.id) && <>
                    <input type="text" disabled={isLoading} onChange={handleSetEditTitle} className={`py-2 px-6 mr-6 ${!isLoading ? "bg-zinc-50" : "bg-zinc-300"} rounded-lg w-full`} value={editTodoTitle} />
                    </>
                  }

                </div>
                <div className="flex w-1/4 justify-end">
                  {/* Action-button to start editing */}
                  {!isEditingId && <button onClick={(e) => handleSetEditing(e, item)} className="bg-zinc-200 hover:bg-zinc-400 py-2 px-6 rounded-lg">Edit</button>}

                  {/* Action-buttons when editing */}
                  { (isEditingId && isEditingId == item.id) && <>
                      <button onClick={handleSaveUpdatedTodo} className="bg-zinc-200 hover:bg-zinc-400 py-2 px-6 rounded-lg">Save</button>
                      <button onClick={(e) => handleSetEditing(e, false)} className="bg-zinc-200 hover:bg-zinc-400 py-2 px-6 rounded-lg ml-2">Cancel</button>
                    </>
                  }
                </div>
              </div>
          )}
          
          {/* Add new todo ( only when not editing ) */}
          {!isEditingId && (
            <div className={`todo-row flex justify-end mb-4 ${!isLoading ? "border-b-2 border-blue-600" : ""}`}>
                <input type="text" disabled={isLoading} onChange={handleSetNewTodoTitle} className={`py-2 px-6 mr-2 ${!isLoading ? "bg-zinc-50" : "bg-zinc-300"} rounded-lg w-full`} placeholder="Write new title here..." value={newTodoTitle} />
                {!isLoading && <button onClick={handleSaveNewTodo} className="bg-zinc-200 hover:bg-zinc-400 py-2 px-6 rounded-lg">Save</button>}
            </div>
          )}

        </div>

      </main>      
    </>
  )
}
