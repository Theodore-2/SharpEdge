import withAuth from "../components/withAuth";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { Project } from "../types/project";

function DashboardPage() {
  const { projects: allProjects } = useWebSocket();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Project>("key");
  const [sortAsc, setSortAsc] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    const favSet = new Set(favorites);

    return (allProjects || [])
      .filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((project) =>
        showOnlyFavorites ? favSet.has(project.id) : true
      )
      .slice() // dizi kopyası alındı, mutasyon önlendi
      .sort((a, b) => {
        const valA = a[sortField] ?? 0;
        const valB = b[sortField] ?? 0;
        if (typeof valA === "number" && typeof valB === "number") {
          return sortAsc ? valA - valB : valB - valA;
        }
        return 0;
      });
  }, [allProjects, search, favorites, showOnlyFavorites, sortField, sortAsc]);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Trending Projects</h1>
      <h2 className="text-sm text-gray-400 mb-4">
        Showing {filtered.length} project{filtered.length !== 1 && "s"}
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 w-full sm:w-2/3">
          <input
            type="text"
            className="p-2 rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search project name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              showOnlyFavorites
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Followings
          </button>
        </div>

        <div className="flex gap-2 flex-wrap justify-end">
          {["key", "followers", "tweets", "lists"].map((field) => (
            <button
              key={field}
              className={`px-3 py-1 rounded-md border text-xs font-medium ${
                sortField === field
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => {
                if (sortField === field) {
                  setSortAsc(!sortAsc);
                } else {
                  setSortField(field as keyof Project);
                  setSortAsc(false);
                }
              }}
            >
              {field.toUpperCase()}{" "}
              <span className="text-white text-xs font-bold align-top leading-tight">
                {sortField === field ? (sortAsc ? "↑" : "↓") : "⇅"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            liked={favorites.includes(project.id)}
            onLikeToggle={() => handleFavoriteToggle(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);