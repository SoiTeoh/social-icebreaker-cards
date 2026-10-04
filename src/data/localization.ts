import type { Language, LocalizedText } from "@/types/card";

export function localize(text: LocalizedText, language: Language): string {
  return text[language]?.trim() || text.en;
}

export function initialLanguage(saved: string | null, browserLanguage: string): Language {
  if (saved === "en" || saved === "zh-CN") return saved;
  return browserLanguage.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
}

const en = {
  appTitle: "Social Icebreaker Cards",
  language: "Language",
  eyebrow: "A little less small talk",
  headlineFirst: "Good questions.",
  headlineSecond: "Better company.",
  intro: "Pick a deck, draw a card, and see where the conversation goes. Pass the phone when you’re ready.",
  chooseDeck: "Choose your deck",
  deckCount: "4 to explore",
  start: "Start playing",
  noRules: "No rules to remember. Just take turns.",
  changeDeck: "Change deck",
  deckLabel: (name: string) => `${name} deck`,
  whoAnswers: "Who answers",
  keepTalking: "Keep talking",
  revealFollowUp: "Reveal follow-up prompt",
  noWrongAnswer: "Take your time. There’s no wrong answer.",
  takeTurns: "Take turns. Follow the conversation.",
  cardProgress: (current: number, total: number) => `Card ${current} of ${total}`,
  previous: "Previous",
  next: "Next card",
  restart: "Restart deck",
};

const zh: typeof en = {
  appTitle: "破冰聊天卡",
  language: "语言",
  eyebrow: "聊点有意思的",
  headlineFirst: "好问题，",
  headlineSecond: "好聊天。",
  intro: "选一组卡，抽个问题，聊到哪儿算哪儿。轮到下一位时，就把手机递过去。",
  chooseDeck: "选一组卡",
  deckCount: "4 组可选",
  start: "开始玩",
  noRules: "不用记规则，轮流聊就好。",
  changeDeck: "换一组",
  deckLabel: (name) => name,
  whoAnswers: "谁先说",
  keepTalking: "接着聊",
  revealFollowUp: "显示追问",
  noWrongAnswer: "慢慢说，没有标准答案。",
  takeTurns: "轮流聊，顺着话题走。",
  cardProgress: (current, total) => `第 ${current} 张，共 ${total} 张`,
  previous: "上一张",
  next: "下一张",
  restart: "重新开始",
};

export const ui: Record<Language, typeof en> = { en, "zh-CN": zh };
