import React from 'react';

/**
 * CodeChip — DS-compliant dark mono query/response box.
 *
 * Two variants:
 *   - "panel"  : full-width box with query line + response paragraph.
 *                Used inside Card variant="glow" comparison panels (Generic AI
 *                vs Insightis, Without Semantic Layer vs With, etc.).
 *   - "inline" : single-line italic muted text. Used in step-process example
 *                chips ("@CAC = @Spend ÷ @New_Customers") and inline mocks.
 *
 * Text-preservation principle: this component supplies the visual shell
 * only. Every call site passes its own query/response text — no defaults.
 *
 * Props
 *  variant   'panel' | 'inline'        (default: 'inline')
 *  query     string — required for 'panel' (renders prefixed with → arrow)
 *  response  ReactNode — for 'panel'. Can include inline <Highlight> tags.
 *  children  ReactNode — for 'inline' (the example text) or panel response
 *                        (alternative to `response` prop)
 *  as        tag name (default: 'div')
 *
 * Highlight sub-component:
 *   <CodeChip.Highlight>2.1%</CodeChip.Highlight>
 *   Renders a teal-tinted span inside the response body for emphasized values.
 *
 * Examples:
 *   <CodeChip variant="inline">@MRR by month → certified answer</CodeChip>
 *
 *   <CodeChip
 *     variant="panel"
 *     query='What is our churn rate?'
 *     response={<>Your churn rate in March was <CodeChip.Highlight>2.1%</CodeChip.Highlight> — down from 2.8%...</>}
 *   />
 */
function CodeChip({
  variant = 'inline',
  query,
  response,
  as: Component = 'div',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ins-code-chip',
    `ins-code-chip--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  if (variant === 'panel') {
    return (
      <Component className={classes} {...rest}>
        {query && (
          <div className="ins-code-chip__query">→ "{query}"</div>
        )}
        <div className="ins-code-chip__response">
          {response || children}
        </div>
      </Component>
    );
  }

  // inline
  return (
    <Component className={classes} {...rest}>
      {children || response}
    </Component>
  );
}

/**
 * Highlight — teal-tinted inline span for emphasized values inside a CodeChip
 * response. Used inline within `response` prop or as a child element.
 */
function Highlight({ children, className = '', ...rest }) {
  const classes = ['ins-code-chip__highlight', className].filter(Boolean).join(' ');
  return <span className={classes} {...rest}>{children}</span>;
}

CodeChip.Highlight = Highlight;

export default CodeChip;
export { Highlight };
