import React from 'react';
import CodeChip from './CodeChip';

/**
 * StepsProcess — DS-compliant numbered horizontal process.
 *
 * Renders a grid of step cells, each with a numbered teal circle,
 * a title, a body paragraph, and an optional inline CodeChip example.
 * Connector lines join consecutive circles. On tablet (≤1024) drops
 * to 2 columns and hides connectors; on mobile (≤640) stacks 1-up.
 *
 * Text-preservation principle: every step.n, step.title, step.body,
 * and step.example comes from the call site verbatim. No defaults.
 *
 * Props
 *  steps          [{ n: string, title: string, body: string, example?: string }] — REQUIRED
 *  className      string — extra classes on the outer .ins-steps grid
 *
 * Example:
 *   <StepsProcess
 *     steps={[
 *       { n: '01', title: 'Connect every revenue source', body: '...', example: 'Salesforce + Stripe → unified' },
 *       { n: '02', title: 'Certify the metrics that matter', body: '...', example: 'MRR + CAC → certified ✓' },
 *       { n: '03', title: 'Ask anything in plain English', body: '...', example: '"Why did MRR drop?" → @MRR −$1.2K' },
 *       { n: '04', title: 'Run pipeline reviews on live data', body: '...', example: 'QBR deck → live, no rebuild' },
 *     ]}
 *   />
 */
function StepsProcess({
  steps = [],
  className = '',
  style,
  ...rest
}) {
  const classes = ['ins-steps', className].filter(Boolean).join(' ');
  const gridStyle = { '--ins-steps-count': steps.length, ...style };

  return (
    <div className={classes} style={gridStyle} {...rest}>
      {steps.map((s, i) => (
        <div key={i} className="ins-steps__cell">
          {i < steps.length - 1 && (
            <div className="ins-steps__connector" aria-hidden="true" />
          )}
          <div className="ins-steps__circle" aria-hidden="true">
            <span className="ins-steps__num">{s.n}</span>
          </div>
          <h3 className="ins-steps__title">{s.title}</h3>
          <p className="ins-steps__body">{s.body}</p>
          {s.example && (
            <CodeChip variant="inline">{s.example}</CodeChip>
          )}
        </div>
      ))}
    </div>
  );
}

export default StepsProcess;
