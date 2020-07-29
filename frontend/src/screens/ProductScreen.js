import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { detailProduct } from '../actions/productAction';
import numberWithDot from '../functions/numberWithDot';
import { PulseLoader } from 'react-spinners';

function ProductScreen(props) {
  const productId = props.match.params.id;

  const [qty, setQty] = useState(1);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [stock, setStock] = useState();
 

  const productDetails = useSelector(state => state.productDetails)
  const { product, loading, error } = productDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(productId))
    return () => {
      //
    }
  }, [])

  const changeImage = (color, event, index) => {
    setColor(color);
    setQty(1);
    setSize();
    notifyStock();
    removeAlert();
    const image = event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstChild;
    image.src = product.inventory.imagesList[index];
    chooseColor(event);
    const detailsImage = event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
    if (color === "black") {
      detailsImage.style.backgroundColor = "#353b48";
    } else if (color === "white") {
      detailsImage.style.backgroundColor = "#dcdde1"; 
    } else {
      detailsImage.style.backgroundColor = color;
    };
    displayRelevantSize(index);
  }

  // display a relevant list of sizes of a product when clients choose the size which they clicked.
  const displayRelevantSize = (index) => {
    const sizeOptions = document.querySelector('.size-options');
    let sizeDisplay = "";
    const itemArray = product.inventory.details[index];
    itemArray.forEach(item => {
      sizeDisplay += `<span class="size-btn" data-size=${item.size} data-stock=${item.countInStock}>${item.size}</span>`
    })
    sizeOptions.innerHTML = sizeDisplay;
    console.log(sizeOptions);

    const sizeButtons = [...sizeOptions.querySelectorAll(".size-btn")];
    sizeButtons.forEach(btn => {
      const size = btn.dataset.size;
      const stockAmount = btn.dataset.stock;
      btn.addEventListener('click', (event) => {
        chooseSize(size, event, stockAmount, qty);
      });
    });
  }

  const chooseColor = (event) => {
    const colorList = document.querySelector(".color-list");
    const colorButtons = [...colorList.querySelectorAll(".color-btn")];
    colorButtons.forEach(btn => btn.classList.remove("active"));
    const targetButton = event.target;
    targetButton.classList.add('active');
  }


  const chooseSize = (size, event, stockAmount, qty) => {
    setSize(size);
    setQty(1);
    notifyStock();
    removeAlert();
    const sizeOptions = document.querySelector('.size-options');
    const sizeButtons = [...sizeOptions.querySelectorAll(".size-btn")];
    sizeButtons.forEach(btn => btn.classList.remove("active"));
    const targetButton = event.target;
    targetButton.classList.add('active');
    checkAvailableStock(stockAmount, qty);
  }
  
  // check available quantity of products in stock to make sure there is not no supply for client
  const checkAvailableStock = (stock, qty) => {
    setStock(stock);
    console.log(stock);
    console.log(qty);
    const status = document.querySelector('.status');
    console.log(status);
    const purchaseBtn = document.querySelector('.details-purchase');
    if (stock < qty) {
      status.innerText = 'HẾT HÀNG';
      purchaseBtn.disabled = true;
      status.style.color = 'red';
      purchaseBtn.style.backgroundColor = "lightgray";
    } else {
      status.innerText = 'CÒN HÀNG';
      purchaseBtn.disabled = false;
      status.style.color = 'green';
      purchaseBtn.style.backgroundColor = "#0fabbc";
    }
  }
  const increaseQty = () => {
    if (!stock) {
      alert("Vui lòng chọn kích cỡ sản phẩm.")
    }
    setQty(prevQty => prevQty < stock ? prevQty + 1 : prevQty);
    notifyStock();
  }
  const decreaseQty = () => {
    setQty(prevQty => prevQty > 1 ? prevQty - 1 : 1);
    notifyStock();
  }

  // display notification of maximum quantity of a products in stock
  const notifyStock = () => {
    const detailsStock = document.querySelector('.details-stock');
    if (qty == stock) {
      detailsStock.style.display = 'block';
    } else {
      detailsStock.style.display = 'none';
    }
  }

  // display notification when clients start ordering products without choosing a size or color
  const notifyAlert = () => {
    const notify = document.querySelector(".details-notify");
    notify.style.display = "block";
  }
  const removeAlert = () => {
    const notify = document.querySelector(".details-notify");
    notify.style.display = "none";
  }

  const handleAddToCart = () => {
    if (color && size) {
      props.history.push("/cart/" + props.match.params.id + "?name=" + product.name + "&color=" + color + "&size=" + size + "&qty=" + qty);
    } else {
      notifyAlert();
    }
  }  

  return (
    <div className="product-container">
      <div className="link-path">
        <span>
          <Link to="/">Trang chủ</Link>
        </span>
        <span> &nbsp; &gt; &nbsp; </span>
        <span>
          <Link to={'/product/' + productId}>Giày chạy bộ</Link>
        </span>
      </div>
      {
          loading ? (
            <div className="loading">
              <PulseLoader></PulseLoader>
              <div>Đang tải...</div>
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product" />
            </div>
            <div className="details-info">
              <ul>
                <li className="shoeName">
                  <h1>{product.name}</h1>
                  <p>Giày chạy bộ</p>
                </li>
                <li className="description">
                  <h3 className="title">Miêu tả</h3>
                  <p>{product.description}</p>
                </li>
                <li className="color-container">
                  <h3 className="title">Màu sắc</h3>
                  <div className="color-list">
                    {
                      product.inventory.colorList ? 
                      (product.inventory.colorList.map((color, index) => (<span className="color-btn" style={{backgroundColor: color}} onClick={(event) => changeImage(color, event, index)} ></span>)))
                      : "error"
                    }
                  </div>
                </li>
                <li className="size-container">
                  <h3 className="title">Kích cỡ</h3>
                  <div className="size-options">
                    <p>Hãy chọn màu sắc</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="details-action">
                <ul>
                  <li>
                    Giá: <b>{ numberWithDot(Number(product.price)) }.000 </b>đồng
                  </li>
                  <li>
                    Tình trạng: <span className="status">CÒN HÀNG</span>
                  </li>
                  <li className="qty">
                    <span>Số lượng: </span>
                    <span className="details-icon" onClick={increaseQty}>
                      <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
                    </span>
                    <span>{qty < 10 ? "0" + qty : qty}</span>
                    <span className="details-icon"
                    onClick={decreaseQty}>
                      <FontAwesomeIcon icon={faMinusSquare}></FontAwesomeIcon>
                    </span>
                    <span className="details-stock">(Tối đa {stock ? stock : 0} sản phẩm)</span>
                  </li>
                  <li>
                    <button className="details-purchase" onClick={handleAddToCart}>
                      <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>  Chọn Mua
                    </button>
                  </li>
                  <li>
                    <div className="details-notify">Bạn chưa chọn màu sắc hoặc kích cỡ của sản phẩm.</div>
                  </li>  
                </ul>
              </div>
          </div>            
          )
      }

    </div>
  )
}

export default ProductScreen;