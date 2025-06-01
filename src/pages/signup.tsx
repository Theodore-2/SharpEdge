import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Geçici validasyonlar
    if (!nickname || !fullName || !email || !password) {
      alert("Tüm alanları doldurmalısın.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Geçerli bir e-posta adresi girmelisin.");
      return;
    }

    if (password.length < 6) {
      alert("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    const newUser = {
      nickname,
      fullName,
      email,
      password,
      favProjectIds: []
    };

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) throw new Error("Kayıt başarısız.");

      const createdUser = await res.json();

      // currentUserId olarak localStorage’a yaz
      localStorage.setItem("currentUserId", createdUser.id);

      // Dashboard’a yönlendir
      router.push("/dashboard");
    } catch (error) {
      console.error("Kayıt sırasında hata:", error);
      alert("Kayıt sırasında bir sorun oluştu.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nickname</label>
            <input
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}