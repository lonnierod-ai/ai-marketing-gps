// Shared settings for the homepage intro (src/components/HomeIntro.tsx).

export const INTRO_STORAGE_KEY = "aithello-intro";

// Set on <html> whenever the intro must not show; globals.css hides the
// overlay while it is present, so skipped visits never see a flash of it.
export const INTRO_SKIP_ATTR = "data-intro-skip";

// Matches the gate in globals.css ("Home intro")
export const INTRO_PLAY_QUERY =
  "(min-width: 990px) and (prefers-reduced-motion: no-preference)";

/**
 * Runs in <head> before the first paint on every full page load.
 * The first page of a browser session decides: if it is "/", the intro is
 * left "pending" for HomeIntro to play; otherwise the session is marked
 * "skip" and the intro never plays. If storage is blocked, it skips.
 */
export const INTRO_HEAD_SCRIPT = `(function(){var d=document.documentElement;try{var s=window.sessionStorage,k=${JSON.stringify(
  INTRO_STORAGE_KEY
)};if(s.getItem(k)===null){s.setItem(k,location.pathname==="/"?"pending":"skip")}if(s.getItem(k)!=="pending"){d.setAttribute(${JSON.stringify(
  INTRO_SKIP_ATTR
)},"")}}catch(e){d.setAttribute(${JSON.stringify(INTRO_SKIP_ATTR)},"")}})();`;
