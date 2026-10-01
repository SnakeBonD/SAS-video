export type PromptPreset = {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
};

export const promptPresets: PromptPreset[] = [
  {
    id: "light-wind",
    name: "Vent léger",
    emoji: "🌬️",
    prompt:
      "Subtle natural movement caused by a light breeze, realistic and delicate.",
  },
  {
    id: "daydream",
    name: "Rêve éveillé",
    emoji: "💭",
    prompt:
      "Dreamlike gentle movement, soft atmosphere, natural breathing and subtle depth.",
  },
  {
    id: "golden-hour",
    name: "Golden hour",
    emoji: "🌅",
    prompt:
      "Warm golden hour light, delicate movement and cinematic natural atmosphere.",
  },
  {
    id: "calm-night",
    name: "Nuit calme",
    emoji: "🌙",
    prompt:
      "Calm night atmosphere, subtle moonlight and slow natural movement.",
  },
  {
    id: "black-white",
    name: "Noir & blanc",
    emoji: "⚫",
    prompt:
      "Elegant black and white cinematic photography with subtle realistic movement.",
  },
  {
    id: "cinematic",
    name: "Cinématique",
    emoji: "🎬",
    prompt:
      "Cinematic camera movement, realistic depth, controlled motion and premium film lighting.",
  },
  {
    id: "poetic-fog",
    name: "Brume poétique",
    emoji: "🌫️",
    prompt:
      "Soft poetic fog, atmospheric depth and delicate slow movement.",
  },
];