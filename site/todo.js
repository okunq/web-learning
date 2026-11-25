let inputTask = document.querySelector("#inputTask");
let addBtn = document.querySelector("#addBtn");
let listDiv = document.querySelector("#listDiv");

function createNewTask(){
    let newLa = document.createElement("label");
    let newLi = document.createElement("li");
    let newInput = document.createElement("input");
    let newUl = document.querySelector("#newUl");
    newLi.classList.add('newLi');
    newLa.classList.add('newLi');
    newInput.type = "checkbox";
    newLa.append(newInput, inputTask.value);
    newLi.append(newLa);
    newUl.append(newLi);

}
addBtn.addEventListener('click', ()=>{
    if(!inputTask.value.trim()){  //trim прибирає пробіли
        inputTask.classList.add("importantEl");
        inputTask.focus(); //focus повертає корстувача на поле для вводу
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
})

