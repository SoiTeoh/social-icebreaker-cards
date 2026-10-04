export type Deck = "casual" | "funny" | "deep" | "dating";
export type Language = "en" | "zh-CN";
export type LocalizedText = { en: string; "zh-CN"?: string };

export type InteractionMode = "you" | "everyone" | "choose" | "pass" | "react" | "vote";

export type Intensity = 1 | 2 | 3;

export type Card = {
  id: string;
  deck: Deck;
  question: LocalizedText;
  interaction?: InteractionMode;
  followUp?: LocalizedText;
  intensity?: Intensity;
};
