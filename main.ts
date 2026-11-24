// The Dog Ate My Homework: Funniest Excuse
// One line, in the dog's own voice, of the excuse a dog gives after being
// caught eating the homework. The judge weighs, most important first:
//   1. excuse from a dog caught eating the homework, in the dog's own voice
//   2. bigger laugh: a twist or a piece of dog logic that lands in one line
//   3. sounds like a real dog, dog's priorities, no human embarrassment
//   4. works on its own, no setup, nothing needing a second line
//   5. fresh: NOT stock lines about the cat, the taste of paper, being a good boy
// The best excuse sounds like a dog who believes it did nothing wrong.
// Lesson applied (kiencx excuse final, 2026-11-24): quiet minimal lines with
// one small concrete scene beat clever-mechanism wordplay for excuse briefs.
// Every candidate below was written fresh in this session; none is copied
// from any prior entry. Weights 5/4/3/2/1 follow the judge's criterion order.
// Scores are 0-2 per criterion; max 30. Winner is picked at runtime.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  line: string;
  // [voice, funny, realDog, standalone, fresh], each 0-2
  scores: [number, number, number, number, number];
};

const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    line: "It was already on the floor. I just finished what gravity started.",
    scores: [2, 2, 2, 2, 2], // 30 — quiet scene, dog logic, believes it did nothing wrong
  },
  {
    line: "I only meant to smell it. My mouth got there first and stayed for dinner.",
    scores: [2, 2, 2, 2, 1], // 29 — smell is close to the banned taste-of-paper stock
  },
  {
    line: "It fell off the table and landed in my bowl. I thought it was a serving.",
    scores: [2, 2, 2, 2, 1], // 29 — "it fell on the floor" is a common excuse frame
  },
  {
    line: "I was guarding it. Then it looked delicious, so I guarded it from the inside.",
    scores: [2, 2, 2, 1, 2], // 28 — "from the inside" needs a beat to land
  },
  {
    line: "The pencil was still on it. I ate around the pencil. I'm not a monster.",
    scores: [2, 2, 1, 2, 2], // 27 — "monster" is a human framing, not a dog's
  },
  {
    line: "The homework smelled like the park, so I brought the park home in my mouth.",
    scores: [2, 1, 2, 2, 2], // 26 — warm scene, but the twist is soft
  },
  {
    line: "I read the first page and it said nothing about treats, so I turned it into one.",
    scores: [1, 2, 1, 2, 2], // 22 — a dog that reads is not a real dog
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function main(): void {
  const ranked = [...CANDIDATES]
    .map((c) => ({ line: c.line, score: total(c) }))
    .sort((a, b) => b.score - a.score);
  for (const r of ranked) {
    console.log(`${String(r.score).padStart(2, " ")}/30  ${r.line}`);
  }
  const winner = ranked[0];
  console.log(`\nWinner: ${winner.line}`);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.line, "utf8");
  const back = readFileSync("/output/entry.txt", "utf8");
  const bytes = Buffer.byteLength(back, "utf8");
  const ok =
    back === winner.line &&
    back.trim().length > 0 &&
    back.length >= 1 &&
    back.length <= 200 &&
    !back.includes("\n");
  if (!ok) {
    throw new Error(
      `gate FAILED: re-read ${JSON.stringify(back)} (${back.length} chars, ${bytes} bytes)`,
    );
  }
  console.log(
    `gate OK: non-blank, one line, ${back.length} chars, ${bytes} bytes (<=200)`,
  );
}

main();
