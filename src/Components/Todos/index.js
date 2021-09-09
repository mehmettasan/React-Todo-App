import { useState, useEffect } from 'react'
import "./todos.css"

let defaultTodos = [
    {
        tododesc: "Test Todo 1",
        done: false
    },
    {
        tododesc: "Test Todo 2",
        done: false
    },
    {
        tododesc: "Test Todo 3",
        done: false
    },
]

function Todos() {
    const [todos, setTodos] = useState(defaultTodos)
    const [todosLeft, setTodosLeft] = useState(0);
    const [searchText, setSearchText] = useState("")
    const [sectionTodos, setSectionTodos] = useState(todos)


    let filteredTodos = sectionTodos.filter((item) => {
        return item.tododesc.toLowerCase().includes(searchText.toLowerCase())
    })

    const btnTodoFilter = (section) => {
        if (section === "all") {
            filteredTodos = todos.map(item => item);
            setSectionTodos(filteredTodos);
        }
        else if (section === "active") {
            filteredTodos = todos.filter((item) => item.done === false)
            setSectionTodos(filteredTodos);
        } else if (section === "completed") {
            filteredTodos = todos.filter((item) => item.done)
            setSectionTodos(filteredTodos);
        }
    }

    const clearCompleted = () => {
        setSectionTodos(todos.filter(item => !item.done))
        setTodos(todos.filter(item => !item.done))
    }

    useEffect(() => {
        let todocount = 0;
        todos.map((item) => {
            if (!item.done) {
                todocount++;
                return 0;
            }
            return 0;
        })
        setTodosLeft(todocount);
    }, [todos])

    const checkboxChanged = (e) => {
        setTodos(todos.map((item) => {
            if (e.target.nextSibling.innerText === item.tododesc) {
                item.done = !item.done;
                return item;
            } else {
                return item;
            }
        }))
    }

    return (
        <div id="todo-container">
            <input id="search-todo" placeholder="What needs to be done?" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <ul className="todo-list">
                {
                    filteredTodos.map((item, key) =>
                        <li key={key} className="todo-item"><input type="checkbox" className="checkbox" checked={item.done} onChange={checkboxChanged} />
                            <span className={item.done ? "todo-done" : null}>{item.tododesc}</span>
                        </li>
                    )
                }
            </ul>
            <div id="footer">
                <span>{todosLeft} item left</span>
                <div>
                    <button className="btn" onClick={() => { btnTodoFilter("all") }}>All</button>
                    <button className="btn" onClick={() => { btnTodoFilter("active") }}>Active</button>
                    <button className="btn" onClick={() => { btnTodoFilter("completed") }}>Completed</button>
                </div>
                <button className="btn" onClick={clearCompleted}>Clear Completed...</button>
            </div>
        </div>
    )
}

export default Todos