import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import ShareButton from "./ShareButton";
import ExportButton from "./ExportButton";
import ReactionBar from "./ReactionBar";
import SuggestionSection from "./SuggestionSection";
import CommentSection from "./CommentSection";

export default function InteractiveFooter() {
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const baseUrl = "/venezuela-sa/";
  const pageSlug = pathname.replace(baseUrl, "").replace(/\/$/, "") || "home";
  const fullUrl = window.location.href;
  const title = document.title;

  return (
    <div className="vsa-interactive">
      <hr className="vsa-interactive__divider" />
      <div className="vsa-interactive__actions">
        <ShareButton title={title} url={fullUrl} />
        <ExportButton />
      </div>
      <ReactionBar pageSlug={pageSlug} />
      <SuggestionSection pageSlug={pageSlug} />
      <CommentSection pageSlug={pageSlug} />
    </div>
  );
}
