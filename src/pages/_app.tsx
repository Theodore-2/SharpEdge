import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WebSocketProvider>
      <Component {...pageProps} />
    </WebSocketProvider>
  );
}

