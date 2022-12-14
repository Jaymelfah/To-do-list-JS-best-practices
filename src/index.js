import './style.css';
import Todolist, {
  addListItem, list,
} from './modules/class.js';

const enterKey = document.getElementById('enter-key');
const clearButton = document.querySelector('.clr-btn');

document.addEventListener('DOMContentLoaded', () => {
  Todolist.createList();
});

// Function for enter key to add books
addListItem.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    Todolist.addToList();
    Todolist.createList();
    addListItem.value = '';
  }
});

// Function to click and add books
enterKey.addEventListener('click', () => {
  Todolist.addToList();
  Todolist.createList();
  document.querySelector('.input-text').value = '';
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('to-do')) {
    event.target.parentElement.classList.add('backyellow');
  }
});

// Function to clear all checked boxes
clearButton.addEventListener('click', () => {
  const filteredList = list.filter((obj) => obj.complete !== true);
  filteredList.forEach((e, i) => {
    e.index = i + 1;
  });
  localStorage.setItem('listStorage', JSON.stringify(filteredList));
  Todolist.createList();
  window.location.reload();
});
