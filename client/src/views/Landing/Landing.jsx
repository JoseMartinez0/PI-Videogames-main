import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import backgroundImg from "./backgroundImg/videoGames.jpeg";

const Landing = () => {
  return (
    <div className={style.container}>
      <img src={backgroundImg} alt="" />
      <div className={style.content}>
        <h1 className={style.title}>Welcome</h1>
        <button>
          <Link to="/home" className={style.link}>
            Go Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
