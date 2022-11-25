import React from "react";

const styles = {
  footer: {
    background: "#2c3437",
  }
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>Created in November 2022</p>
      <br/>
      <p>Contact us <a href="#">here</a>!</p>
    </footer>
  );
}