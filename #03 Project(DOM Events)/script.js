

var list = document.querySelector("#list ul");
list.addEventListener("click", function(e){

    if(e.target.className == "delete"){
        const li = e.target.parentElement;
        list.removeChild(li);
    }
});
/* 
var message = document.getElementById('message');
var deleteBtn = document.querySelectorAll('#list .delete');
 
Array.from(deleteBtn).forEach(function(delBtn){

    delBtn.addEventListener('click', function(e){
        message.className = 'show';
    yes.addEventListener('click', function(){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
        message.className = '';
    })
    });
});   


//  delete item
var list = document.querySelector("#list ul");
var message = document.getElementById('message');
var yes = document.getElementById('yes');
var no = document.getElementById('no');
list.addEventListener("click", function(e){
    
    if(e.target.className == "delete"){
        message.className = 'show';
        };
     yes.addEventListener('click', function(){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
        message.className = '';
    });
    no.addEventListener('click', function(){
        message.className = '';
    })
});

*/  


// add items
var addItems = document.forms['add-list'];

addItems.addEventListener("submit", function(e){
 e.preventDefault();
 
var values = addItems.querySelector('input[type="text"]').value;

 // create elements
 const li = document.createElement('li');
 const itemName = document.createElement('span');
 const deleteItem = document.createElement('span');

 // add elements to the DOM
 li.appendChild(itemName);
 li.appendChild(deleteItem);
 list.appendChild(li);

 // add elements content
 deleteItem.textContent = "delete";
 itemName.textContent = values;

 // add style/class to the elements
 deleteItem.className = 'delete';
 itemName.className = 'name';
});







// Search input
var searchBar = document.forms['search'].querySelector('input');
var message = document.getElementById('message');
searchBar.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName('li');
    Array.from(books).forEach(function(book){
    const title = book.firstElementChild.textContent;
     if(title.toLowerCase().indexOf(term) != -1){
         book.style.display = "block";
     }
     else{
         book.style.display = "none";
        };
    });
});