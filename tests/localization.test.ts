import { describe, expect, it } from "vitest";
import {
  LANGUAGE_STORAGE_KEY,
  initialLanguage,
  localize,
  readSavedLanguage,
  saveLanguage,
  ui,
} from "@/data/localization";

describe("localization", () => {
  it("initialLanguage 优先读取已保存的合法语言，否则按浏览器语言回退", () => {
    expect(initialLanguage("en", "zh-CN")).toBe("en");
    expect(initialLanguage("zh-CN", "en-US")).toBe("zh-CN");
    expect(initialLanguage(null, "zh-CN")).toBe("zh-CN");
    expect(initialLanguage(null, "zh-TW")).toBe("zh-CN");
    expect(initialLanguage("fr", "en-US")).toBe("en");
    expect(initialLanguage("invalid", "")).toBe("en");
  });

  it("localize 在中文缺失或为空白时回退英文", () => {
    expect(localize({ en: "Hello", "zh-CN": "你好" }, "zh-CN")).toBe("你好");
    expect(localize({ en: "Hello" }, "zh-CN")).toBe("Hello");
    expect(localize({ en: "Hello", "zh-CN": "   " }, "zh-CN")).toBe("Hello");
    expect(localize({ en: "Hello", "zh-CN": "你好" }, "en")).toBe("Hello");
  });

  it("中英文 UI 字典键完整且无空字符串（含 backToProjects）", () => {
    const enKeys = Object.keys(ui.en).sort();
    const zhKeys = Object.keys(ui["zh-CN"]).sort();
    expect(zhKeys).toEqual(enKeys);
    expect(ui.en.backToProjects).toBe("My projects");
    expect(ui["zh-CN"].backToProjects).toBe("我的项目");
    expect(ui.en.cardProgress(3, 20)).toContain("3");
    expect(ui["zh-CN"].cardProgress(3, 20)).toContain("3");
  });

  it("readSavedLanguage 与 saveLanguage 在 localStorage 异常或不可用时安全返回", () => {
    expect(readSavedLanguage(null)).toBeNull();
    expect(saveLanguage("zh-CN", null)).toBe(false);

    const brokenStorage = {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };
    expect(readSavedLanguage(brokenStorage)).toBeNull();
    expect(saveLanguage("en", brokenStorage)).toBe(false);

    const store = new Map<string, string>();
    const memoryStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v);
      },
    };
    expect(saveLanguage("zh-CN", memoryStorage)).toBe(true);
    expect(store.get(LANGUAGE_STORAGE_KEY)).toBe("zh-CN");
    expect(readSavedLanguage(memoryStorage)).toBe("zh-CN");
  });

  it("当默认读取 window.localStorage getter 本身抛错时也不崩溃", () => {
    const originalWindow = globalThis.window;
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        get localStorage() {
          throw new Error("SecurityError: storage blocked");
        },
      },
    });
    try {
      expect(readSavedLanguage()).toBeNull();
      expect(saveLanguage("zh-CN")).toBe(false);
    } finally {
      if (originalWindow === undefined) {
        delete (globalThis as { window?: unknown }).window;
      } else {
        Object.defineProperty(globalThis, "window", {
          configurable: true,
          value: originalWindow,
        });
      }
    }
  });
});
