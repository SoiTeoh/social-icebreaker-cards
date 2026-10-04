import type { Card as CardType } from "@/types/card";
import { interactionLabels } from "@/data/interactionModes";
import { localize, ui } from "@/data/localization";
import type { Language } from "@/types/card";

type Props = {
  card: CardType;
  deckName: string;
  followUpVisible: boolean;
  onRevealFollowUp: () => void;
  language: Language;
};

export function Card({ card, deckName, followUpVisible, onRevealFollowUp, language }: Props) {
  const t = ui[language];
  return (
    <article className={`question-card deck-${card.deck}`} aria-live="polite" aria-atomic="true">
      <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.16em]">
        <span>{t.deckLabel(deckName)}</span><span className="card-symbol" aria-hidden="true">✳</span>
      </div>
      <p className="my-auto py-10 text-[clamp(2rem,7vw,3.6rem)] font-semibold leading-[1.14] tracking-tight">
        {localize(card.question, language)}
      </p>
      {card.interaction ? (
        <div className="conversation-cue">
          <span className="cue-label">{t.whoAnswers}</span>
          <p className="mt-1 text-base font-semibold leading-snug">{interactionLabels[language][card.interaction]}</p>
        </div>
      ) : (
        <p className="text-sm font-medium opacity-70">{t.noWrongAnswer}</p>
      )}
      {card.followUp && (
        <div className="follow-up mt-5">
          {followUpVisible ? (
            <div>
              <span className="cue-label">{t.keepTalking}</span>
              <p className="mt-1 text-base font-semibold leading-snug">{localize(card.followUp, language)}</p>
            </div>
          ) : (
            <button type="button" className="follow-up-button" onClick={onRevealFollowUp} aria-label={t.revealFollowUp}>
              {t.keepTalking} <span aria-hidden="true">+</span>
            </button>
          )}
        </div>
      )}
    </article>
  );
}
