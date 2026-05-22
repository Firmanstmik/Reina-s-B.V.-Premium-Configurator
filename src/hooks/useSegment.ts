import { useSyncExternalStore } from "react";

export type Segment = "particulier" | "zakelijk";

let current: Segment = "particulier";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setSegment(next: Segment) {
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

export function useSegment(): [Segment, (n: Segment) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => current,
    () => current,
  );
  return [value, setSegment];
}
