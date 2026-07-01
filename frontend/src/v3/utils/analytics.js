export const trackEvent = (eventName, params = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...params,
  });
};

export const trackContactOpen = (source, lang) => {
  trackEvent("contact_open", {
    event_category: "lead",
    source,
    language: lang,
  });
};
