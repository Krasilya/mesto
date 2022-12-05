const popupElement = document.querySelector('#popup-rename');
const popupOpenElement = document.querySelector('.user__rename-button');
const popupCloseElement = popupElement.querySelector('.popup__close');
const popupForm = popupElement.querySelector('.popup__form');
const popupAddPlaceElement = document.querySelector('#popup-add-place');
const popupAddPlaceOpenElement = document.querySelector('.user__add-button');
const popupAddPlaceCloseElement = popupAddPlaceElement.querySelector('.popup__close');
let userName = document.querySelector('.user__name');
let userStatus = document.querySelector('.user__status');
let popupUserName = popupForm.querySelector('.popup__input_type_name');
let popupUserStatus = popupForm.querySelector('.popup__input_type_status');
const cardsContainer = document.querySelector('.cards');
const popupAddPlaceForm = popupAddPlaceElement.querySelector('.popup__form');
const popupAddPlaceFormName = popupAddPlaceForm.querySelector('.popup__input_type_place-name');
const popupAddPlaceFormLink = popupAddPlaceForm.querySelector('.popup__input_type_image-link');

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

const toggleAddPlaceVisibility = function () {
  popupAddPlaceElement.classList.toggle('popup_is-opened');
}

popupAddPlaceOpenElement.addEventListener('click' , toggleAddPlaceVisibility);
popupAddPlaceCloseElement.addEventListener('click' , toggleAddPlaceVisibility);


//открытие/закрытие редактирования профиля
const togglePopupVisibility = function () {
  popupUserName.value = userName.textContent;
  popupUserStatus.value = userStatus.textContent;
  popupElement.classList.toggle('popup_is-opened');
}

popupOpenElement.addEventListener('click', togglePopupVisibility);
popupCloseElement.addEventListener('click', togglePopupVisibility);

const popupSaveName = function (evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  popupElement.classList.toggle('popup_is-opened');
}

popupForm.addEventListener('submit', popupSaveName);

//выбор шаблона
const cardTemplate = document.querySelector('#cards-template').content.querySelector('.cards__item');

const popupSavePlace = function (evt) {
  evt.preventDefault();
  renderCard({
    name: popupAddPlaceFormName.value ,
    link: popupAddPlaceFormLink.value ,
  });

}

popupAddPlaceForm.addEventListener('submit' , popupSavePlace);

const handleCheckLike = function(evt) {
  evt.target.classList.toggle('cards__like_active');
  }

// генерация карточки в копию шаблона
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const title = newCard.querySelector('.cards__title');
  const image = newCard.querySelector('.cards__image');
  title.textContent = dataCard.name;
  image.src = dataCard.link;
  //likeButton.addEventListener('click' , handleCheckLike);
  newCard.querySelector('.cards__like').addEventListener('click' , handleCheckLike);
  return newCard;
}



//рендер карточки
const renderCard = (dataCard) => {
  cardsContainer.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})

//лайк






