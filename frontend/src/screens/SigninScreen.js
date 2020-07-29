import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin, signup } from '../actions/userAction';
import { PulseLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
  display: block;
  margin: 1rem 1rem;
`;




function SigninScreen(props) {
  // sign in 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  // sign up
  const [name, setName] = useState('');
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setRenewPassword] = useState('');

  const redirect = props.location.search 
              ? props.location.search.split('=')[1]
              : '/';  

  const userSignup = useSelector(state => state.userSignup)
  const { loadingSignup, userInfoSignup, errorSignup } = userSignup;

  

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
      window.location.reload(false); // must load the full page because useEffect did not work.
    } 
    return () => {
      //
    }
  }, [userInfo])

  useEffect(() => {
    if (userInfoSignup) {
      alert("Bạn đã tạo tài khoản thành công. Hãy đăng nhập để sử dụng dịch vụ của chúng tôi.")
      changeToSignIn();
    }
    return () => {
      //
    }
  }, [userInfoSignup])

  const signInHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password))
  }

  const signUpHandler = (e) => {
    e.preventDefault();
    if (reNewPassword === newPassword) {
      dispatch(signup(name, newEmail, newPassword));
    } else {
      alert("Mật khẩu không trùng nhau.")
    }
  }   
  

  const changeToSignUp = () => {
    const container = document.querySelector('.form');
    container.classList.add("sign-up-mode");
    console.log(container);
  }
  const changeToSignIn = () => {
    const container = document.querySelector('.form')
    container.classList.remove("sign-up-mode");
    console.log(container);
  }

  return (
    <div className="form">
      <div className="form-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={signInHandler} >

            <h3 className="form-title" >Nike xin chào!</h3>
            <div>
              { loading && <div>
                <PulseLoader
                css={override} 
                color={"#0fabbc"}  
                loading={loading}
                 ></PulseLoader></div> }
              { error && <div className="sign-in-error">Tài khoản hoặc mật khẩu không chính xác</div> }
            </div>
            <div className="input-field">
              <div className="icon-container">
                <div>
                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </div>
              </div> 
              <input type="email" 
              id="email" name="email"
              placeholder="Địa chỉ thư điện tử" 
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <div className="icon-container">
                <div>
                 <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </div>
              </div>
              <input type="password" 
              id="password" name="password"
              placeholder="Mật khẩu" 
              onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Đăng nhập" className="btn" />

            <p className="social-text">Hoặc đăng nhập với các nền tảng xã hội khác</p>
            <div className="social-media">
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebookF} ></FontAwesomeIcon>
              </Link>
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} ></FontAwesomeIcon>
              </Link>
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} ></FontAwesomeIcon>
              </Link>
            </div>
          </form>

          <form className="sign-up-form" onSubmit={signUpHandler} >
            <h3 className="form-title">Mẫu tạo tài khoản</h3>
            <div>
              { loadingSignup && <div>
                <PulseLoader
                css={override} 
                color={"#0fabbc"}  
                loading={loading}
                 ></PulseLoader>
                </div> }
              { errorSignup && <div className="sign-in-error" >
                Địa chỉ thư điện tử đã có người sử dụng.
              </div> }
            </div>
            <div className="input-field">
              <div className="icon-container">
                <div>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
              </div> 
              <input type="text" name="name" id="name" placeholder="Tên của bạn"
              onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-field">
              <div className="icon-container">
                <div>
                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </div>
              </div> 
              <input type="email" name="email" id="newemail"
              onChange={(e) => setNewEmail(e.target.value)} 
              placeholder="Địa chỉ thư điện tử" />
            </div>
            <div className="input-field">
              <div className="icon-container">
                <div>
                 <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </div>
              </div>
              <input type="password" name="password" id="newpassword"
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Mật khẩu" />
            </div>
            <div className="input-field">
              <div className="icon-container">
                <div>
                 <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </div>
              </div>
              <input type="password" name="repassword" 
              onChange={(e) => setRenewPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu" />
            </div>
            <input type="submit" value="Đăng ký" className="btn" />

            <p className="social-text">Hoặc đăng nhập với các nền tảng xã hội khác</p>
            <div className="social-media">
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebookF} ></FontAwesomeIcon>
              </Link>
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} ></FontAwesomeIcon>
              </Link>
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} ></FontAwesomeIcon>
              </Link>
            </div>
          </form>

        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="panel-content">
            <h3>Bạn chưa có tài khoản ?</h3>
            <p>Tạo tài khoản ngay bây giờ để được nhận được sự hỗ trợ tốt nhất từ Nike.</p>
            <button className="btn transparent" id="sign-in-btn"
            onClick={changeToSignUp} >Đăng ký</button>
          </div>
          
          <img src="/nike-model-2.png" alt="product" className="panel-image"/>
        </div>

        <div className="panel right-panel">
          <div className="panel-content">
            <h3>Bạn đã có tài khoản ?</h3>
            <p>Đăng nhập ngay để nhận các khuyến mãi từ Nike.</p>
            <button className="btn transparent" id="sign-up-btn"
            onClick={changeToSignIn}>Đăng nhập</button>
          </div>
          
          <img src="/nike-model-4.png" alt="product" className="panel-image" />
        </div>
      </div>

    </div>
  )
}

export default SigninScreen;