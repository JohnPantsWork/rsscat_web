import icon from '../assets/images/icon.jpg';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const Header = ({ loginState }) => {
    const backhome = () => {
        window.location.href = '/';
    };

    const logout = async () => {
        localStorage.setItem('missionData', null);
        await axios({
            withCredentials: true,
            method: 'POST',
            url: REACT_APP_HOST + `/api/1.0/user/signout`,
        });
    };
    return (
        <div className="header">
            <div className="headerBox">
                <div>
                    <img className="icon" src={icon} alt="rsscat" onClick={backhome} />
                    <h1 onClick={backhome}>RSSCAT.net</h1>
                </div>
                <nav>
                    <ul>
                        {loginState ? (
                            <li>
                                <a href="/sign" onClick={logout}>
                                    登出
                                </a>
                            </li>
                        ) : (
                            <li>
                                <a href="/sign">登入</a>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
