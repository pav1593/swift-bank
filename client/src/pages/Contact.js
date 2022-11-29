import React from "react";

const styles = {
  bottomPadding: {
    paddingBottom: "16rem"
  }
}

export default function Contact() {
  return(
    <section style={styles.bottomPadding}>
      <h2>Contact us</h2>
      <ul>
        <li>Email: not_a_real_email@hmail.com</li>
        <li>Phone: +1-416-420-6969</li>
      </ul>
    </section>
  )
}