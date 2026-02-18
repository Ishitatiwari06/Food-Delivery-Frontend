import React from "react";

const Footer = () => {
  return (
    <footer style={{
      background: "#222",
      color: "#fff",
      textAlign: "center",
      padding: "1rem 0",
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%"
    }}>
      <span>© {new Date().getFullYear()} Food Delivery App</span>
      <span style={{ marginLeft: 16 }}>
        <a
          href="https://github.com/Ishitatiwari06/Food-Delivery-Frontend"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          GitHub
        </a>
      </span>
    </footer>
  );
};

export default Footer;
