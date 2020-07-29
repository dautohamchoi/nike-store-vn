import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';



function UserNavbar(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-item"  >
      <span onClick={() => setOpen(!open)}>
          {props.userNavbar}
          <span className="nav-item-icon"><FontAwesomeIcon icon={faCaretSquareDown}></FontAwesomeIcon></span>
      </span>
      
      { open && props.children }
    </div>
  )
}

export default UserNavbar;