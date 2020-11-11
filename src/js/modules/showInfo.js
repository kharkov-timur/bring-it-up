export default class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  init() {
    this.btns.forEach(btn => {

      btn.addEventListener('click', () => {
        let plus = btn.querySelector('svg').firstElementChild;

        if (plus.style.display === 'none'){
          plus.style.display = 'block';
        } else {
          plus.style.display = 'none';
        }

        let elem = btn.closest('.module__info-show').nextElementSibling;

        elem.classList.add('animate');
        elem.classList.toggle('msg');
        elem.classList.toggle('fadeIn');
        elem.style.marginTop = '20px';
      });
    });
  }
}