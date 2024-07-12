import React from 'react'
import styles from "./Footer.module.scss";
import FooterLogo from "../../assets/Footer_Logo.png";
import VCru from "../../assets/vc.ru_Footer.png";
const Footer = () => {
  return (
    <footer>
    <div className={styles.about}>
      <img src={FooterLogo} alt="Footer BIA Logo" />
      <nav>
        <ul>
          <li>
            <a href="#">Политика конфиденциальности</a>
          </li>
          <li>
            <a href="#">О компании</a>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
        </ul>
      </nav>
    </div>
    <div className={styles.links}>
      <p>© 2024 BIA All Rights Reserved.</p>

      <ul>
        <li>
          <a href="#">
            <i className="fa fa-vk"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-youtube"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-telegram"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={VCru} alt="VC.ru Logo" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
  )
}

export default Footer