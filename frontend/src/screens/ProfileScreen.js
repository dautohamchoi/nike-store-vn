import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../actions/userAction';
import { PulseLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
  display: block;
  margin: 1rem auto;
  text-align: center;

`;

function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState(true);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('userinfo', userInfo._id, name, password);
        dispatch(update({ userId: userInfo._id, name, password }))
    }

    const handleChange= (e) => {
        const nameEdit = document.querySelector('.btn-name');
        nameEdit.classList.add('edit-active');
        const passEdit = document.querySelector('.btn-password');
        if (e.target === nameEdit) {
            setOpen(true);
            nameEdit.classList.add('edit-active');
            passEdit.classList.remove('edit-active');
        } else if (e.target === passEdit) {
            setOpen(false);
            passEdit.classList.add('edit-active');
            nameEdit.classList.remove('edit-active');
        }
    }
    
    useEffect(() => {
        if (userInfo) {
            console.log(userInfo);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        if (success) {
            window.location.reload(false); // when users change their passwords or names, reload the page to update
        }
        return () => {

        }
    }, [userInfo, success]);

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="current-info">
                    <h4>Thông tin cá nhân</h4>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon>
                            &nbsp;Tên người dùng: 
                        </span>
                        <span>{userInfo.name} </span>    
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                            &nbsp;Email: 
                        </span>
                        <span>{userInfo.email} </span>    
                    </div>
                </div>
                <div className="profile-button">
                    <div className="btn-name edit-active" 
                        onClick={(e) => handleChange(e)}>Thay đổi tên người dùng</div>
                    <div className="btn-password"
                        onClick={(e) => handleChange(e)}>Thay đổi mật khẩu</div>
                </div>
                <div className="profile-status">
                    { loading && <div>
                            <PulseLoader
                            css={override} 
                            color={"#0fabbc"}  
                            loading={loading}
                            ></PulseLoader></div> 
                    }
                    {
                            error && <div>{error}</div>
                    }
                    {
                        success && <div className="success">Thông tin đã được thay đổi</div>
                    }
                </div>
                {
                    open 
                    ? ( <div className="profile-edit">
                        <label>Nhập tên người dùng mới</label>
                        <input name="name" type="text" required 
                            onChange={(e) => setName(e.target.value)}
                            ></input>
                        <button className="button-fullwidth" 
                            onClick={(e) => submitHandler(e)}
                            >Đổi tên</button>
                    </div>) 
                    : (<div className="profile-edit">
                        <label>Nhập mật khẩu mới</label>
                        <input name="password" type="password" required 
                            onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        <button className="button-fullwidth" 
                            onClick={(e) => submitHandler(e)}
                            >Đổi mật khẩu</button>    
                    </div>)
                }  
            </div>
        </div>
    )
}

export default ProfileScreen;