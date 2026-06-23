import { useEffect, useState } from "react";

export type Route =
  | { name: "map" }
  | { name: "module"; id: string; topic?: string }
  | { name: "mental-models" }
  | { name: "glossary" }
  | { name: "decide" };

export function parseHash(raw: string): Route {
  const h = raw.replace(/^#/, "").replace(/^\/+/, "");
  const [seg, a, b] = h.split("/");
  if (seg === "m" && a)
    return { name: "module", id: decodeURIComponent(a), topic: b ? decodeURIComponent(b) : undefined };
  if (seg === "mental-models") return { name: "mental-models" };
  if (seg === "glossary") return { name: "glossary" };
  if (seg === "decide") return { name: "decide" };
  return { name: "map" };
}

/** Subscribe to hash-based routing. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(typeof location !== "undefined" ? location.hash : ""),
  );
  useEffect(() => {
    const onChange = (): void => {
      setRoute(parseHash(location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

/** Programmatic navigation. `to` is a route path like "/m/m15" or "/m/m15/t2". */
export function go(to: string): void {
  const target = to.startsWith("#") ? to : "#" + to;
  if (typeof location === "undefined") return;
  if (location.hash === target) window.scrollTo({ top: 0, behavior: "auto" });
  else location.hash = target;
}
