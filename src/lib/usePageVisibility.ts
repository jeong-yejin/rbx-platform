import { useEffect } from "react";

export function usePageVisibility(onReturn: () => void) {
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "visible") onReturn();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [onReturn]);
}
