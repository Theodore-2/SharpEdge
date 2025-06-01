export const loginUser = () => {
    localStorage.setItem("authToken", "sharpedge_secret_token");
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("authToken");
  };
  
  export const isLoggedIn = (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("authToken");
  };