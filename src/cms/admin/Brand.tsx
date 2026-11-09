function Mark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="sp-mark"
    >
      <rect width="32" height="32" rx="9" className="sp-mark__bg" />
      <path
        d="M7 19.5c2.6 0 4-1.6 5.5-3.4C14.4 13.8 16.4 11 21 11c2 0 3.4.6 4.5 1.4-1.6-.2-3 .4-3.9 1.6l-2.4 3.2c-1.6 2.1-3.7 3.3-6.7 3.3H7Z"
        className="sp-mark__bird"
      />
      <path d="M8 23.5h16" strokeWidth="1.6" strokeLinecap="round" className="sp-mark__shore" />
      <circle cx="21.6" cy="13.3" r="0.9" className="sp-mark__eye" />
    </svg>
  );
}

/** Login + create-first-user screen. */
export function Logo() {
  return (
    <div className="sp-logo">
      <Mark size={44} />
      <div>
        <div className="sp-logo__name">Sandpiper</div>
        <div className="sp-logo__sub">Content studio</div>
      </div>
    </div>
  );
}

/** Nav + browser-tab icon. */
export function Icon() {
  return <Mark size={28} />;
}
