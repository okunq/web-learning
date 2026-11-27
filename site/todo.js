let inputTask = document.querySelector("#inputTask");
window.onload = ()=>{inputTask.focus()};
let addBtn = document.querySelector("#addBtn");
let listDiv = document.querySelector("#listDiv");
let divDelete = document.querySelector('#divDelete');


function createNewTask(){
    let newLa = document.createElement("label");
    let newLi = document.createElement("li");
    let newInput = document.createElement("input");
    let newSn = document.createElement("span");
    let newBtn = document.createElement("button");
    let newUl = document.querySelector("#newUl");
    let text;
    newLi.draggable = true;
    newLi.addEventListener('dragstart', (e)=>{
        if(!newInput.checked){
            e.preventDefault()
        }
        else{
            newLi.classList.add("selected");
        }
        
    });
    newLi.addEventListener('dragend', ()=>{newLi.classList.remove('selected')});
    function restoreText(){//повертає текст який було стерто(якщо іншого тексту немає) та вихід з редагування
        if(!newSn.textContent.trim()){
            newSn.textContent = text;
        }
        newSn.contentEditable = false;
    }

    newLi.classList.add('newLi');
    newBtn.classList.add('btnIcon');
    newInput.type = "checkbox";
    newSn.append(inputTask.value);

    newBtn.addEventListener("click", ()=>{
        if(!newSn.isContentEditable){
            newSn.contentEditable = true;
            text = newSn.textContent;
            newSn.focus();
            let range = document.createRange(); //встановлення курсора на кінець рядка
            let selection = window.getSelection();
            range.selectNodeContents(newSn);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        else{
            restoreText();
        }
    });

    newSn.addEventListener('keydown', (e)=>{
        if(e.code == "Enter"){
            restoreText();
            e.preventDefault();
        }
        
    });

    newSn.addEventListener('click',(e)=>{
        if(newSn.isContentEditable){
            e.preventDefault();
        }
    });

    newSn.addEventListener('blur', restoreText);

    newBtn.addEventListener('mousedown',(e)=>{//preventDefault на події mousedown не дає blur спрацювати
        e.preventDefault();
    });

    newLa.append(newInput, newSn);
    newLi.append(newLa, newBtn);
    newUl.append(newLi);
}

function addTask(){
    if(!inputTask.value.trim()){  //trim прибирає пробіли по краях
        valueListTimeout();
        inputTask.focus(); //focus повертає корстувача на поле для вводу
    }
    else{
        inputClearFocusCreateTask();
    }
}

addBtn.addEventListener('click', addTask);

inputTask.addEventListener("click", ()=>{
    inputTask.classList.remove("importantEl");
});

inputTask.addEventListener('keydown', (e)=>{
    if(e.code == "Enter"){
        addTask();
    }
});

function valueListTimeout(){
    inputTask.value = "";
    inputTask.classList.add("importantEl");
    setTimeout(()=>inputTask.classList.remove("importantEl"), 10000);
}

function inputClearFocusCreateTask(){
    createNewTask();
    inputTask.value = '';
    inputTask.focus();
}


divDelete.addEventListener('dragover', (evt)=>{
    evt.preventDefault();
});

divDelete.addEventListener('drop', ()=>{
    document.querySelector('.selected').remove();
})