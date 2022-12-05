import React from "react";

const styles = {
  footer: {
    background: "#2c3437",
    color: "gray", 
    position: "fixed", 
    bottom: 0,
    width: '100%',
    height: '15%'
  }
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <br/>
      <center>Copyright @ 2022 Swift Bank...</center>
    </footer>
  );

  
}