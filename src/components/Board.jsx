import { useContext } from "react";
import { KanbanContext } from "../context/KanbanContext";
import BoardColumn from "./BoardColumn";
import NewTaskForm from "./NewTaskForm";
import "../Styles/Board.css"

const Board = ({ filterTerm }) => {
    const { columns } = useContext(KanbanContext)

    const normalized = filterTerm.toLowerCase();

    const filterTasks = (tasks) =>
        tasks.filter((tasks) =>
            tasks.title.toLowerCase().includes(normalized)
        )

    return (
        <div className="board-container">
            <div className="request">
                <p>Añadir tarea</p>
                <NewTaskForm />
            </div>
            <div className="board">
                <BoardColumn title="Todo" tasks={filterTasks(columns.todo)} columnKey="todo" />

                <BoardColumn title="Doing" tasks={filterTasks(columns.doing)} columnKey="doing" />

                <BoardColumn title="Done" tasks={filterTasks(columns.done)} columnKey="done" />
            </div>
        </div>
    )
}

export default Board;