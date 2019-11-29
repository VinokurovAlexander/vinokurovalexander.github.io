'use strict';

(function () {
  var FEATURES = window.data.getFeatures();

  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('article');

  window.card = {
    FEATURES: FEATURES,
    /**
     * Генерирует массив с нодами карточек офферов.
     *
     * @param {array} announcements - Массив с объектами офферов.
     * @return {array} Массив с нодами карточек офферов для карты.
     */
    generateCards: function (announcements) {
      return announcements.map(function (advert) {
        return generateCard(advert);
      });
    },
  };

  /**
   * Генерирует карточку объявления.
   *
   * @param {object} advert - Объект оффера.
   * @return {array} Нода карточки объявления.
   */
  var generateCard = function (advert) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.ApartmentType[advert.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
    cardElement.classList.add('popup--closed');

    var deleteFeatures = FEATURES.filter(function (feature) {
      return !advert.offer.features.includes(feature);
    });
    editFeatures(cardElement, deleteFeatures);
    addOfferPhotos(cardElement, advert.offer.photos);

    return cardElement;
  };

  /**
   * Удаляет лишние удобства в карточке оффера.
   *
   * @param {object} elementTemplate - Шаблон карточки объявления.
   * @param {array} arrayWithDeleteFeatures - Массив в котором указаны названия удобств,
   * которые нужно удалить.
   */
  var editFeatures = function (elementTemplate, arrayWithDeleteFeatures) {
    var featuresList = elementTemplate.querySelector('.popup__features');
    arrayWithDeleteFeatures.forEach(function (feature) {
      var selector = '.popup__feature--' + feature;
      var featureItem = featuresList.querySelector(selector);
      featuresList.removeChild(featureItem);
    });
  };

  /**
   * Добавляет фотографии апартаментов в карточку оффера.
   *
   * @param {object} elementTemplate - Шаблон карточки объявления.
   * @param {array} arrayWithPhotos - Массив с адресами фотографий.
   */
  var addOfferPhotos = function (elementTemplate, arrayWithPhotos) {
    var offerImgWrapper = elementTemplate.querySelector('.popup__photos');
    var offerImg = offerImgWrapper.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();

    offerImgWrapper.removeChild(offerImg);

    arrayWithPhotos.forEach(function (photoUrl) {
      var imgElement = offerImg.cloneNode(true);
      imgElement.setAttribute('src', photoUrl);
      fragment.appendChild(imgElement);
    });
    offerImgWrapper.appendChild(fragment);
  };
})();
