import { describe, expect, it } from "vitest";
import { cardsByDeck, decks } from "@/data/cards";
import { interactionLabels } from "@/data/interactionModes";

describe("cards & decks integrity", () => {
  it("包含 4 个卡组，每组 20 张卡共 80 张且 ID 全局唯一", () => {
    expect(decks).toHaveLength(4);
    const allIds = new Set<string>();
    for (const deck of decks) {
      expect(deck.name.en.trim().length).toBeGreaterThan(0);
      expect(deck.name["zh-CN"]?.trim().length).toBeGreaterThan(0);
      const cards = cardsByDeck[deck.id];
      expect(cards).toHaveLength(20);
      for (const card of cards) {
        expect(card.deck).toBe(deck.id);
        expect(allIds.has(card.id)).toBe(false);
        allIds.add(card.id);
      }
    }
    expect(allIds.size).toBe(80);
  });

  it("所有卡片均具备非空中英文问题，增强卡字段完整合法", () => {
    for (const deck of decks) {
      for (const card of cardsByDeck[deck.id]) {
        expect(card.question.en.trim().length).toBeGreaterThan(0);
        expect(card.question["zh-CN"]?.trim().length).toBeGreaterThan(0);
        if (card.interaction) {
          expect(interactionLabels.en[card.interaction].trim().length).toBeGreaterThan(0);
          expect(interactionLabels["zh-CN"][card.interaction].trim().length).toBeGreaterThan(0);
        }
        if (card.followUp) {
          expect(card.followUp.en.trim().length).toBeGreaterThan(0);
          expect(card.followUp["zh-CN"]?.trim().length).toBeGreaterThan(0);
        }
        if (card.intensity !== undefined) {
          expect([1, 2, 3]).toContain(card.intensity);
        }
      }
    }
  });
});
