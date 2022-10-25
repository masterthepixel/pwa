import React from "react";
import Image from "next/image";
import Logo from "../assets/svgs/logo.svg";

export default function Header() {
  return (
    <div className="header">
      <Image src={Logo} alt="logo" />
    </div>
  );
}
