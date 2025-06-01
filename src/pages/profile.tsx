import withAuth from "../components/withAuth";
import { useEffect, useState } from "react";
import { Project } from "../lib/fakeProjects";

interface User {
  id: number;
  nickname: string;
  fullName: string;
  email: string;
  favProjectIds: number[];
}

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [favProjects, setFavProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchUserAndFavorites = async () => {
      const id = localStorage.getItem("currentUserId");
      if (!id) return;

      // Kullanıcıyı al
      const userRes = await fetch(`http://localhost:4000/users/${id}`);
      const userData = await userRes.json();
      setUser(userData);

      // Favori projeleri al
      const projectRes = await fetch(`http://localhost:4000/projects`);
      const allProjects = await projectRes.json();

      const userFavs = allProjects.filter((p: Project) =>
        userData.favProjectIds.includes(p.id)
      );
      setFavProjects(userFavs);
    };

    fetchUserAndFavorites();
  }, []);

  if (!user) return <div className="text-white p-6">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">👤 User Profile</h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <p><span className="font-semibold">Nickname:</span> {user.nickname}</p>
        <p><span className="font-semibold">Full Name:</span> {user.fullName}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">❤️ Favorite Projects</h2>
      <div className="space-y-4">
        {favProjects.length === 0 ? (
          <p className="text-gray-400">Henüz favori proje yok.</p>
        ) : (
          favProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-gray-800 rounded-md shadow text-white"
            >
              <div className="text-lg font-semibold">{project.name}</div>
              <div className="text-sm text-gray-400">{project.tags?.join(", ")}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);