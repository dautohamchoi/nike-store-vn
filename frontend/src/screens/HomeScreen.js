import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarouselScreen from './CarouselScreen';
import { listProducts } from '../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
  display: block;
  margin: 1rem 1rem;
  text-align: center;
`;


function HomeScreen(props) {
  // const {products} = data;

  const category = props.match.params.id ? props.match.params.id : '';
  

  const productsList = useSelector(state => state.productsList)
  const { products, loading, error } = productsList;

  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    }
  }, [category]);



  const displayRelevantSize = (id, event, index) => {
    const sizeDOM = event.target.parentElement.previousElementSibling.children[1];
    let sizeDisplay = "";
    const itemArray = products[id].inventory.details[index];
    itemArray.forEach(item => {
      sizeDisplay += `<span>${item.size}</span>`
    })
    sizeDOM.innerHTML = sizeDisplay;
  }



  const changeImage = (event, index) => {
    const image = event.target.parentElement.parentElement.previousElementSibling.firstChild;
    const card = event.target.parentElement.parentElement.parentElement;
    const id = card.dataset.id;
    image.src = products[id].inventory.imagesList[index];
    const colorButtons = document.querySelectorAll(".color-button")
    colorButtons.forEach(btn => btn.classList.remove('active'));
    const targetButton = event.target;
    targetButton.classList.add('active');
    displayRelevantSize(id, event, index);
  }

  return (
    <div className="home-container">
      {
        category ? <div className="categories">Danh sách sản phẩm bạn cần tìm:</div>
        : 
        <div className="carousel-container">
          <CarouselScreen></CarouselScreen>
        </div>
      }
      <div className="products-content">
        {
          loading ? (
            <div className="products-loading">
              <PulseLoader
                css={override} 
                color={"#fff"}  
                loading={loading}
              ></PulseLoader>
              Đang tải 
            </div> 
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="products-container">
              { products.map((product, index) => (
                <div className="card"  key={product._id} data-id={index}>
                  <div className="imgBx">
                    <img src={product.image} alt="product" 
                     style={{
                      transform: product.category === 'shoes' ? 'translate(-50%, -50%) rotate(-35deg)' : ""
                      }}
                    />
                  </div>
                  <div className="contentBx">
                    <h2>{product.name}</h2>
                    <div className="size">
                      <h3>Kích cỡ: </h3>
                      <span className="size-list">
                        {
                         product.inventory.details[0].map(item => (<span>{item.size}</span>))
                        }
                      </span>
                    </div>
                    <div className="color">
                      <h3>Màu: </h3>
                      {
                        product.inventory.colorList.map((color, index) => <span className="color-button" style={{backgroundColor: color}} onClick={(event) => changeImage(event, index)}></span>)
                      }
                    </div>
                    <Link to={'/product/' + product._id} className="link">Mua Ngay</Link>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>

    </div>
  )
}
export default HomeScreen;