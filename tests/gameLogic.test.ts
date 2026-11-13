import { describe, expect, it } from "vitest";
import { cardsByDeck } from "@/data/cards";
import {
  MAX_HISTORY,
  drawNext,
  goPrevious,
  newGame,
  revealFollowUp,
  shuffle,
} from "@/lib/gameLogic";

describe("gameLogic", () => {
  it("shuffle 保持元素集合完整且不增删", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const out = shuffle(input, () => 0.42);
    expect(out).toHaveLength(input.length);
    expect([...out].sort((a, b) => a - b)).toEqual(input);
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("单个卡组周期内抽卡不重复，进度从 1 到 20 递增", () => {
    const deck = cardsByDeck.casual;
    let game = newGame("casual");
    const seen = new Set<string>([game.history[0].card.id]);
    expect(game.history[0].progress).toBe(1);

    for (let i = 1; i < deck.length; i++) {
      game = drawNext(game);
      const current = game.history[game.index];
      expect(seen.has(current.card.id)).toBe(false);
      seen.add(current.card.id);
      expect(current.progress).toBe(i + 1);
    }
    expect(seen.size).toBe(deck.length);
  });

  it("卡组抽空重新洗牌时避免连续重复上一张卡", () => {
    const sampleCards = cardsByDeck.casual.slice(0, 3);
    // 构造一个刚好抽完第一轮最后一张的状态，且固定 rng 让下一轮原末尾恰好与上一张相同
    let game = newGame("casual", sampleCards, () => 0.99);
    game = drawNext(game, sampleCards, () => 0.99);
    game = drawNext(game, sampleCards, () => 0.99);
    const lastId = game.history[game.index].card.id;

    // 触发新一轮重洗（rng=0.99 不换位，若未防重复则会抽到 sampleCards 末尾同卡）
    const nextRound = drawNext(game, sampleCards, () => 0.99);
    const nextCard = nextRound.history[nextRound.index];
    expect(nextCard.card.id).not.toBe(lastId);
    expect(nextCard.progress).toBe(1);
  });

  it("支持历史记录回退与前进，且保留追问展开状态", () => {
    let game = newGame("funny");
    const firstId = game.history[0].card.id;
    game = revealFollowUp(game, firstId);
    expect(game.history[0].followUpVisible).toBe(true);

    game = drawNext(game);
    const secondId = game.history[1].card.id;
    expect(game.index).toBe(1);

    // 回到上一张不重抽，且保留 followUpVisible
    game = goPrevious(game);
    expect(game.index).toBe(0);
    expect(game.history[0].card.id).toBe(firstId);
    expect(game.history[0].followUpVisible).toBe(true);

    // 在第一张再点 Previous 不越界
    expect(goPrevious(game).index).toBe(0);

    // 前进回到已看过的第二张，不消费剩余队列
    const remainingBefore = game.remaining.length;
    game = drawNext(game);
    expect(game.index).toBe(1);
    expect(game.history[1].card.id).toBe(secondId);
    expect(game.remaining.length).toBe(remainingBefore);
  });

  it("历史记录长度严格受 MAX_HISTORY (60) 上限限制", () => {
    let game = newGame("deep");
    for (let i = 0; i < 85; i++) {
      game = drawNext(game);
    }
    expect(game.history).toHaveLength(MAX_HISTORY);
    expect(game.index).toBe(MAX_HISTORY - 1);
  });
});
