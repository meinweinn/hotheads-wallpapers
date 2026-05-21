import type { NextPage } from "next";
import { useCallback, useEffect } from "react";

const TWEET_TEXT =
  "dream me\nhttps://x.com/hotheadsnft/status/2057492220756857268";
const WEB_INTENT_URL =
  "https://x.com/intent/post?text=dream%20me%0Ahttps%3A%2F%2Fx.com%2Fhotheadsnft%2Fstatus%2F2057492220756857268";
const APP_INTENT_URL = `twitter://post?message=${encodeURIComponent(
  TWEET_TEXT
)}`;
const ANDROID_INTENT_URL = `intent://post?message=${encodeURIComponent(
  TWEET_TEXT
)}#Intent;scheme=twitter;package=com.twitter.android;S.browser_fallback_url=${encodeURIComponent(
  WEB_INTENT_URL
)};end`;

const DreamYou: NextPage = () => {
  const openX = useCallback(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    let shouldFallback = true;

    const cancelFallback = () => {
      shouldFallback = false;
    };

    window.addEventListener("pagehide", cancelFallback, { once: true });
    document.addEventListener("visibilitychange", cancelFallback, {
      once: true,
    });

    window.location.href = isAndroid ? ANDROID_INTENT_URL : APP_INTENT_URL;

    window.setTimeout(() => {
      if (shouldFallback && document.visibilityState === "visible") {
        window.location.href = WEB_INTENT_URL;
      }
    }, 1600);
  }, []);

  useEffect(() => {
    openX();
  }, [openX]);

  return (
    <main className="min-h-screen bg-main bg-cover bg-fixed bg-custom-black text-gray-100 font-primary flex flex-col items-center justify-center gap-6 px-6 text-center">
      <button
        type="button"
        className="bg-button bg-cover w-[171.5px] h-[56px] text-xs uppercase opacity-80 hover:opacity-100 transition-opacity"
        onClick={openX}
      >
        dream you.
      </button>
      <a
        className="text-xs text-custom-light-red underline underline-offset-4"
        href={WEB_INTENT_URL}
      >
        Continue in browser
      </a>
    </main>
  );
};

export default DreamYou;
