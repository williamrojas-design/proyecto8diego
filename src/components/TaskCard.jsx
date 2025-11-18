import { useKanban } from "../context/useKanban";
import "../Styles/TaskCard.css"

export default function TaskCard({ task, column }) {
    const { moveTask } = useKanban();


    const moveLeft = () => {
        if (column === "doing") return moveTask(task.id, "todo")
        if (column === "done") return moveTask(task.id, "doing")
    }

    const moveRight = () => {
        if (column === "todo") return moveTask(task.id, "doing")
        if (column === "doing") return moveTask(task.id, "done")
    }

    return (
        <div className="task-card">
            <p className="title">{task.title}</p>
            <div className="task-action">
                {column !== "todo" && (
                    <button onClick={moveLeft} className="botones">←</button>
                )}

                {column !== "done" && (
                    <button onClick={moveRight} className="botones">→</button>
                )}
            </div>

        </div>
    )
}