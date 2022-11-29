import React from "react";

const styles = {
  bottomPadding: {
    paddingBottom: "16rem"
  }
}

export default function Contact() {
  return(
    <section style={styles.bottomPadding}>
      <h1>Welcome to Swift Bank!</h1>
      <h2>Your personal banking app, Swiftly available, anywhere you go!</h2>
      <p>We offer a wide range of accounts and line of credit to ensure your money can be managed at the comfort of your home, just a click away! Sign up now on the signup page or log into your existing Swift Bank account to access your banking at home, or on the go! Find out more in our Contact page!</p>
    </section>
  )
}