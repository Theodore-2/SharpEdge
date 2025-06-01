"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "../utils/auth";

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setMounted(true);
        if (!isLoggedIn()) {
          router.replace("/");
        }
      }
    }, []);

    if (!mounted) {
      return <div className="text-white text-center">Yükleniyor...</div>;
    }

    return <WrappedComponent />;
  };

  return ComponentWithAuth;
};

export default withAuth;