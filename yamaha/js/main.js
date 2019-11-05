const view360Btn = document.querySelector('.moto-360-view__btn');
const view360Block = document.querySelector('.cloudimage-360');

view360Btn.addEventListener('click', () => {
  view360Block.setAttribute('data-autoplay', 'true');
  console.log(view360Block);
})
