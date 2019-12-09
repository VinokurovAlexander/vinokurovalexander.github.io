const Scrollbar = window.Scrollbar;

Scrollbar.init(document.querySelector('.books__img-wrapper'),
  {
    alwaysShowTracks: true
  }
);

$(document).ready(function() {
  $('.comment__select').select2({
    minimumResultsForSearch: -1,
    placeholder: 'Выберите книгу',
    dropdownParent: $('.form__select-wrapper')
  });

  $('.placeholder__input').focus(function() {
    $(this).next('.placeholder__title').css('transform', ' translateY(-110%)');
  });

  $('.placeholder__input').focusout(function() {
    if ($(this)[0].value === '') {
      $(this).next('.placeholder__title').css('transform', ' translateY(-50%)');
    }
  });
});



