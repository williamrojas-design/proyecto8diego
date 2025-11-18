import TaskCard from "./TaskCard";
import "../Styles/BoardColumn.css"

export default function BoardColumn({ title, tasks, columnKey }) {
    return (
        <div className="board-column">
                <p className="title">
                    {title}
                </p>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            column={columnKey}
                        />
                    ))
                ) : (
                    <p className="empty">No hay tareas</p>
                )
                }
        </div>
    )
}