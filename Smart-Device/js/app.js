"use strict";

$('.accordion__btn').on('click', function () {
  var parent = $(this).closest('.accordion');
  $('.accordion--open').not(parent).toggleClass('accordion--open').find('.accordion__item').slideUp();
  parent.toggleClass('accordion--open');
  parent.find('.accordion__item').slideToggle();
});
var form = document.querySelector('#callback-modal');

if (form) {
  var formInput = {
    userName: form.querySelector('#callback-user-name'),
    phoneNumber: form.querySelector('#callback-phone-number'),
    comment: form.querySelector('#callback-feedback-text')
  };
  var isStorageSupport = true;
  var storage = {
    userName: '',
    phoneNumber: '',
    comment: ''
  };

  try {
    Object.keys(storage).forEach(function (storageItemName) {
      storage[storageItemName] = localStorage.getItem(storageItemName);
    });
  } catch (err) {
    isStorageSupport = false;
  }

  Object.keys(storage).forEach(function (storageItemName) {
    if (storage[storageItemName]) {
      formInput[storageItemName].value = storage[storageItemName];
    }
  });
  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      Object.keys(storage).forEach(function (storageItemName) {
        localStorage.setItem(storageItemName, formInput[storageItemName].value);
      });
    }
  });
}

var phoneInputs = $('input[name="phone-number"]');
phoneInputs.inputmask({
  mask: '+7[(999)999 99 99]',
  placeholder: ' ',
  greedy: false
});
$('a[href="#callback-modal"]').magnificPopup({
  type: 'inline',
  midClick: true,
  focus: '#callback-user-name'
});
var Scroll = {
  SLOW: 700,
  FAST: 1500
};

var documentScroll = function documentScroll(element, speed) {
  $([document.documentElement, document.body]).animate({
    scrollTop: $(element).offset().top
  }, speed);
};

var scrollTo = function scrollTo(link, element, speed) {
  link.on('click', function (e) {
    e.preventDefault();
    documentScroll(element, speed);
  });
};

scrollTo($('.scroll-btn-feedback'), $('#feedback'), Scroll.FAST);
scrollTo($('.scroll-btn-features'), $('#features'), Scroll.SLOW);