import { useEffect, useState } from "react";
import { useMixpanel } from "react-mixpanel-browser";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import MainView from "./components/MainView";
import PwaView from "./components/PwaView";
import useSanity from "./shared/hooks/useSanity";

export default function App() {
  const { data } = useSanity("pwaLink");
  const [view, setView] = useState("main");
  const [isPWAActive, setIsPWAActive] = useState(false);
  const mixpanel = useMixpanel();

  useEffect(() => {
    const isPWAActivated = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    setIsPWAActive(isPWAActivated);

    if (/FBA[NV]/.test(navigator.userAgent)) {
      if (mixpanel) {
        mixpanel.track("landing_page_facebook_browser_open");
      }
      const intentUrl = `intent://${window.location.hostname}${
        window.location.pathname
      }${
        window.location.search
      }#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        window.location.href
      )};end`;
      if (mixpanel) {
        mixpanel.track("landing_page_facebook_browser_redirect");
      }
      window.location.href = intentUrl;
    }
  }, [mixpanel]);

  useEffect(() => {
    if (data) {
      const distinct_id = uuidv4();
      if (mixpanel) {
        mixpanel.identify(distinct_id);
      }

      setTimeout(() => {
        const searchParams = new URLSearchParams(window.location.search);

        let newPwaLink = data.pwaLink;
        let pixelId: string | null = "271703779025687";

        const fbc = Cookies.get("_fbc");
        const fbp = Cookies.get("_fbp");

        if (searchParams.has("idpixel") || searchParams.has("sub_id_7")) {
          pixelId = searchParams.has("idpixel")
            ? searchParams.get("idpixel")
            : searchParams.get("sub_id_7");
          newPwaLink += `?sub_id_7=${pixelId}`;
        } else {
          newPwaLink += `?sub_id_7=${pixelId}`;
        }

        if (fbp && fbc) {
          newPwaLink += `${
            newPwaLink.includes("?") ? "&" : "?"
          }sub_id_8=${fbp}&sub_id_9=${fbc}`;
        }

        searchParams.forEach((value, key) => {
          if (key !== "idpixel" && key !== "sub_id_7") {
            newPwaLink += `${
              newPwaLink.includes("?") ? "&" : "?"
            }${key}=${value}`;
          }
        });

        const pwaLink = localStorage.getItem("pwaLink");
        if (!pwaLink) {
          localStorage.setItem("pwaLink", newPwaLink);
        }

        const trackFirstOpen = () => {
          if (
            !localStorage.getItem("landing_page_firstOpen_tracked") &&
            mixpanel
          ) {
            const params = Object.fromEntries(searchParams);
            params["domain"] = window.location.hostname;
            params["startURL"] = window.location.href;
            params["pwaLink"] = newPwaLink;
            mixpanel.track("landing_page_firstOpen", {
              ...params,
            });
            localStorage.setItem("landing_page_firstOpen_tracked", "true");
          }
        };

        if (mixpanel) {
          mixpanel.register({
            fbc: `${fbc}`,
            fbp: `${fbp}`,
            pwaLink: `${newPwaLink}`,
          });
        }
        if (!/FBA[NV]/.test(navigator.userAgent)) {
          trackFirstOpen();
        }
      }, 3000);
    }
  }, [mixpanel, data]);

  let currentView;

  switch (view) {
    case "main":
      currentView = <MainView setView={setView} />;
      break;
  }

  return isPWAActive ? <PwaView /> : <>{currentView}</>;
}
