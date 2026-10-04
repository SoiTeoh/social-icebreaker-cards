import type { InteractionMode, Language } from "@/types/card";

export const interactionLabels: Record<Language, Record<InteractionMode, string>> = {
  en: {
    you: "Your turn.",
    everyone: "Everyone answers.",
    choose: "Pick someone else to answer first.",
    pass: "Pass the phone. They answer first.",
    react: "One person answers. Everyone else can ask one follow-up.",
    vote: "Everyone chooses. Then explain why.",
  },
  "zh-CN": {
    you: "你先说。",
    everyone: "每个人都说说。",
    choose: "选个人，让他先说。",
    pass: "把手机递给别人，让他先说。",
    react: "一个人先说，其他人可以各追问一句。",
    vote: "大家先选一个，再说说为什么。",
  },
};
