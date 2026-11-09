/** Top-bar actions (rendered by Payload in `.app-header__actions`). */
export function HeaderActions() {
  return (
    <a className="sp-header-action" href="/" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span>View site</span>
    </a>
  );
}
