const popupEditProfileElement = document.querySelector('#popup-rename');
const popupEditProfileOpen = document.querySelector('.user__rename-button');
const popupEditProfileClose = popupEditProfileElement.querySelector('.popup__close');
const popupEditProfileForm= popupEditProfileElement.querySelector('.popup__form');
const popupAddPlaceElement = document.querySelector('#popup-add-place');
const popupAddPlaceOpenElement = document.querySelector('.user__add-button');
const popupAddPlaceCloseElement = popupAddPlaceElement.querySelector('.popup__close');
const userName = document.querySelector('.user__name');
const userStatus = document.querySelector('.user__status');
const popupUserName = popupEditProfileForm.querySelector('.popup__input_type_name');
const popupUserStatus = popupEditProfileForm.querySelector('.popup__input_type_status');
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

const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup' , handleEscUp);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup' , handleEscUp);
}

const handleEscUp = function (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

popupEditProfileElement.addEventListener('click' , (e) => {
  if(!e.target.closest('.popup__container')) {
    closePopup(e.target)
  }
})
popupAddPlaceElement.addEventListener('click' , (e) => {
  if(!e.target.closest('.popup__container')) {
    closePopup(e.target)
  }
})
popupBigImageElement.addEventListener('click' , (e) => {
  if(!e.target.closest('.popup__big-image')) {
    closePopup(e.target)
  }
})

popupAddPlaceOpenElement.addEventListener('click' , () => openPopup(popupAddPlaceElement));
popupAddPlaceCloseElement.addEventListener('click' , () => closePopup(popupAddPlaceElement));

//открытие/закрытие редактирования профиля
const togglePopupVisibility = function () {
  popupUserName.value = userName.textContent;
  popupUserStatus.value = userStatus.textContent;
  openPopup(popupEditProfileElement);
}

popupEditProfileOpen.addEventListener('click', togglePopupVisibility);
popupEditProfileClose.addEventListener('click' , () => closePopup(popupEditProfileElement));

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  closePopup(popupEditProfileElement);
}

popupEditProfileForm.addEventListener('submit', handleProfileFormSubmit);

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
  evt.submitter.classList.add('popup__save_disabled');
  evt.submitter.disabled = true;
}

popupAddPlaceForm.addEventListener('submit' , handlePlaceFormSubmit);

const generateBigImage = function(evt) {
  popupBigImagePicture.src = evt.target.src;
  popupBigImagePicture.alt = evt.target.closest('.cards__item').querySelector('.cards__title').textContent;
  popupBigImageCaption.textContent = evt.target.closest('.cards__item').querySelector('.cards__title').textContent;
}

const handleCheckTrash = function(evt) {
  evt.target.closest('.cards__item').remove();
}

const handleCheckLike = function(evt) {
  evt.target.classList.toggle('cards__like_active');
  }

const handleOpenBigImage = function(evt) {
  generateBigImage(evt);
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
  image.addEventListener('click' , handleOpenBigImage);
  return newCard;
}

popupBigImageClose.addEventListener('click' , () => closePopup(popupBigImageElement));

//рендер карточки
const renderCard = (dataCard) => {
  cardsContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})
