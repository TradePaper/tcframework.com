import { CLUSTERS } from "../data/clusters";
import { QUESTIONS, type Question, type TierValue } from "../data/questions";

export type AnswerMap = Partial<Record<number, TierValue>>;

export interface GapResult {
  q: Question;
  i: number;
  gap: number;
}

export interface TierResult {
  overall: TierValue;
  clusterScores: TierValue[];
  criticalGaps: string[];
  gaps: GapResult[];
}

export function calcTier(answers: AnswerMap): TierResult | null {
  if (Object.keys(answers).length < QUESTIONS.length) return null;

  const clusterScores = CLUSTERS.map((cluster) =>
    Math.min(...cluster.questions.map((questionIndex) => answers[questionIndex] ?? 0)),
  ) as TierValue[];

  const overall = Math.min(...clusterScores) as TierValue;
  const criticalGaps = QUESTIONS.filter((question, index) => question.critical && answers[index] === 0).map((question) => question.id);
  const priority = ["4.7", "4.12", "4.3", "sep", "4.6", "4.3b", "4.2", "4.1"];

  const gaps = QUESTIONS
    .map((question, index) => ({
      q: question,
      i: index,
      gap: (overall < 3 ? overall + 1 : 3) - (answers[index] ?? 0),
    }))
    .filter((item) => item.gap > 0)
    .sort((a, b) => {
      const priorityA = priority.indexOf(a.q.id);
      const priorityB = priority.indexOf(b.q.id);
      return (priorityA === -1 ? 99 : priorityA) - (priorityB === -1 ? 99 : priorityB) || b.gap - a.gap;
    })
    .slice(0, 3);

  return { overall, clusterScores, criticalGaps, gaps };
}
