import Image from "next/image";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import GamePlayer from "./Preview";
import PlayIcon from "../assets/svgs/play-solid.svg";
import GooglePlay from "../assets/svgs/google-play.svg";
import AppStore from "../assets/svgs/app-store.svg";
import { getGameUrl } from "../utils/operators";

const INVENTORY_URL =
  "https://pz-static-public.s3.us-east-2.amazonaws.com/inventory.json";

export default function GameChannel({ appID, onClickSave }) {
  const [isLoading, setIsLoading] = useState(true);
  const [modalShown, setModalShown] = useState(false);
  const [app, setApp] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [modalStatus, setModalStatus] = useState("neutral");
  const [hideSaveButton, setHideSaveButton] = useState(false);

  useEffect(() => {
    const getAppData = async () => {
      try {
        const result = await fetch(INVENTORY_URL);
        const data = await result.json();
        const find = (data?.data || []).find((i) => i.app_code === appID);
        setApp(find);
      } catch (e) {
        setError(e.toString());
      } finally {
        setIsLoading(false);
      }
    };
    getAppData();
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // hide the button.
      setHideSaveButton(true);
    }
  }, [appID]);

  const onPlayGame = () => {
    setPlaying(true);
  };

  const onClosePlayer = () => {
    setPlaying(false);
  };

  const onClickPlatform = () => {
    setModalShown(true);
  };

  const onCloseModal = () => {
    setModalShown(false);
    setModalStatus("neutral");
  };

  const onSend = () => {
    setModalStatus("loading");
    setTimeout(() => {
      setModalStatus("sent");
    }, 2000);
  };

  if (isLoading) return <div className="simple-spinner" />;
  if (!isLoading && !app) return <p className="invalid-app">App not found</p>;

  const renderChannel = () => {
    if (app.orientation === "horizontal") {
      return (
        <div className={`channel-horizontal`}>
          <div
            className={`game-player-wrapper`}
            style={{ backgroundImage: `url('${app.screen_shot_url}')` }}
          >
            {playing && (
              <GamePlayer
                url={getGameUrl(app.app_code)}
                onClose={onClosePlayer}
              />
            )}
            {!playing && (
              <div className="game-player-button">
                <Image
                  src={PlayIcon}
                  width={30}
                  height={30}
                  alt="play-game-icon"
                  onClick={onPlayGame}
                />
              </div>
            )}
          </div>
          <div className="game-info">
            <div className="game-info-main">
              <div
                className={`game-icon`}
                style={{ backgroundImage: `url('${app.app_icon}')` }}
              />
              <p>{app.title}</p>
            </div>
            {!hideSaveButton && (
              <button className="save-game-button" onClick={onClickSave}>
                Save Game
              </button>
            )}

            <div className="game-version">
              <div className="game-download-button">
                <Image
                  src={GooglePlay}
                  className="platform"
                  alt="google-play-button"
                  onClick={onClickPlatform}
                />
              </div>
              <div className="game-download-button">
                <Image
                  src={AppStore}
                  className="platform"
                  alt="app-store-button"
                  onClick={onClickPlatform}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`channel-vertical`}>
        <div className="top">
          <div className="game-player-container">
            <div
              className={`game-player-wrapper`}
              style={{ backgroundImage: `url('${app.screen_shot_url}')` }}
            >
              {playing && (
                <GamePlayer
                  url={getGameUrl(app.app_code)}
                  onClose={onClosePlayer}
                />
              )}
              {!playing && (
                <div className="game-player-button">
                  <Image
                    src={PlayIcon}
                    width={30}
                    height={30}
                    alt="play-game-icon"
                    onClick={onPlayGame}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="desktop-save-game">
            {!hideSaveButton && (
              <button className="save-game-button" onClick={onClickSave}>
                Save Game
              </button>
            )}
            <div className="game-version">
              <div className="game-download-button">
                <Image
                  src={GooglePlay}
                  className="platform"
                  alt="google-play-button"
                  onClick={onClickPlatform}
                />
              </div>
              <div className="game-download-button">
                <Image
                  src={AppStore}
                  className="platform"
                  alt="app-store-button"
                  onClick={onClickPlatform}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="game-info-main">
          <div
            className={`game-icon`}
            style={{ backgroundImage: `url('${app.app_icon}')` }}
          />
          <p>{app.title}</p>
        </div>
        <div className="mobile-save-game">
          {!hideSaveButton && (
            <button className="save-game-button" onClick={onClickSave}>
              Save Game
            </button>
          )}
          <div className="game-version">
            <div className="game-download-button">
              <Image
                src={GooglePlay}
                alt="google-play-button"
                onClick={onClickPlatform}
              />
            </div>
            <div className="game-download-button">
              <Image
                src={AppStore}
                alt="app-store-button"
                onClick={onClickPlatform}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <div className="modal-wrapper">
        <div className="modal-box">
          {modalStatus === "neutral" && (
            <>
              <span className="title">Get The Mobile Version</span>
              <input placeholder="Phone Number or Email Address" />
              <div className="buttons">
                <button className="close" onClick={onCloseModal}>
                  Close
                </button>
                <button className="send" onClick={onSend}>
                  Send
                </button>
              </div>
              <p className="privacy">Gamechannel.io Privacy Policy</p>
            </>
          )}
          {modalStatus === "loading" && <div className="simple-spinner" />}
          {modalStatus === "sent" && (
            <>
              <span className="title">Thank You</span>
              <span className="success">
                Beat The Assistant to the Regional Manager has been sent to you.
              </span>
              <button className="send" onClick={onCloseModal}>
                Close
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="channel-wrapper">
      <Head>
        <title>{app?.title || "Untitled"}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href={`/game/${app.app_code}/favicon.ico`}
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href={`/game/${app.app_code}/192.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/game/${app.app_code}/16.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/game/${app.app_code}/32.png`}
        />
        <link rel="manifest" href={`/manifest${app.app_code || ""}.json`} />
      </Head>
      {renderChannel()}
      {modalShown && renderModal()}
    </div>
  );
}
