import { createContext, useState, useEffect } from "react";

export const KanbanContext = createContext();

// Proveedor
export function KanbanProvider({ children }) {
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });


  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem("KanbanData");
      if (saved) {
        setColumns(JSON.parse(saved));
        return;
      }

      try {
        const res = await fetch("https://dummyjson.com/todos?limit=5");
        const data = await res.json();
        const mapped = { todo: [], doing: [], done: [] };
        data.todos.forEach(t => {
          const task = { id: t.id, title: t.todo };
          if (t.completed) mapped.done.push(task);
          else mapped.todo.push(task);
        });
        setColumns(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);



  useEffect(() => {
    localStorage.setItem("KanbanData", JSON.stringify(columns))
  }, [columns]);


  // Agregar Tarea 
  const addTask = (title) => {
    const newTask = { id: Date.now(), title };
    setColumns((prev) => ({
      ...prev, // Copia las columnas existentes
      todo: [...prev.todo, newTask], // Agrega una nueva tarea en la columna “todo” sin borrar las anteriores
    }));
  };

  // Mover tarea
  const moveTask = (taskId, toColumn) => {
    setColumns((prev) => {
      let task;
      const updated = { ...prev };

      // quitar tarea
      for (const key in updated) { //recorre todas la propiedades de updated
        updated[key] = updated[key].filter((t) => { // comprabamos que la condicion se cumpla 
          if (t.id === taskId) {
            task = t; //Guardamos la tarea para añadirla despues
            return false; // La quitamos del array actual 
          }
          return true; //Matiene todas la demas tareas
        });
      }

      // agregarla a la nueva columna
      if (task) updated[toColumn].push(task);

      return updated;
    });
  };

  return (
    <KanbanContext.Provider value={{ columns, addTask, moveTask }}>
      {children}
    </KanbanContext.Provider>
  );
}
