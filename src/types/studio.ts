export type Effect = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export type StudioSettings = {
  duration: "5s" | "6.4s" | "10s";
  framing: "random" | "close" | "medium" | "wide";
  intensity: "random" | "subtle" | "moderate" | "strong";
};
