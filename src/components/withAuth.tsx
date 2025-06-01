"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "../utils/auth";

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (typeof window !== "undefined" && !isLoggedIn()) {
        router.replace("/");
      }
    }, []);

    if (!mounted) return null;

    return <WrappedComponent />;
  };

  return ComponentWithAuth;
};

export default withAuth;