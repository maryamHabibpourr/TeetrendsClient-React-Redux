import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectUserName,
  selectIsLoggedIn,
} from "../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { selectCartItems } from "../../redux/slice/cartSlice";
//assets
import person from "../../assets/person.png";
import cart from "../../assets/cart.png";
//helper
import { shortenText } from "../../components/config/helpers";
//antDesign
import { LogoutOutlined } from "@ant-design/icons";
import { message } from "antd";
//style
import styles from "./Header.module.scss";
//icons
import {
  CaretDownOutlined,
  UserOutlined,
  LoginOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { ImHome3 } from "react-icons/im";
//icon
import { BsPlus } from "react-icons/bs";
import { MdOutlineMapsHomeWork, MdRealEstateAgent } from "react-icons/md";
import { CgMenu, CgClose } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { CgChevronRight } from "react-icons/cg";
import { MdTransitEnterexit } from "react-icons/md";
import { BiSolidExit } from "react-icons/bi";
import { RiUserSettingsFill } from "react-icons/ri";
import { FiArrowUpLeft } from "react-icons/fi";
import { BiSolidStore } from "react-icons/bi";
import { SiGotomeeting } from "react-icons/si";

//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";

function Header() {
  const userName = useSelector(selectUserName);
  const userIsLogged = useSelector(selectIsLoggedIn);
  const userToken = useSelector(selectToken);
  const cartItems = useSelector(selectCartItems);
  const numberOfItems = cartItems.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openMessage, setOpenMessage] = useState(false);
  const [scrollpage, setScrollPage] = useState(false);
  const [openHambergureMenu, setOpenHambergureMenu] = useState(false);

  // setting open and close hamburgure menu##############################
  const openHamburgureMenu = () => {
    setOpenHambergureMenu((current) => !current);
  };

  const hamMenuIcon = (
    <CgMenu className={styles.HamburIcon} onClick={openHamburgureMenu} />
  );

  const closehamMenuIcon = (
    <CgClose className={styles.CloseMenuSiteHam} onClick={openHamburgureMenu} />
  );

  //setting for sub menu
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "با موفقیت خارج شدید!",
    });
  };

  //setting logout
  async function HandleLogout() {
    const confirmLogout = window.confirm("مطمئنید که می خواهید خارج شوید؟");
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          "https://api.teetrends.ir/api-auth-djoser/token/logout/",
          userToken,
          {
            headers: { Authorization: "Token ".concat(userToken) },
          }
        );
        console.log(response);
        dispatch(REMOVE_ACTIVE_USER());
        localStorage.removeItem("theUserusename");
        localStorage.removeItem("theUserEmail");
        localStorage.removeItem("theUserId");
        localStorage.removeItem("theUserToken");
        localStorage.removeItem("allProducts");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("theCartId");
        setOpenMessage(true);
      } catch (e) {
        console.log(e.response);
      }
    }
  }

  //SETTING FOR message
  useEffect(() => {
    if (openMessage) {
      success();
      setTimeout(() => {
        navigate(0);
      }, 1500);
    }
  }, [openMessage]);

  //setting active tab
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  // fix navbar
  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  return (
    <header className={scrollpage ? `${styles.fixed}` : null}>
      {contextHolder}
      <div className={styles.header}>
        <div className={styles.headerLinks}>
          <NavLink to="/" className={activeLink}>
            <ImHome3 size={18} />
          </NavLink>
          <NavLink to="/products" className={activeLink}>
            فروشگاه
          </NavLink>
        </div>

        <div className={styles.headerOptions}>
          <div className={styles.cartContainer}>
            <span>{digitsEnToFa(numberOfItems)}</span>
            <img onClick={() => navigate("/cart")} src={cart} alt="cart" />
          </div>
          <div className={styles.headerUsers}>
            <div className={styles.user}>
              <span>
                {userIsLogged ? <h1>{shortenText(userName, 7)}</h1> : ""}
              </span>
              <img src={person} alt="person" />
            </div>

            <div
              className={styles.arrowMenu}
              onMouseEnter={toggleSubMenu}
              onMouseLeave={toggleSubMenu}
            >
              <CaretDownOutlined className={styles.arrowIcon} />
              {subMenuOpen && (
                <div>
                  <ul>
                    <li onClick={() => navigate("/profile")}>
                      پروفایل کاربری
                      <UserOutlined style={{ marginRight: "2px" }} />
                    </li>
                    {userIsLogged ? (
                      <li onClick={HandleLogout}>
                        خروج
                        <LogoutOutlined style={{ marginRight: "2px" }} />
                      </li>
                    ) : (
                      <>
                        <li onClick={() => navigate("/login")}>
                          ورود
                          <LoginOutlined style={{ marginRight: "2px" }} />
                        </li>
                        <li onClick={() => navigate("/register")}>
                          ثبت نام
                          <KeyOutlined style={{ marginRight: "2px" }} />
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            {hamMenuIcon}
            {openHambergureMenu && (
              <div
                onClick={openHamburgureMenu}
                className={
                  openHambergureMenu
                    ? `${styles.appMobileContainer}  ${styles.bottomDetail}`
                    : `${styles.appMobileContainer} ${styles.bottomClose}`
                }
              >
                <div className={styles.appMobileContainerToyota}>
                  {userIsLogged ? (
                    <>
                      <p>{shortenText(userName, 7)}</p>

                      <div onClick={HandleLogout}>
                        خروج
                        <MdTransitEnterexit size={23} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div onClick={() => navigate("/register")}>
                        ثبت نام
                        <FiArrowUpLeft size={20} />
                      </div>
                      <div onClick={() => navigate("/login")}>
                        ورود
                        <FiArrowUpLeft size={20} />
                      </div>
                    </>
                  )}
                  <div onClick={() => navigate("/profile")}>
                    تنظیمات حساب کاربری
                    <RiUserSettingsFill size={23} />
                  </div>

                  <div onClick={() => navigate("/cart")}>
                    سبد خرید
                    <span style={{ color: "red" }}>{numberOfItems}</span>
                  </div>

                  <div onClick={() => navigate("/products")}>
                    فروشگاه
                    <BiSolidStore size={20} />
                  </div>

                  <div onClick={() => navigate("/")}>
                    خانه <ImHome3 size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
