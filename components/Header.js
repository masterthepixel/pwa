import React from "react";
import Image from "next/image";
import Logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <div className="header">
      <Image src={Logo} alt="logo" />
    </div>
  );
}
