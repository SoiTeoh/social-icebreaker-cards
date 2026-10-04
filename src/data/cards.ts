import type { Card, Deck, Intensity, InteractionMode, LocalizedText } from "@/types/card";
import { chineseFollowUps, chineseQuestions } from "@/data/cardTranslations";

export const decks: { id: Deck; name: LocalizedText; description: LocalizedText; icon: string }[] = [
  { id: "casual", name: { en: "Casual", "zh-CN": "轻松聊" }, description: { en: "Easy starts, good stories", "zh-CN": "轻松开场，慢慢聊开" }, icon: "☀" },
  { id: "funny", name: { en: "Funny", "zh-CN": "逗个乐" }, description: { en: "A little silly, a lot of laughs", "zh-CN": "脑洞开一开，笑声来得快" }, icon: "✳" },
  { id: "deep", name: { en: "Deep", "zh-CN": "聊深一点" }, description: { en: "Go a little beyond small talk", "zh-CN": "聊聊平时不常说的事" }, icon: "✦" },
  { id: "dating", name: { en: "Dating", "zh-CN": "约会聊" }, description: { en: "Get to know each other", "zh-CN": "多了解彼此一点" }, icon: "♥" },
];

const questions: Record<Deck, string[]> = {
  casual: [
    "What’s a small thing that made your day better recently?",
    "What’s your ideal way to spend a free afternoon?",
    "What’s a food you never get tired of?",
    "What’s something you could talk about for hours?",
    "What’s the best thing you watched lately?",
    "Where would you take a friend visiting your city for one day?",
    "What’s a skill you picked up just for fun?",
    "What’s your go-to comfort meal?",
    "Which season feels most like you?",
    "What’s a song you always let play all the way through?",
    "What’s a place you’d happily visit again?",
    "What’s your favorite thing to do on a rainy day?",
    "What’s a hobby you’d like to try?",
    "What’s the nicest compliment you’ve received lately?",
    "What’s one thing you always keep in your bag or pocket?",
    "What’s a movie you’d gladly rewatch tonight?",
    "What’s your favorite way to start a weekend?",
    "What’s something ordinary that you find oddly satisfying?",
    "What’s a recommendation you love giving people?",
    "What’s a little tradition you look forward to?",
  ],
  funny: [
    "What’s the most ridiculous thing you believed as a kid?",
    "If your pet could text, what would its first message say?",
    "What would your very useless superpower be?",
    "What’s a tiny inconvenience you react to like it’s a disaster?",
    "If you had a personal theme song, when would it play?",
    "What food would be the worst flavor of toothpaste?",
    "What’s your most dramatic reaction to a minor problem?",
    "If you had to rename yourself after a snack, what would you pick?",
    "What’s a fashion choice you once thought was brilliant?",
    "Which animal would be the rudest roommate?",
    "What’s the weirdest thing you’ve ever Googled?",
    "What’s a harmless hill you’re willing to die on?",
    "If your life had a laugh track, which moment would use it most?",
    "What’s the worst possible name for a fancy restaurant?",
    "What everyday task deserves its own Olympic event?",
    "What’s a phrase you say way too often?",
    "If you could add one silly rule to your workplace or school, what would it be?",
    "What’s the funniest misunderstanding you’ve been part of?",
    "What object in this room would win a talent show?",
    "What’s your most questionable food combination?",
  ],
  deep: [
    "When do you feel most like yourself?",
    "What’s something you’ve changed your mind about?",
    "What kind of day makes you feel truly rested?",
    "Who taught you something that has stayed with you?",
    "What’s a small decision that changed your life in a good way?",
    "What do you wish people asked you about more often?",
    "What does a good friendship feel like to you?",
    "What’s something you’re proud you kept doing?",
    "What would you tell your younger self about growing up?",
    "What’s a place where you feel completely at ease?",
    "What’s a lesson you learned from someone very different from you?",
    "What does being brave look like in everyday life?",
    "What’s something you’d like to make more time for?",
    "What’s a memory that still makes you smile?",
    "What helps you feel understood?",
    "What’s a quality you’ve come to appreciate more with age?",
    "What’s one thing you hope people remember about you?",
    "When did you last surprise yourself?",
    "What’s something simple that feels meaningful to you?",
    "What’s a question you wish you knew the answer to?",
  ],
  dating: [
    "What does a really good first date look like to you?",
    "What’s a little gesture that makes you feel cared for?",
    "What’s something you’re excited to share with someone?",
    "Are you more of a plan-ahead or see-where-the-day-goes person?",
    "What’s your favorite way to spend time together without spending much?",
    "What’s a green flag you notice right away?",
    "What’s a fun date idea you haven’t tried yet?",
    "What makes a conversation feel easy for you?",
    "What’s a place you’d love to explore with someone?",
    "What’s a small habit you find endearing?",
    "What kind of humor always gets you?",
    "What’s something you’d want a partner to teach you?",
    "What’s your favorite way to celebrate good news?",
    "What’s a song you’d put on a shared road-trip playlist?",
    "What’s your idea of a cozy evening together?",
    "What’s something you appreciate when meeting someone new?",
    "What’s a question you love being asked?",
    "What’s a meal you’d enjoy making with someone?",
    "What’s an experience you’d love to share for the first time?",
    "What makes you feel comfortable being yourself around someone?",
  ],
};

