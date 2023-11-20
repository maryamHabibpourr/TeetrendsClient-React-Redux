import React from "react";
//date
import moment from "jalali-moment";
//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";
//styles
import styles from "./Footer.module.scss";
//media icon
import twitter from "../../assets/twitter.png";
import whatsApp from "../../assets/whatsApp.png";
const year = moment().locale("fa").format("YYYY").toString();

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.rightSide}>
        <img
          src={twitter}
          alt="twitter"
          style={{
            width: "25px",
            height: "25px",
            marginLeft: "5px",
            cursor: "pointer",
          }}
        />
        <img
          src={whatsApp}
          alt="whatsapp"
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        />
      </div>
      <div className={styles.leftSide}>
        <p className={styles.year}>
          &copy;{digitsEnToFa(year)} تمامی حقوق برای تی تریندز محفوظ است.
        </p>
      </div>
    </div>
  );
}

export default Footer;
