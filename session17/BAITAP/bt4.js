let savedData = localStorage.getItem("myTodo");

let todo = savedData ? JSON.parse(savedData) : [
    { id: 1, task: "Mua bánh chưng", done: false }, 
    { id: 2, task: "Dọn nhà đón Tết", done: false },
    { id: 3, task: "Gói bánh chưng", done: false }, 
    { id: 4, task: "Trang trí nhà cửa bằng hoa mai, hoa đào", done: false },
    { id: 5, task: "Mua phong bao lì xì", done: false },
    { id: 6, task: "Chuẩn bị mâm ngũ quả", done: false },
];
function showList(){
    let blankArray = "";
    for(let i =0;i<todo.length;i++){
        blankArray+=`
            <label class="list-item ${todo[i].done ? "active": ""}">
                <input type="checkbox" class="task-checkbox" onclick = "clickDone(${i})" ${todo[i].done ? "checked": ""}>
                <span class="task-text">${todo[i].task}</span>
                <button type = "submit" onclick = "clickDel(${todo[i].id})" class = "delBtn"> 🗑️ </button>
            </label>
        `
    }
    document.getElementsByClassName("card-body")[0].innerHTML = blankArray;
    localStorage.setItem("myTodo",JSON.stringify(todo));
}
showList();
function clickDone(index){
    todo[index].done = !todo[index].done;
    showList();
}
function addTask(){
    let createId  = 6;
    let blankObj = {
        id: ++createId,
        task: document.getElementById("taskInput").value,
        done: false,
    }
    todo.push(blankObj);
    showList();
}
function clickDel(index){
    if(confirm("Wanna delete this?")){
        for(let i =0;i<todo.length;i++){
            if(todo[i].id==index){
                todo.splice(i,1);
            }
        }
    }
    showList();
}