type Enhancement = { interaction: InteractionMode; intensity: Intensity; followUp?: string };

// Seven existing questions per deck form the Phase 3 conversation experiment.
// The other questions retain the original question-only card format.
const enhancements: Record<string, Enhancement> = {
  "casual-001": { interaction: "everyone", followUp: "Did anyone have the same kind of moment?", intensity: 1 },
  "casual-002": { interaction: "choose", followUp: "Who would you invite along?", intensity: 1 },
  "casual-004": { interaction: "you", followUp: "How did you get into it?", intensity: 1 },
  "casual-006": { interaction: "pass", intensity: 1 },
  "casual-008": { interaction: "everyone", followUp: "Who makes the best version?", intensity: 1 },
  "casual-011": { interaction: "choose", intensity: 1 },
  "casual-018": { interaction: "react", followUp: "Does anyone else find that satisfying?", intensity: 1 },

  "funny-001": { interaction: "you", followUp: "Who finally told you the truth?", intensity: 1 },
  "funny-002": { interaction: "choose", followUp: "What would they text back?", intensity: 1 },
  "funny-003": { interaction: "everyone", followUp: "Whose power would be the least useful?", intensity: 1 },
  "funny-006": { interaction: "vote", followUp: "Why is that the worst one?", intensity: 1 },
  "funny-010": { interaction: "vote", intensity: 1 },
  "funny-015": { interaction: "pass", followUp: "Who would win?", intensity: 1 },
  "funny-020": { interaction: "react", intensity: 1 },

  "deep-001": { interaction: "you", followUp: "What brings that side of you out?", intensity: 2 },
  "deep-002": { interaction: "react", followUp: "What changed your mind?", intensity: 2 },
  "deep-003": { interaction: "everyone", intensity: 2 },
  "deep-004": { interaction: "you", followUp: "What did they do that stayed with you?", intensity: 2 },
  "deep-010": { interaction: "choose", intensity: 2 },
  "deep-014": { interaction: "pass", followUp: "Who was there with you?", intensity: 2 },
  "deep-017": { interaction: "react", followUp: "What would you hope they say?", intensity: 3 },

  "dating-001": { interaction: "everyone", followUp: "What part matters most to you?", intensity: 1 },
  "dating-002": { interaction: "you", followUp: "When did someone last do that for you?", intensity: 2 },
  "dating-004": { interaction: "vote", intensity: 1 },
  "dating-006": { interaction: "react", followUp: "What makes that stand out?", intensity: 1 },
  "dating-007": { interaction: "choose", intensity: 1 },
  "dating-012": { interaction: "pass", followUp: "What would you teach them back?", intensity: 2 },
  "dating-015": { interaction: "everyone", intensity: 1 },
};

export const cards: Card[] = (Object.entries(questions) as [Deck, string[]][]).flatMap(
  ([deck, deckQuestions]) =>
    deckQuestions.map((question, index) => {
      const id = `${deck}-${String(index + 1).padStart(3, "0")}`;
      const enhancement = enhancements[id];
      return {
        id,
        deck,
        question: { en: question, "zh-CN": chineseQuestions[id] },
        interaction: enhancement?.interaction,
        followUp: enhancement?.followUp ? { en: enhancement.followUp, "zh-CN": chineseFollowUps[id] } : undefined,
        intensity: enhancement?.intensity,
      };
    }),
);

export const cardsByDeck: Record<Deck, Card[]> = {
  casual: cards.filter((card) => card.deck === "casual"),
  funny: cards.filter((card) => card.deck === "funny"),
  deep: cards.filter((card) => card.deck === "deep"),
  dating: cards.filter((card) => card.deck === "dating"),
};
