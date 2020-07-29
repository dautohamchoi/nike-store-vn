import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faAddressBook, faTshirt, faUserTie, faUserEdit, faUserLock, faTasks, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './dropdownMenu.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userAction';

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  function calcHeight(element) {
    const height = element.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <div  className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)} >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        
      </div>
    );
  }

  function ProfileItem(props) {
    return (
      <div className="profile-item">
        <h4>Tên: {userInfo.name}</h4>
        <h5>Email: {userInfo.email}</h5>
        <h5>Quyền hạn: {
          userInfo.isAdmin ? "Quản lý viên" : "Thành viên"
          } 
        </h5>
      </div>
    );
  }

  function LogOut(props) {
    const dispatch = useDispatch();

    const signOut = () => {
      dispatch(logout());
      window.location.reload(false);
    }


    return (
      <div  className="menu-item" onClick={signOut} >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </div>
    )
  }


  return (
    <div className="dropdown" style={{ height: menuHeight}} >

        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          onEnter={calcHeight}
          unmountOnExit
          >
          <div className="menu">
            <DropdownItem
              goToMenu='profile'
              leftIcon={<FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>}
              >Thông tin cá nhân</DropdownItem>
            {
              userInfo.isAdmin && 
              <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faTasks}></FontAwesomeIcon>}
              goToMenu='management'
              >
                Quản lý
              </DropdownItem>
            }
            <LogOut
              leftIcon={<FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>}
              >
              <Link to="/" className="link-fullwidth">Đăng xuất</Link>
              </LogOut>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'profile'}
          timeout={500}
          classNames="menu-secondary"
          onEnter={calcHeight}
          unmountOnExit
          >
          <div className="menu">
            <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>}
              goToMenu='main'
              ></DropdownItem>
            <ProfileItem></ProfileItem>
            <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon>}
              >
                <Link to="/profile" className="link-fullwidth" >Chỉnh sửa thông tin</Link>
              </DropdownItem> 
            <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faUserLock}></FontAwesomeIcon>}
              >
                <Link to="/profile" className="link-fullwidth" >Thay đổi mật khẩu</Link>
              </DropdownItem> 
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'management'}
          timeout={500}
          classNames="menu-secondary"
          onEnter={calcHeight}
          unmountOnExit
          >
          <div className="menu">
            <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>}
              goToMenu='main'
              ></DropdownItem>
            <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>}
              >
              Quản lý thành viên</DropdownItem> 
            <DropdownItem 
              leftIcon={<FontAwesomeIcon icon={faTshirt}></FontAwesomeIcon>}
              >
                <Link to="/products" className="link-fullwidth" >Quản lý sản phẩm</Link>
              </DropdownItem> 
          </div>
        </CSSTransition>



    </div>
  )
}



export default DropdownMenu;