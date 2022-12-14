const list = JSON.parse(localStorage.getItem('listStorage')) || [];
const addListItem = document.getElementById('inputs');
const listContainer = document.querySelector('.todolist');
export const trashCan = document.querySelectorAll('.delete');

export default class Todolist {
  constructor(description, complete, index) {
    this.description = description;
    this.complete = complete;
    this.index = index;
  }

  static createList = () => {
    const listContainer = document.querySelector('.todolist');
    const displayList = list.map((list, index) => `<li class="list-item " id="${index}"><div class="inline"><input id="box-check" type=checkbox class="box-check" name="checkbox"></div> <input type="text" class="to-do input-text" value="${list.description}" ><div class="ellipsis-container"><i class="fa-solid fa-ellipsis-vertical"></i><i class="fa-solid fa-trash-can icon delete"></i></div></li>`).join('');
    listContainer.innerHTML = displayList;
    const ellipsis = document.querySelectorAll('.fa-ellipsis-vertical');
    const removeItem = document.querySelectorAll('.delete');
    const checkBox = document.querySelectorAll('.box-check');

    removeItem.forEach((del, i) => {
      del.addEventListener('click', () => {
        Todolist.deleteItem(i);
      });
    });
    const todo = document.querySelectorAll('.to-do');
    todo.forEach((item, index) => {
      item.addEventListener('change', (event) => {
        event.target.parentElement.classList.remove('backyellow');
        event.target.parentElement.children[2].children[0].style.display = 'inline';
        event.target.parentElement.children[2].children[1].style.display = 'none';
        if (item.value) {
          list[index].description = item.value;
          localStorage.setItem('listStorage', JSON.stringify(list));
        }
      });
    });

    ellipsis.forEach((item) => { 
      item.addEventListener('click', () => {
        removeItem[item].style.display = 'inline';
        item.style.display = 'none';
      });
    });
    // To check whether a box has been checked
    checkBox.forEach((check, index) => {
      check.addEventListener('change', (event) => {
        if (check.checked === true) {
          event.target.parentElement.parentElement.children[1].style.textDecoration = 'line-through';
          event.target.parentElement.parentElement.children[1].style.textDecorationColor = 'red';
          list[index].complete = true;
        } else {
          list[index].complete = false;
          event.target.parentElement.parentElement.children[1].style.textDecoration = 'none';
        }
        localStorage.setItem('listStorage', JSON.stringify(list));
      });
    });
  };

  static addToList = () => {
    const listItem = new Todolist(addListItem.value, false, list.length + 1);
    if (addListItem.value !== '') {
      list.push(listItem);
      localStorage.setItem('listStorage', JSON.stringify(list));
    }
  };

  static deleteItem = (index) => {
    list.splice(index, 1);
    list.forEach((e, i) => {
      e.index = i + 1;
    });
    localStorage.setItem('listStorage', JSON.stringify(list));
    Todolist.createList();
  };
}

export { list };
export { addListItem };
export { listContainer };
