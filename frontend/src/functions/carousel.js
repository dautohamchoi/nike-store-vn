
function Carousel() {
  const track = document.querySelector(".carousel__track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel__button--right');
  const prevButton = document.querySelector('.carousel__button--left');
  const dotsNav = document.querySelector(".carousel__nav");
  const dots = Array.from(dotsNav.children);

  const slideWidth = slides[0].getBoundingClientRect().width;

  // arrange the slides next to the left
  // slides[0].style.left = slideWidth * 0 + 'px';
  // slides[1].style.left = slideWidth * 1 + 'px';
  // slides[2].style.left = slideWidth * 2 + 'px';

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);


  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
  }

  const updateDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  }

  const hideShowArrows = (slides, prevButton, nextButton, targetIndex) =>  {
    if (targetIndex === 0) {
      prevButton.classList.add('is-hidden');
      nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
      prevButton.classList.remove('is-hidden');
      nextButton.classList.add('is-hidden');    
    } else {
      prevButton.classList.remove('is-hidden');
      nextButton.classList.remove('is-hidden'); 
    } 
  }
  function autoSlide() {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling 
            ? currentSlide.nextElementSibling
            : slides[0] ;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling
            ? currentDot.nextElementSibling
            : dots[0] ;
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

      moveToSlide(track, currentSlide, nextSlide);
      updateDot(currentDot, nextDot);
      hideShowArrows(slides, prevButton, nextButton, nextIndex)
  };
  setInterval(() => {
    autoSlide()
  }, 3500);

  // when I click left, move slides to the left
  prevButton.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide);

    updateDot(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex)
  });

  // when I click right, move slides to the right
  nextButton.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    moveToSlide(track, currentSlide, nextSlide);
    updateDot(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex)
  })

  // when I click the nav indicators, move to that slide
  dotsNav.addEventListener("click", (e) => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return; // if target === null, stop function here.

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide'); 
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDot(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
  })

}
export default Carousel;