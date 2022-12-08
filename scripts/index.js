const popupElement = document.querySelector('#popup-rename');
const popupOpenElement = document.querySelector('.user__rename-button');
const popupCloseElement = popupElement.querySelector('.popup__close');
const popupForm = popupElement.querySelector('.popup__form');
const popupAddPlaceElement = document.querySelector('#popup-add-place');
const popupAddPlaceOpenElement = document.querySelector('.user__add-button');
const popupAddPlaceCloseElement = popupAddPlaceElement.querySelector('.popup__close');
const userName = document.querySelector('.user__name');
const userStatus = document.querySelector('.user__status');
const popupUserName = popupForm.querySelector('.popup__input_type_name');
const popupUserStatus = popupForm.querySelector('.popup__input_type_status');
const cardsContainer = document.querySelector('.cards');
const popupAddPlaceForm = popupAddPlaceElement.querySelector('.popup__form');
const popupAddPlaceFormName = popupAddPlaceForm.querySelector('.popup__input_type_place-name');
const popupAddPlaceFormLink = popupAddPlaceForm.querySelector('.popup__input_type_image-link');
const popupBigImageElement = document.querySelector('#big-image');
const popupBigImageClose = popupBigImageElement.querySelector('.popup__close');
const popupBigImagePicture = popupBigImageElement.querySelector('.popup__big-image');
const popupBigImageCaption = popupBigImageElement.querySelector('.popup__caption');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// const toggleAddPlaceVisibility = function () {
//   popupAddPlaceElement.classList.toggle('popup_is-opened');
// }

const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup_is-opened');
}

//popupAddPlaceOpenElement.addEventListener('click' , toggleAddPlaceVisibility);
//popupAddPlaceCloseElement.addEventListener('click' , toggleAddPlaceVisibility);

popupAddPlaceOpenElement.addEventListener('click' , () => openPopup(popupAddPlaceElement));
popupAddPlaceCloseElement.addEventListener('click' , () => closePopup(popupAddPlaceElement));

//открытие/закрытие редактирования профиля
const togglePopupVisibility = function () {
  popupUserName.value = userName.textContent;
  popupUserStatus.value = userStatus.textContent;
  // popupElement.classList.toggle('popup_is-opened');
  openPopup(popupElement);
}

popupOpenElement.addEventListener('click', togglePopupVisibility);
// popupCloseElement.addEventListener('click', togglePopupVisibility);
popupCloseElement.addEventListener('click' , () => closePopup(popupElement));

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  // popupElement.classList.toggle('popup_is-opened');
  closePopup(popupElement);
}

popupForm.addEventListener('submit', handleProfileFormSubmit);

//выбор шаблона
const cardTemplate = document.querySelector('#cards-template').content.querySelector('.cards__item');

const handlePlaceFormSubmit = function (evt) {
  evt.preventDefault();
  renderCard({
    name: popupAddPlaceFormName.value ,
    link: popupAddPlaceFormLink.value ,
  });
  closePopup(popupAddPlaceElement);
  evt.target.reset();
}

popupAddPlaceForm.addEventListener('submit' , handlePlaceFormSubmit);

// const popupBigImageOpen = function () {
//   popupBigImageElement.classList.toggle('popup_is-opened');
// }

const generateBigImage = function(evt) {
  popupBigImagePicture.src = evt.target.src;
  popupBigImagePicture.alt = evt.target.closest('.cards__item').querySelector('.cards__title').textContent;
  popupBigImageCaption.textContent = evt.target.closest('.cards__item').querySelector('.cards__title').textContent;
  //console.log(popupBigImagePicture);
  //console.log(popupBigImageCaption);
}

const handleCheckTrash = function(evt) {
  evt.target.closest('.cards__item').remove();
}

const handleCheckLike = function(evt) {
  evt.target.classList.toggle('cards__like_active');
  }

const handleOpenBigImage = function(evt) {
  generateBigImage(evt);
  // popupBigImageOpen();
  openPopup(popupBigImageElement);
}
// генерация карточки в копию шаблона
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const title = newCard.querySelector('.cards__title');
  const image = newCard.querySelector('.cards__image');
  title.textContent = dataCard.name;
  image.src = dataCard.link;
  image.alt = dataCard.name;
  newCard.querySelector('.cards__trash').addEventListener('click' , handleCheckTrash);
  newCard.querySelector('.cards__like').addEventListener('click' , handleCheckLike);
  newCard.querySelector('.cards__image').addEventListener('click' , handleOpenBigImage);
  return newCard;
}

// popupBigImageClose.addEventListener('click' , popupBigImageOpen);
popupBigImageClose.addEventListener('click' , () => closePopup(popupBigImageElement));

//рендер карточки
const renderCard = (dataCard) => {
  cardsContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})
