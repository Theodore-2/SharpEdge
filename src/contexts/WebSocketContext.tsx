import { createContext, useContext, useEffect, useState } from "react";
import { Project } from "@/types/project";

interface WebSocketContextType {
  projects: Project[];
}

const WebSocketContext = createContext<WebSocketContextType>({
  projects: [],
});

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("http://server.sharpedge.local:8080/projects")
      .then((res) => res.json())
      .then((initialProjects: Project[]) => {
        setProjects(initialProjects);
      })
      .catch((err) => console.error("Initial fetch failed:", err));

    const ws = new WebSocket("ws://server.sharpedge.local:8080/");

    ws.onopen = () => {
      console.log("✅ WebSocket bağlantısı kuruldu");
    };

    ws.onmessage = (event) => {
      try {
        const data: Project = JSON.parse(event.data);

        setProjects((prev) => {
          const exists = prev.some((p) => p.id === data.id);
          return exists ? prev : [...prev, data];
        });
      } catch (err) {
        console.error("🚨 WebSocket veri hatası:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket bağlantı hatası:", err);
    };

    ws.onclose = () => {
      console.warn("🔌 WebSocket bağlantısı kapandı");
    };

    return () => ws.close();
  }, []);

  return (
    <WebSocketContext.Provider value={{ projects }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);