import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faShoppingCart, faSearch, faUserTie, faSocks, faTshirt, faRunning, faBars, faMapMarkerAlt, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt} from '@fortawesome/free-brands-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import DropdownMenu from '../components/DropdownMenu';
import UserNavbar from '../components/UserNavbar';
import { listProducts } from '../actions/productAction';

function NavbarScreen(props) {
  const [scrollY, setScrollY] = useState(0);
  const [locationScroll, setLocationScroll] = useState('top');

  const [searchKeyWord, setSearchKeyWord] = useState('')


  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const cartTotal = cartItems.reduce((a, c) => a + c.qty, 0);


  // const redirect = () => {
  //   if (cartItems[0]) {
  //     const firstProduct = cartItems[0];
  //     const linkRedirect = "/cart/" + firstProduct._id + "?name=" + firstProduct.name + "&color=" + firstProduct.color + "&size=" + firstProduct.size + "&qty=" + firstProduct.qty;
      
  //   }
  // }
  const openMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('open')) {
      document.querySelector('.sidebar').classList.remove('open');
    } else {
      document.querySelector('.sidebar').classList.add('open');
    }
  }
  


  const handleMouse = () => {
    const container = document.querySelector(".nav-container");
    container.addEventListener("mouseover", () => (
      setLocationScroll('top')
      ));
    container.addEventListener("mouseout", function() {
      if (scrollY > 125) {
        return setLocationScroll('bottom');
      } else {
        return setLocationScroll('top');
      }
    });
  }
  // console.log(scrollY, locationScroll);
  const distanceScroll = () => {
    setScrollY(window.pageYOffset);
    handleMouse();
    if (scrollY > 125) {
      if (locationScroll !== 'bottom') {
        setLocationScroll('bottom')
      }
    } else {
      if (locationScroll !== 'top') {
        setLocationScroll('top');
      }
    } 
  }

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts('', searchKeyWord)); // empty string in first parameter is category.
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", distanceScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", distanceScroll);
    }
  },)

  return (
    <div>
      <div className="nav-container" onScroll={distanceScroll}
      style={
        {opacity: locationScroll === "top" ? "1" : "0.6"}
      }>
        <ul className="nav-left">
          <li>
            <button onClick={openMenu} className="navbar-btn">
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
          </li>
          <li className="brand-name">
            <Link to="/" className="link">
              <img alt="logo" src="/nike-logo.png" ></img>
            </Link>
          </li>
          <li>
            <form className="search-form" onSubmit={submitHandler}>
              <input type="text" name="searchKeyWord" 
              onChange={(e) => setSearchKeyWord(e.target.value)}
              placeholder="  Tìm kiếm..." 
              ></input>
              <button type="submit" className="search-btn" >
                <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon>
              </button>
            </form>
          </li>
        </ul>

        <div className="header-links">
          <div className="links-item">
            <Link to={  /* redirect to cart depends on cartItem */
              cartItems[0] ? ("/cart/" + cartItems[0].product + "?name=" + cartItems[0].name + "&color=" + cartItems[0].color + "&size=" + cartItems[0].size + "&qty=" + cartItems[0].qty)
              : "/"
            } className="link">
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Giỏ hàng 
              <span className="cart-total">{cartTotal}</span> 
            </Link>
          </div>
          <div className="links-item">
            {
              userInfo ? (
                <UserNavbar userNavbar={userInfo.name} >
                  <DropdownMenu></DropdownMenu>
                </UserNavbar>
              ) : (
                <Link to="/signin" className="link">Đăng nhập</Link>
              )
            }
          </div>
        </div>
      </div>

      <aside className="sidebar">
        <div className="info-mobile" >
          <h4>Thông tin</h4>
          <ul>
            <li className="sidebar-item">
              <Link to="/" className="sidebar-link" onClick={openMenu}>
                <span className="sidebar-icon">
                <FontAwesomeIcon icon={faUserTie} className="icon-edit"></FontAwesomeIcon>
                </span>
                {
                  userInfo ? (
                    <span>Người dùng: {userInfo.name}</span>
                  ) : (
                    <Link to="/signin" className="link">Đăng nhập</Link>
                  )
                }
            </Link>
            </li>
            <li className="sidebar-item">
              <Link to={  /* redirect to cart depends on cartItem */
                cartItems[0] ? ("/cart/" + cartItems[0].product + "?name=" + cartItems[0].name + "&color=" + cartItems[0].color + "&size=" + cartItems[0].size + "&qty=" + cartItems[0].qty)
                : "/"
              } className="sidebar-link" onClick={openMenu}>
                <span className="sidebar-icon">
                <FontAwesomeIcon icon={faShoppingCart} className="icon-edit"></FontAwesomeIcon>
                </span>
                Giỏ hàng
                <span className="sidebar-total">{cartTotal}</span>
              </Link>
            </li>
          </ul>
        </div>
        <h4>Danh sách sản phẩm</h4>
        <ul>
          <li className="sidebar-item">
            <Link to="/categories/shoes" className="sidebar-link" onClick={openMenu}>
              <span className="sidebar-icon">
               <FontAwesomeIcon icon={faRunning} className="icon-edit"></FontAwesomeIcon>
              </span>
              Giày
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/categories/shirt" className="sidebar-link" onClick={openMenu}>
            <span className="sidebar-icon">
               <FontAwesomeIcon icon={faTshirt} className="icon-edit"></FontAwesomeIcon>
            </span>
              Áo
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/categories/pant" className="sidebar-link" onClick={openMenu}>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={faProductHunt} className="icon-edit"></FontAwesomeIcon>
              </span>
              Quần
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/categories/sock" className="sidebar-link" onClick={openMenu}>
              <span className="sidebar-icon">
               <FontAwesomeIcon icon={faSocks} className="icon-edit"></FontAwesomeIcon>
              </span>
              Tất
            </Link>
          </li>
        </ul>
        <h4>Danh mục khác</h4>
        <ul>
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <span className="sidebar-icon">
               <FontAwesomeIcon icon={faBookReader} className="icon-edit"></FontAwesomeIcon>
              </span>
              Chính sách mua hàng
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="#address" className="sidebar-link">
              <span className="sidebar-icon">
               <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-edit"></FontAwesomeIcon>
              </span>
              Địa chỉ cửa hàng
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default NavbarScreen;