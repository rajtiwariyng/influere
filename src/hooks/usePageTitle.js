import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const base = "iCollaborate";
    document.title = title ? `${base} | ${title}` : base;
  }, [title]);
};

export default usePageTitle;
