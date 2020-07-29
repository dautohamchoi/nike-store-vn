import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productAction';
import { PulseLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { set } from 'js-cookie';

const override = css`
  display: block;
  margin: 1rem 1rem;
`;


function ProductsScreen(props) {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [itemList, setItemList] = useState([]);

  const [colorList, setColorList] = useState([]);
  const [colors, setColors] = useState('');

  const [imagesList, setImagesList] = useState([])
  const [images, setImages] = useState('')

  const [sizes, setSizes] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [inventory, setInventory] = useState([])

  const productsList = useSelector(state => state.productsList);
  const { loading, products, error } = productsList;
  const [modalVisible, setModalVisible] = useState(false);
  

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      setItemList([]);
      setImagesList([]);
      setColorList([]);
      setColors('');
      setImages('');
      setSizes('');
      setCountInStock('');
    }
    dispatch(listProducts())
    return () => {
      //
    }
  }, [successSave, successDelete])

  useEffect(() => {
    sortItem(itemList)
    return () => {
      //
    }
  }, [itemList])

  // when admin click create-product-button, the form of this will appear .
  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id)
    setName(product.name);
    setPrice(product.price);
    setImage(product.image)
    setCategory(product.category);
    setDescription(product.description);
    setColorList(product.inventory.colorList);
    setInventory(product.inventory.details);
    setImagesList(product.inventory.imagesList);
  }

  const displayLoadingError = () => {
    if (loadingSave) {
      const loadingError = document.querySelector(".loading-error");
      console.log(loadingError);
      loadingError.style.visibility = "visible";
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({ _id: id, name, price, image, category, description, colorList, imagesList, inventory }));
    displayLoadingError();

  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id))
  }

  // admin choose the sizes, colors and quantity of new product, when they click submit, these info above will appear on a table below. 
  const addStyle = (e) => {
    e.preventDefault();
    if (colors && sizes && countInStock && images) {
      if (!colorList.includes(colors)) {
        setColorList([...colorList, colors]);
      }
      if (!imagesList.includes(images)) {
        setImagesList([...imagesList, images]);
      }
      setItemList([...itemList, {
        color: colors,
        images: images,
        size: sizes,
        countInStock: countInStock
      }])  
    } else {
      alert('Vui lòng nhập thông tin về màu sắc, kích thước và số lượng.')
    }
  }
  console.log(colorList);
  console.log(itemList);

  // sort a list of detail info according to colors. This makes admin easily control a data of new product.
  const sortItem = (itemList) => { 
    const sortedItem = [];
    for (let i = 0; i < colorList.length; i++) {
      sortedItem.push(itemList.filter(item => item.color === colorList[i]));
    }
    setInventory(sortedItem);
  }

  const removeItemFromData = (event) => {
    const targetItem = event.target.parentElement.parentElement;
    const id = targetItem.dataset.id;
    itemList.splice(id, 1);
    sortItem(itemList); // implement sorting items when itemList changed. useEffect do not work for this case.
  }

  console.log(inventory);

  // display relevant sizes according to the color which admin chose.
  const showRelevantSizes = (event) => {
    const selectedOption = event.target;
    const index = selectedOption.options[selectedOption.selectedIndex].value;
    const id = selectedOption.dataset.id;
    if (index && id) {
      const displaySizes = document.querySelector('.display-sizes' + id);
      const displayStock = document.querySelector('.display-stock' + id);
      const relevantSizes = products[id].inventory.details[index];
      if (relevantSizes) {
        let sizeContent = "";
        let stockContent = "";
        relevantSizes.forEach(item => 
          {
            sizeContent += `<div>${item.size}</div>`;
            stockContent += `<div>${item.countInStock}</div>`
          }
        );
        displaySizes.innerHTML = sizeContent;
        displayStock.innerHTML = stockContent;
      }
    }
    console.log(selectedOption, index);
    console.log(id);
  }
 

  return (
    <div className="content-margined">
      { modalVisible &&
        (<div className="form-create-product">
          {
            id ? (
              <div className="form-header" style={{backgroundColor: "#4481eb"}}>
                <button className="form-btn"
                onClick={() => setModalVisible(false)}>
                  <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  &nbsp; Quay lại
                </button>
                <h3>Mẫu cập nhật sản phẩm</h3>
              </div>  
            ) : (
              <div className="form-header" style={{backgroundColor: "#f7b731"}}>
                <button className="form-btn"
                onClick={() => setModalVisible(false)}>
                  <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  &nbsp; Quay lại
                </button>
                <h3>Mẫu tạo sản phẩm mới</h3>
              </div>  
            )
          }

          <div className="loading-error">
            { loadingSave &&
              <div>
                <PulseLoader
                  css={override} 
                  color={"#0fabbc"}  
                  loading={loadingSave}
                ></PulseLoader>
                Đang tải 
              </div> 
            }
            { errorSave && <div>{errorSave}</div>}
          </div>
          <div>
            <form onSubmit={submitHandler}>
              <div className="create-products-content">
                <ul className="create-products-container">
                  <li>
                    <h4>Thông tin chung</h4>
                  </li>
                  <li>
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input type="text" placeholder="Ví dụ: Nike Air Max 90" name="name" value={name}
                    id="name" onChange={(e) => setName(e.target.value)} />
                  </li>
                  <li>
                    <label htmlFor="price">Giá <span>( x 1.000 đồng )</span></label>
                    <input type="number" 
                    placeholder="Ví dụ: 100 ~ 100.000 đồng"
                    name="price" value={price}
                    id="price" onChange={(e) => setPrice(e.target.value)} />
                  </li>
                  <li>
                    <label htmlFor="image">Hình ảnh đại diện chính <span>(Link URL)</span></label>
                    <input type="text" name="image" value={image}
                    id="image" onChange={(e) => setImage(e.target.value)} />
                  </li>
                  <li>
                    <label htmlFor="category">Phân loại</label>
                    <input type="text" name="category" value={category}
                    id="category" onChange={(e) => setCategory(e.target.value)} />
                  </li>
                  <li>
                    <label htmlFor="description">Mô tả sản phẩm</label>
                    <textarea type="text" name="description" value={description}
                    id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                  </li>
                </ul>

                <ul className="create-products-container">
                  <li>
                    <h4>Chi tiết sản phẩm</h4>
                  </li>
                  <li>
                    <label htmlFor="colors">Màu sắc <span>(ghi bằng tiếng Anh)</span></label>
                      <input placeholder="Ví dụ: blue" type="text" name="colors" value={colors} id="color" onChange={(e) => setColors(e.target.value)} ></input>
                  </li>
                  <li>
                    <label htmlFor="images">URL ảnh <span>(tên-sản-phẩm-màu)</span></label>
                    <input placeholder="Ví dụ: .../nike-air-max-90-blue"  type="text" name="images" value={images} id="images" onChange={(e) => setImages(e.target.value)} ></input>
                  </li>
                  <li>
                    <label htmlFor="sizes">Kích cỡ</label>
                    <input type="number" name="sizes" value={sizes} onChange={(e) => setSizes(e.target.value)}></input>
                  </li>
                  <li>
                    <label htmlFor="countInStock">Số lượng nhập vào kho</label>
                    <input type="number" name="countInStock" value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}></input>
                  </li>
                  <li>
                    <button onClick={addStyle}>Thêm chi tiết</button>
                  </li>
                </ul>
              </div>
              <div className="form-details-inform">
                {
                  id ?          
                   <div>
                  <p><strong>Lưu ý: </strong>Chỉ có thể thay đổi thông tin ở phần <b>"Thông tin chung"</b>.</p> 
                  <p>Chức năng thay đổi thông tin ở phần "Chi tiết" chưa hoạt động.</p>
                   </div>
                  : ""
                }
              </div>
                <table className="table-create-products">
                  <thead>
                    <tr>
                      <th>Màu sắc</th>
                      <th>Hình ảnh</th>
                      <th>Kích cỡ</th>
                      <th>Số lượng</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      itemList.map((item, index) => (
                        <tr key={index} data-id={index}>
                          <td>{item.color}</td>
                          <td>{item.images}</td>
                          <td>{item.size}</td>
                          <td>{item.countInStock}</td>
                          <td>
                            <button className="btn-table delete" onClick={(event) => removeItemFromData(event)}>Xoá</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              {
                id ? (
                  <button type="submit" style={{backgroundColor: "#0fabbc"}}
                  className="btn-create-products">Cập nhật</button>
                ) : (
                  <button type="submit" style={{backgroundColor: "#fa8231"}}
                  className="btn-create-products">Tạo sản phẩm</button>
                )
              }  
            </form>
          </div>
        </div>)
      }
      { !modalVisible &&
        <div className="products-list">
          <div className="products-header">
            <h3>Danh sách sản phẩm đang bày bán</h3>
            <button className="form-btn" onClick={() => openModal({ inventory: 
              { 
                colorList: [],
                imagesList: [],
              }})
            }>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>	&nbsp;	
              <span> Tạo sản phẩm mới</span></button>
          </div>
          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá (k.VNĐ)</th>
              <th>Phân loại</th>
              <th>Màu sắc</th>
              <th>Kích cỡ</th>
              <th>Số lượng</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody className="list-table-body">
            {
              loading ? (<tr>
                <td colSpan="8">
                  <PulseLoader
                    css={override} 
                    color={"#fff"}  
                    loading={loading}
                  ></PulseLoader>
                  Đang tải 
                </td>
              </tr>)
              : error ? (<tr>{error}</tr>)
              : (products.map((product, index) => (
                <tr key={product._id}>
                  <td>{product._id} </td>
                  <td>{product.name} </td>
                  <td>{product.price} </td>
                  <td>{product.category} </td>
                  <td>
                    <select data-id={index} onClick={(event) => showRelevantSizes(event)}>
                      <option disabled selected value>Chọn màu</option>
                      {
                        product.inventory.colorList.map((color, index) => (
                          <option value={index} >{color}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td className={"display-sizes" + index}>
                  </td>
                  <td className={"display-stock" + index}></td>
                  <td>
                    <button className="btn-table edit"
                    onClick={() => openModal(product)}>Cập nhật</button>
                    <button className="btn-table delete" onClick={() => deleteHandler(product)}>Xóa</button>
                  </td>
                </tr>
              )))
            }
            

          </tbody>
        </table>
      </div>}
    </div>
  )
}

export default ProductsScreen;