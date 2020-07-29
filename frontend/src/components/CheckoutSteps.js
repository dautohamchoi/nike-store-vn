import React from 'react';

function CheckoutSteps(props) {
    return (
        <div className="checkout-steps">
           <div className={props.step1 ? 'active-step' : ''}>Đăng nhập</div>
           <div className={props.step2 ? 'active-step' : ''}>Giao Hàng</div>
           <div className={props.step3 ? 'active-step' : ''}>Thanh Toán</div>
           <div className={props.step4 ? 'active-step' : ''}>Đặt mua</div> 
        </div>
    )
}

export default CheckoutSteps;