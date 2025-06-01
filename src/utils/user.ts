export const getCurrentUserId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("currentUserId");
};

export const fetchCurrentUser = async () => {
  const id = getCurrentUserId();
  if (!id) return null;
  const res = await fetch(`http://localhost:4000/users/${id}`);
  return await res.json();
};

export const toggleFavorite = async (projectId: number) => {
  const id = getCurrentUserId();
  if (!id) return;

  const res = await fetch(`http://localhost:4000/users/${id}`);
  const user = await res.json();

  let updatedFavs = [...user.favProjectIds];

  if (updatedFavs.includes(projectId)) {
    updatedFavs = updatedFavs.filter((id: number) => id !== projectId);
  } else {
    updatedFavs.push(projectId);
  }

  await fetch(`http://localhost:4000/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favProjectIds: updatedFavs }),
  });

  return updatedFavs;
};