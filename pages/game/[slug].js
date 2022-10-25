import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import GameChannel from "../../components/Channel";
import Header from "../../components/Header";

export default function Home() {
  const router = useRouter();
  const { slug } = router.query;
  const deferredPrompt = useRef(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      deferredPrompt.current = e;
    });
    return () => {
      window.removeEventListener("beforeinstallprompt", (e) => {
        deferredPrompt.current = e;
      });
    };
  }, []);

  const onClickSave = async () => {
    if (deferredPrompt.current !== null) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        deferredPrompt.current = null;
      }
    }
  };

  return (
    <div className="container">
      <main>
        <Header />
        <GameChannel appID={slug} onClickSave={onClickSave} />
      </main>
    </div>
  );
}
