const popupElement = document.querySelector('.popup');
const popupOpenElement = document.querySelector('.user__rename-button');
const popupCloseElement = popupElement.querySelector('.popup__close');
const popupForm = popupElement.querySelector('.popup__form');
let userName = document.querySelector('.user__name');
let userStatus = document.querySelector('.user__status');
let popupUserName = popupForm.querySelector('.popup__input_type_name');
let popupUserStatus = popupForm.querySelector('.popup__input_type_status');


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

