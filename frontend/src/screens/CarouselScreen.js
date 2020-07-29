import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Carousel from '../functions/carousel';

class CarouselScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heightImage: null
    }
    this.calcHeight = this.calcHeight.bind(this);
  }
  calcHeight() {
    const currentImg = document.querySelector('.current-slide').firstChild;
    const width = currentImg.offsetWidth;
    const height = 1080 * width / 1920;
    this.setState({
      heightImage: height
    })
  }

  componentDidMount() {
    Carousel();
    this.calcHeight();
    window.addEventListener('resize', this.calcHeight)
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.calcHeight)
  }
  

  render() {
    return (
      <div>
        <div className="carousel" style={{ height: this.state.heightImage}}>
          <div className="carousel__track-container">
            <ul className="carousel__track">
              <li className="carousel__slide current-slide">
                <img className="carousel__image" src="/images/banner_nike_1.jpg" alt="slide"/>
              </li>
              <li className="carousel__slide">
                <img className="carousel__image" src="/images/nike_banner_2.png" alt="slide"/>
              </li>
              <li className="carousel__slide">
                <img className="carousel__image" src="/images/nike_banner_3.jpg" alt="slide"/>
              </li>
            </ul>
          </div>
          <button className="carousel__button carousel__button--left is-hidden" >
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </button>   
          <button className="carousel__button carousel__button--right" >
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </button>
        </div>
        <div className="carousel__nav">
          <button className="carousel__nav-indicator current-slide"></button>
          <button className="carousel__nav-indicator"></button>
          <button className="carousel__nav-indicator"></button>
        </div>
      </div>
    )
  }
}

export default CarouselScreen;