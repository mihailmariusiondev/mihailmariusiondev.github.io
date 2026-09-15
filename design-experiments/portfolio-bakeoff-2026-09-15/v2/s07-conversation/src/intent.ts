import { INTENTS, type Intent } from "./data";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/**
 * Score-by-substring keyword match. No LLM, no network — a lazy, deterministic
 * fallback that reads fine on a portfolio-sized intent list (~16 intents).
 * ponytail: O(intents * keywords) substring scan, fine below a few hundred
 * intents; a trie/index would only pay off past that.
 */
export function matchIntent(input: string): Intent | null {
  const q = normalize(input);
  if (!q) return null;
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      const nkw = normalize(kw);
      if (q.includes(nkw)) score += nkw.length;
    }
    // also credit the chip labels themselves
    for (const label of [intent.chip.en, intent.chip.es]) {
      const nl = normalize(label);
      if (q.includes(nl)) score += nl.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return bestScore >= 3 ? best : null;
}

export function getIntent(id: string): Intent | undefined {
  return INTENTS.find((i) => i.id === id);
}
