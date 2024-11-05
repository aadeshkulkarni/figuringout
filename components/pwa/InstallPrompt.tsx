//@ts-nocheck

"use client";
import { FastForward } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  useEffect(() => {
    if (window) {
      let deferredPrompt;
      window.addEventListener("beforeinstallprompt", (e) => {
        deferredPrompt = e;
      });

      const installApp = document.getElementById("installApp");
      installApp.addEventListener("click", async () => {
        console.log("Executed!");
        if (deferredPrompt !== null) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === "accepted") {
            deferredPrompt = null;
          }
        }
      });
    }
  }, [window]);

  return (
    <>
      <Button className="w-full mt-8" id="installApp">
        Install App <FastForward />
      </Button>
      {isIOS && (
        <p className="pt-4 text-sm">
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </>
  );
}
