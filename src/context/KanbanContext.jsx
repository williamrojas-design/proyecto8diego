import { createContext, useState, useEffect } from "react";

export const KanbanContext = createContext();

export function KanbanProvider({ children }) {
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem("KanbanData");
      if (saved) {
        setColumns(JSON.parse(saved));
        setIsLoaded(true);
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
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("KanbanData", JSON.stringify(columns));
    }
  }, [columns, isLoaded]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title };
    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const moveTask = (taskId, toColumn) => {
    setColumns((prev) => {
      let task;
      const updated = { ...prev };

      for (const key in updated) {
        updated[key] = updated[key].filter((t) => {
          if (t.id === taskId) {
            task = t;
            return false;
          }
          return true;
        });
      }

      if (task) updated[toColumn].push(task);

      return updated;
    });
  };

  const updateTask = (taskId, newTitle) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key] = updated[key].map((t) =>
          t.id === taskId ? { ...t, title: newTitle } : t
        );
      }
      return updated;
    });
  };

  return (
    <KanbanContext.Provider value={{ columns, addTask, moveTask, updateTask }}>
      {children}
    </KanbanContext.Provider>
  );

};
