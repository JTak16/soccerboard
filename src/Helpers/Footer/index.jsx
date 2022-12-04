import style from "./Footer.module.scss";

const Footer = ({ version }) => {
  return (
    <>
      <footer className={style.footercontainer}>
        <div className={style.appversion}>API Version: {version}</div>
      </footer>
    </>
  );
};

export default Footer;
