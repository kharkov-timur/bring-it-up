import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, btns, next, prev, activeClass, animate, autoplay) {
    super(container, btns, next, prev, activeClass, animate, autoplay);
  }

  activateAnimation() {
    let animate = 0;
    animate = setInterval(() => this.nextSlide(), 5000);

    this.slides.forEach(slide => {
      slide.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        clearInterval(animate);
      });

      slide.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        animate = setInterval(() => this.nextSlide(), 5000);
      });
    });
  }

  decorizeSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    if (this.container.classList.contains('showup__content-slider') ||
      this.container.classList.contains('modules__content-slider')) {
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    } else {
      let arr = [];
      this.slides.forEach(slide => {
        if (slide.classList.contains('feed__item')) {
          arr.push(slide);
        }
        arr.forEach(item => {
          item.classList.remove(this.activeClass)
        })
      })
      this.container.appendChild(arr[0]);
      arr[1].classList.add(this.activeClass);
    }
  }

  bindTriggers() {
    this.btns.forEach(item => {
      item.addEventListener('click', () => this.nextSlide());
    })

    this.next.forEach(item => {
      item.addEventListener('click', () => this.nextSlide());
    })

    this.prev.forEach(item => {
      item.addEventListener('click', () => {

        for (let i = this.slides.length - 1; i > 0; i--) {
          if (this.slides[i].tagName !== 'BUTTON') {
            let active = this.slides[i];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
            break;
          }
        }
      });
    })
  }

  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-item: flex-start;
    `;

      this.bindTriggers();
      this.decorizeSlides();

      if (this.autoplay) {
        this.activateAnimation();
      }
    } catch (e) {
    }
  }
}