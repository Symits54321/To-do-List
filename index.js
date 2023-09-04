
// basic elements to be fetched-----

let addButton = document.getElementById('add');             //add button
let input = document.querySelector('#inputText');           //inputtext
let totalTask = document.querySelector('#tasknum');         //Total number of task
let listbox = document.querySelector('#list-section>ul');   //Unorder list





// creating an array to save our list items

let task=[];       // each elements of task must have 
                  // text(string),id(number),completed(boolean)





// function add helps to add text from input-box to task array

function add(){ 
    
       //fetch text from input
    let sentence = input.value;
    input.value='';
    
       //creating object 
    let newtask = {
        text:sentence,
        id:Date.now().toString(),
        completed: false

    }

        //adding to task array
    task.push(newtask);

       //refresh
    refresh(task,'add');



}

function toDelete(id){
    // remove the element from array which matches the corresponding id
    task = task.filter(t => t.id !== id);
    // refresh
    refresh(task,'toDelete');
    // refresh the task number
    setTimeout(refreshTaskNo(),20);
}

function all(){
    // refresh original task
    refresh(task,'all');
   
}

function uncompleted(){
    // filter task completed:false
    let uncompletedTasks = task.filter(t => !t.completed);
    // refresh
    refresh(uncompletedTasks,'uncomp');

}

function completed(){
    // filter task completed:true
    let completedTasks = task.filter(t => t.completed);
    // refresh
    refresh(completedTasks,'comp');
}

function allCompleted(){
    // filter task completed:true
    task.forEach(t => t.completed=true);
    // refresh
    refresh(task,'allcomp');
    refreshTaskNo();
    console.log("allcompleted function working");

}

function clearCompleted(){
    // clear completed:true
   let newtask= task.filter(t => !t.completed);
   task=newtask;
    // refresh
    refresh(task,'clearcomp');
    refreshTaskNo();
    console.log("clearcompleted function working");

}

function refresh(arr,path){

    // delete everything inside listbox
            listbox.innerHTML = '';
   
    // iterating task array for each operation.
    for(let i=0; i<arr.length; i++){
        
        // fetch object(text,id,completed) from arr array
        let eacharr = arr[i];


        // create li (add id of chechbox and delete as object's id )

        let list = document.createElement('li');
       
        if(!eacharr.completed){                  //to check the task is completed or not 
            list.innerHTML = `
                <div id="${eacharr.id}" class="mycheckbox"></div>                   
                <div class="textline">${eacharr.text}</div>
                <button class="toDelete" id="${eacharr.id}">X</button> 
            `;
        }else{                                                             //adding checked class
            list.innerHTML = `
                <div id="${eacharr.id}" class="mycheckbox checked"></div>                   
                <div class="textline">${eacharr.text}</div>
                <button class="toDelete" id="${eacharr.id}">X</button> 
        `;
        }



                //fade in animation

                
            if(i===(arr.length-1) && path=='add'){
            list.classList.add('fade-in');
            }else{
                list.classList.remove('fade-in');
            }
            
                //append in ul(listbox)
                listbox.appendChild(list);

    }


    
    // refresh the task number
     refreshTaskNo();
     
    // to make delete button diplay: (none/block) according to mouseout/mouseover 
    listHover();    
}

function refreshTaskNo(){

    let taskNo=0;     

   
    for(let i=0; i<task.length; i++){

          //fetch object(text,id,completed) from arr array
            let eachTask = task[i];
            if(eachTask.completed){
                taskNo++;
            }
           totalTask.innerText=taskNo;
     }
  
     totalTask.innerText=taskNo;
}

function toggleCheck(id){
    // find the task and mark it as completed
    let taskItem = task.find(t => t.id === id);
    if(taskItem) {
        taskItem.completed = !taskItem.completed;
        console.log(taskItem.completed);
    }
    console.log("check function working");
    // refresh
    refresh(task,'toggle');
    // refresh the task number
    refreshTaskNo();
}

// hover effect to show/hide -- delete button
function listHover(){
    // Get all the li elements
    const listItems = document.querySelectorAll('li');

    // Add a mouseover event listener to each li element
    listItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            // Get the delete button for the current li element
            const deleteButton = item.querySelector('.toDelete');
            // Set the display property of the delete button to block
            deleteButton.style.display = 'block';
        });
        item.addEventListener('mouseout', () => {
            // Get the delete button for the current li element
            const deleteButton = item.querySelector('.toDelete');
            // Set the display property of the delete button to block
            deleteButton.style.display = 'none';
        });
    });

}

// the actual event listener function that manages all clicks(mouse/key)
function allInputClick(e){
   
    let key = e.key;
    let clicked = e.target;

    // Add button
      if(key =='Enter' || clicked.id == 'add'){
        if(input.value){
                 add();
        }
      }
       

    // delete button
    if (clicked.className === 'toDelete') {
        toDelete(clicked.id);
    }
  
  
    //checkmark
    if (clicked.parentNode.tagName === 'LI' &&!clicked.classList.contains('toDelete')) {
        let parent = clicked.parentNode;
        let checkbox = parent.querySelector('.mycheckbox');
        let id = checkbox.id;
        toggleCheck(id);
      
      }

    // All
    if(clicked.id === 'all'){    
        all();
    }

    // Uncompleted
    if(clicked.id === 'completed'){   
         completed(); 
    }

    // Completed
    if(clicked.id === 'uncompleted'){ 
        uncompleted();   
    }

      console.log(clicked);

    // allCompleted
    if(clicked.id === 'allcompleted'){
        allCompleted();   
    }

    // clear completed
    if(clicked.id === 'clearcompleted'){ 
        clearCompleted();   
    }

    
}

// addeventlistener fetching all click and keydown

document.addEventListener('click',allInputClick);
document.addEventListener('keydown',allInputClick);
