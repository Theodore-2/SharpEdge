import withAuth from "../components/withAuth";
import { useEffect, useState } from "react";
import { Project } from "../lib/fakeProjects";
import ProjectCard from "../components/ProjectCard";

function DashboardPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [index, setIndex] = useState(0);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Project>("key");
  const [sortAsc, setSortAsc] = useState(false);

  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Favorileri localStorage'tan yükle
  useEffect(() => {
    const savedFavs = localStorage.getItem("favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  // Favorileri kaydet
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Projeleri localStorage'tan yükle
  useEffect(() => {
    const saved = localStorage.getItem("visibleProjects");
    if (saved) {
      const parsed = JSON.parse(saved);
      setVisibleProjects(parsed);
      setIndex(parsed.length);
    }
  }, []);

  // Tüm projeleri backend'den çek
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/projects");
      const data = await res.json();
      setAllProjects(data);
    };

    fetchData();
  }, []);

  // Her 10 saniyede 1 yeni proje ekle
  useEffect(() => {
    const interval = setInterval(() => {
      if (index < allProjects.length) {
        setVisibleProjects((prev) => [...prev, allProjects[index]]);
        setIndex((prev) => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [allProjects, index]);

  // Projeleri kaydet
  useEffect(() => {
    if (visibleProjects.length > 0) {
      localStorage.setItem("visibleProjects", JSON.stringify(visibleProjects));
    }
  }, [visibleProjects]);

  // Favori toggle fonksiyonu
  const handleFavoriteToggle = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Filtreleme + sıralama
  const filtered = visibleProjects
    .filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((project) =>
      showOnlyFavorites ? favorites.includes(project.id) : true
    )
    .sort((a, b) => {
      const valA = a[sortField] ?? 0;
      const valB = b[sortField] ?? 0;
      if (typeof valA === "number" && typeof valB === "number") {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Trending Projects</h1>

      {/* Arama + Followings + Sıralama */}
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
              showOnlyFavorites ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
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

      {/* Proje Kartları */}
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