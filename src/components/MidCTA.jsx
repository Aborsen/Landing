import React from 'react';
import BottomCTA from './BottomCTA';

/**
 * MidCTA — the mid-page call to action on the Platform pages.
 *
 * Sits after the "how it works" section and before the page's main exhibit, so a
 * reader who is already convinced can leave without scrolling to the footer.
 *
 * Extracted on 2026-08-03 from two byte-identical wrappers in integrations.jsx and
 * semantic-layer.jsx, whose only difference was the lead sentence. AI Chat then
 * needed one too, and copying the wrapper a third time is how the six Solutions
 * pages ended up with ten glow recipes.
 *
 * WHY IT TAKES `lead` AND `highlight` RATHER THAN A TITLE NODE
 * Both existing call sites wrote the same shape — one short sentence, then a
 * two-word highlighted verb phrase — and passing a ReactNode would let the next
 * page drift from it silently. The rendered sentence is `${lead} ${highlight}`
 * with the second half tinted, which is the pattern, expressed as the API.
 *
 * DISTINCT FROM THE PAGE'S BOTTOM CTA, DELIBERATELY
 * AI Chat previously rendered its MidCTA and its BottomCTASection with
 * byte-identical props — the same call to action twice on one page. Keep the lead
 * here about what the reader is skipping past; the bottom CTA is where the
 * outcome-shaped promise belongs.
 *
 * Props
 *  lead       string — the plain first sentence, e.g. "Skip the SQL."
 *  highlight  string — the tinted phrase that closes it (default "Start asking")
 *  ctaLabel   string — button label (default "Start for free")
 */
function MidCTA({ lead, highlight = 'Start asking', ctaLabel = 'Start for free' }) {
  return (
    <section className="pt-16 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-up is-visible">
          {/* The trailing space is inside the expression, not a sibling text node.
              Written as `{lead} <Highlight>` React sees two adjacent text children
              and emits a <!-- --> separator between them so hydration can tell them
              apart — which changed the built markup on the two pages this was
              extracted from, for no visible difference. One text node, no marker,
              output identical to the wrappers it replaced. */}
          <BottomCTA
            variant="text"
            title={<>{`${lead} `}<BottomCTA.Highlight>{highlight}</BottomCTA.Highlight></>}
            ctaLabel={ctaLabel}
          />
        </div>
      </div>
    </section>
  );
}

export default MidCTA;
