import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "../assets/svgs/close-solid.svg";

export default function GamePlayer({ url, onClose }) {
  const [loading, setLoading] = useState(true);

  const onLoadedGame = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="game-player">
      <object
        className="game-player-main"
        data={url}
        onLoad={onLoadedGame}
      ></object>
      {loading && (
        <div className="loading-container">
          <div className="simple-spinner" />
        </div>
      )}
      {!loading && (
        <div className="close-wrapper" onClick={onClose}>
          <Image
            src={CloseIcon}
            alt="close-game-player"
            width={30}
            height={30}
          />
        </div>
      )}
    </div>
  );
}
