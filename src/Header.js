import { ThemeContext } from "./contexts/ThemeContext";
import { useContext } from "react";

function Header() {

    const {theme} = useContext(ThemeContext);
    return (
      <div className="padT4 padB4">
        <div className="container mobile-container">
          <div className="d-flex justify-content-between">
            <div>
              { <img alt="Movie Logo" src={require('./images/movie_logo.png')} width='100px' /> }
            </div>
            <div className={theme === 'light'?'':'text-info'}>
              <h4 className="header-title">CineSphere: Your Ultimate Movie Oasis</h4>
            </div>
            <div className={theme === 'light'? '':'text-info'}>
              {/* Hello Srividya &nbsp;&nbsp; */}
              {/* <span>
                <a href="#">sign-out</a>
              </span> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Header;
  