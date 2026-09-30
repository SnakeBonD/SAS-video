import type { Effect } from "@/types/studio";

export const effects: Effect[] = [
  { id: "cinematic", name: "Cinematic", description: "Controlled film motion and depth.", category: "Cinema" },
  { id: "drone", name: "Drone Rise", description: "Smooth elevated camera reveal.", category: "Camera" },
  { id: "push-in", name: "Slow Push In", description: "Subtle forward camera movement.", category: "Camera" },
  { id: "orbit", name: "Orbit", description: "Circular motion around the subject.", category: "Camera" },
  { id: "neon", name: "Neon Atmosphere", description: "Green-lit futuristic ambience.", category: "Style" },
  { id: "documentary", name: "Documentary", description: "Natural realistic motion.", category: "Cinema" }
];

export const effectCategories = ["All", ...Array.from(new Set(effects.map((effect) => effect.category)))];
