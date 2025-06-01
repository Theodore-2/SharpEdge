import withAuth from "../components/withAuth";
import { useEffect, useState } from "react";
import { dummyProjects, Project } from "../lib/fakeProjects";
import ProjectCard from "../components/ProjectCard";

function DashboardPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Project>("key");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortAsc(!sortAsc); // aynı field’a tekrar basınca yön tersine döner
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filtered = dummyProjects
    .filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
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

      {/* Arama ve Sıralama Butonları */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <input
            type="text"
            className="p-2 rounded-md w-full sm:w-1/3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search project name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
        />

        <div className="flex gap-2 flex-wrap">
         {["key", "followers", "tweets", "lists"].map((field) => (
            <button
             key={field}
             className={`px-3 py-1 rounded-md border text-xs font-medium ${
                sortField === field
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
            onClick={() => handleSort(field as keyof Project)}
            >
              <>
                {field.toUpperCase()}{" "}
                <span className="text-white text-xs font-bold align-top leading-tight">
                  {sortField === field ? (sortAsc ? "↑" : "↓") : "⇅"}
                </span>
              </>
            </button>
           ))}
        </div>
    </div>

      {/* Proje Kartları */}
      <div className="space-y-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );

}

export default withAuth(DashboardPage);
