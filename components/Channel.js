import Image from "next/image";
import React, { useState, useEffect } from "react";
import GamePlayer from "./Preview";
import ShareTab from "./ShareTab";
import PlayIcon from "../assets/svgs/play-solid.svg";

const INVENTORY_URL =
  "https://pz-static-public.s3.us-east-2.amazonaws.com/inventory.json";

export default function GameChannel({ appID, onClickSave }) {
  const [isLoading, setIsLoading] = useState(true);
  const [modalShown, setModalShown] = useState(false);
  const [app, setApp] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [modalStatus, setModalStatus] = useState("neutral");

  useEffect(() => {
    const getAppData = async () => {
      try {
        const result = await fetch(INVENTORY_URL);
        const data = await result.json();
        console.log({ data, appID });
        const find = (data?.data || []).find((i) => i.app_id === appID);
        console.log({ find });
        setApp(find);
      } catch (e) {
        setError(e.toString());
      } finally {
        setIsLoading(false);
      }
    };
    getAppData();
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
    console.log("Send");
    setModalStatus("loading");
    setTimeout(() => {
      setModalStatus("sent");
    }, 2000);
  };

  if (isLoading) return <div className="simple-spinner" />;
  if (!isLoading && !app) return <p>Invalid app id</p>;

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
                url="https://app.parallelz.com/?app=btb&auth=jeuvyiph1"
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
            <button className="save-game-button" onClick={onClickSave}>
              Save Game
            </button>
            <div className="game-version">
              <p>
                Mobile Version{" "}
                <span className="platform" onClick={onClickPlatform}>
                  Apple
                </span>{" "}
                |{" "}
                <span className="platform" onClick={onClickPlatform}>
                  Google
                </span>
              </p>
            </div>
          </div>
          {/* <ShareTab align="right" /> */}
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
                  url="https://app.parallelz.com/?app=btb&auth=jeuvyiph1"
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
            <button className="save-game-button" onClick={onSaveGame}>
              Save Game
            </button>
            <div className="game-version">
              <p>
                Mobile Version <span className="platform">Apple</span> |{" "}
                <span className="platform">Google</span>
              </p>
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
          <button className="save-game-button" onClick={onSaveGame}>
            Save Game
          </button>
          <div className="game-version">
            <p>
              Mobile Version <span className="platform">Apple</span> |{" "}
              <span className="platform">Google</span>
            </p>
          </div>
        </div>
        {/* <ShareTab align="left" /> */}
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
    <div style={{ paddingLeft: 50 }}>
      {renderChannel()}
      {modalShown && renderModal()}
    </div>
  );
}
