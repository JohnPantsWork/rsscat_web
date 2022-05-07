import icon from '../assets/images/icon.jpg';

const Header = () => {
  const backhome = () => {
    window.location.href = '/';
  };
  return (
    <div className="header">
      <div className="headerBox">
        <div>
          <img className="icon" src={icon} alt="rsscat" onClick={backhome} />
          <h1 onClick={backhome}>RSSCAT</h1>
          <div className="searchBar">
            <input type="text" placeholder="search..."></input>
          </div>
        </div>
        <nav>
          <ul>
            <li className="signin">
              <a href="/sign">登入</a>
            </li>
            <li className="signup">
              <a href="/sign">免費註冊</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
