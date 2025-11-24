import { useState } from "react"; 
import { useKanban } from "../context/useKanban";
import "../Styles/TaskCard.css"

export default function TaskCard({ task, column }) {
    const { moveTask, updateTask } = useKanban(); 

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const moveTo = (target) => {
        moveTask(task.id, target);
    };

    const handleSave = () => {
        if (editTitle.trim()) {
            updateTask(task.id, editTitle); 
            setIsEditing(false); 
        }
    };

    return (
        <div className={`task-card ${column}`}>
            
            {isEditing ? (
                <div style={{ marginBottom: "10px" }}>
                    <input 
                        autoFocus
                        type="text" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={{ width: "90%", padding: "5px", marginBottom: "5px" }}
                    />
                    <div>
                        <button onClick={handleSave} style={{ cursor: "pointer", marginRight: "5px" }}>OK</button>
                        <button onClick={() => setIsEditing(false)} style={{ cursor: "pointer" }}>X</button>
                    </div>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <p className="title">{task.title}</p> 
                    
                    <button 
                        onClick={() => setIsEditing(true)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
                        title="Edit Task"
                    >
                        ✎
                    </button>
                </div>
            )}

            <div className="task-action">
                {column !== "todo" && (
                    <button className="botones" onClick={() => moveTo("todo")}>
                        Move to To do
                    </button>
                )}

                {column !== "doing" && (
                    <button className="botones" onClick={() => moveTo("doing")}>
                        Move to In-Progress
                    </button>
                )}

                {column !== "done" && (
                    <button className="botones" onClick={() => moveTo("done")}>
                        Move to Done
                    </button>
                )}
            </div>
        </div>
    );
}
