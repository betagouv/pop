import React from "react";
import Link from "next/link";
import "./Logo.css";

const Logo = () => {
  return (
    <Link prefetch href="/">
    <a className="logo">
      <img src="/static/logo.png" alt="Logo" className="md" />
      <h1>Ministère de la Culture</h1>
      </a>
    </Link>
  );
};

export default Logo;
