import React from "react";
import Image from "next/image";
import Facebook from "../assets/images/facebook.png";
import Messenger from "../assets/images/messenger.png";
import Twitter from "../assets/images/twitter.png";
import Link from "../assets/images/link.png";
import WhatsApp from "../assets/images/whatsapp.png";
import Crown from "../assets/images/crown.png";

export default function ShareTab({ align }) {
  const onPressFacebook = () => {};
  const onPressMessenger = () => {};
  const onPressTwitter = () => {};
  const onPressLink = () => {};
  const onPressWhatsApp = () => {};
  const onPressCrown = () => {};
  return (
    <div className={`share-tab-${align || "left"}`}>
      <Image src={Facebook} alt="facebook" onClick={onPressFacebook} />
      <Image src={Messenger} alt="messenger" onClick={onPressMessenger} />
      <Image src={Twitter} alt="twitter" onClick={onPressTwitter} />
      <Image src={Link} alt="link" onClick={onPressLink} />
      <Image src={WhatsApp} alt="whatsapp" onClick={onPressWhatsApp} />
      <Image src={Crown} alt="crown" onClick={onPressCrown} />
    </div>
  );
}
