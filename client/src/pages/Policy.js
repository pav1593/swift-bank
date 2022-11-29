import React from "react";

const styles = {
  finePrint: {
    fontSize: "0.4rem"
  },
  bottomPadding: {
    paddingBottom: "16rem"
  }
}

export default function Policy() {
  return(
    <section style={styles.bottomPadding}>
      <h2>Our Policy</h2>
      <p>
        Welcome to Swift Bank! Our policy is to make your transactions swift and easy!
      </p>
      <p style={styles.finePrint}>
        Our product does not protect against natural disasters including earthquakes, tsunamis, typhoons, torrential downpour, Australia, volcanic erruptions, ENV's, PHP's, HTML's, PTSD, please speak to your pediatrician to see if Swift bank is right for you.
      </p>
    </section>
  )
}