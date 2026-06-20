import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

// Tracking de capítulo activo via IntersectionObserver con banda central:
// el capítulo que ocupa el centro del viewport es el activo. Cero JS por frame.
const ChapterContext = createContext({ active: "00", register: () => {} });

export const ChapterProvider = ({ children }) => {
  const [active, setActive] = useState("00");
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.dataset.chapter) {
            setActive(e.target.dataset.chapter);
          }
        }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  const register = useCallback((el) => {
    if (el && observerRef.current) observerRef.current.observe(el);
  }, []);

  return (
    <ChapterContext.Provider value={{ active, register }}>
      {children}
    </ChapterContext.Provider>
  );
};

export const useActiveChapter = () => useContext(ChapterContext).active;
export const useChapterRegister = () => useContext(ChapterContext).register;
