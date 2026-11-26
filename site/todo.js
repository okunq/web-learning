let inputTask = document.querySelector("#inputTask");
let addBtn = document.querySelector("#addBtn");
let listDiv = document.querySelector("#listDiv");

function createNewTask(){
    let newLa = document.createElement("label");
    let newLi = document.createElement("li");
    let newInput = document.createElement("input");
    let newSn = document.createElement("span");
    let newBtn = document.createElement("button");
    let newUl = document.querySelector("#newUl");
    let text;
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
            console.log("enter закінчив редагування")
        }
        
    });

    newSn.addEventListener('click',(e)=>{
        if(newSn.isContentEditable){
            e.preventDefault();
            console.log("клік не дає стан checked")
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

addBtn.addEventListener('click', ()=>{
    if(!inputTask.value.trim()){  //trim прибирає пробіли по краях
        inputTask.classList.add("importantEl");
        inputTask.value = "";
        inputTask.focus(); //focus повертає корстувача на поле для вводу
        setTimeout(()=>inputTask.classList.remove("importantEl"), 10000)
    }
    else{
        createNewTask();
        inputTask.value = '';
        inputTask.focus();
    }

});

inputTask.addEventListener("click", ()=>{
    inputTask.classList.remove("importantEl");
});

inputTask.addEventListener('keydown', function(e){
    if(e.code == "Enter" && inputTask.value.trim()){
        createNewTask();
        inputTask.value = '';
        inputTask.focus();
    }
    if(e.code == "Enter" && !inputTask.value.trim()){
        inputTask.value = '';
        inputTask.classList.add("importantEl");
        setTimeout(()=>inputTask.classList.remove("importantEl"), 10000);
    }
});

