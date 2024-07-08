const easyMDE = new EasyMDE({minWidth : "500px", placeholder: "(Optional) Detailed description of the commit."});

window.onload = () => {

// locate doms
const input_type = document.getElementById("commit_type");
const input_title = document.getElementById("commit_title");

const advanced_enabled = document.getElementById("advanced_enabled");
const advanced_breaking = document.getElementById("advanced_breaking");
const advanced_issue = document.getElementById("advanced_issue");
const advanced_scope = document.getElementById("advanced_scope");

const button_generate = document.getElementById("generate");
const button_copy = document.getElementById("copy");
const button_clear = document.getElementById("clear");

const clearables = document.getElementsByClassName("clearable");

/**
 * @name validationCheck
 * @function
 * @description function that checks if required inputs are filled.
 * This generator's required arguments are : commit type and title.
 * every time this function is called (by 'onchange' event)
 * it checks if input_type and input_title is changed and properly filled.
 * It then enables the generate button only when both input is ready.
 */
var validationCheck = ()=>{
    if(input_type.value!="unchosen" && input_title.value.length>0) {
        if(button_generate.classList.contains("disabled")){
            button_generate.classList.remove("disabled");
            button_generate.classList.remove("btn-secondary");
            button_generate.classList.add("btn-primary");
        }
    }
    else {
        if(!button_generate.classList.contains("disabled")){
            button_generate.classList.add("disabled");
            button_generate.classList.remove("btn-primary");
            button_generate.classList.add("btn-secondary");
        }
    }
};


/**
 * @name controlClearButton
 * @function
 * @description This function controls clear button.
 * The clear button is enabled only when any of the inputs on control is filled.
 */
var controlClearButton = () =>{
    const type_empty = (input_type.value=="unchosen");
    const title_empty = (input_title.value=="");
    const desc_empty = (easyMDE.value()=="");
    const breaking_empty = !(advanced_breaking.checked);
    const issue_empty = (advanced_issue.value=="");
    const scope_empty = (advanced_scope.value=="");

    const all_empty = type_empty&&title_empty&&desc_empty&&breaking_empty&&issue_empty&&scope_empty;

    if(!all_empty) {
        if(button_clear.classList.contains("disabled")){
            button_clear.classList.remove("disabled");
            button_clear.classList.remove("btn-outline-danger");
            button_clear.classList.add("btn-danger");
        }
    } else {
        if(!button_clear.classList.contains("disabled")) {
            button_clear.classList.add("disabled");
            button_clear.classList.add("btn-outline-danger");
            button_clear.classList.remove("btn-danger");
        }
    }
};

/**
 * @name generateCommand
 * @function
 * @description function for generating the command and showing 
 * it on the modal.
 */

var generateCommand = () =>{
    let type = input_type.value;
    let issue = input_issue.value;
    let title = input_title.value;
    let desciption = easyMDE.value();

    console.log(type+" "+issue+" "+title+" "+desciption);
};


/** 
 * @name copyCommand
 * @function
 * @description function for copying the generated command to clipboard.
 */
var copyCommand = () =>{

}

/**
 * @name clearInputs
 * @function
 * @description function for clearing all the inputs into initial state.
 */

var clearInputs  = () => {
    if(confirm("Do you really want to clear all the inputs?")==true) {
        input_type.value="unchosen";
        input_title.value="";

        easyMDE.value("");

        advanced_breaking.checked = false;
        advanced_issue.value = "";
        advanced_scope.value = "";

        button_clear.classList.add("disabled");
        button_clear.classList.add("btn-outline-danger");
        button_clear.classList.remove("btn-danger");
    }
}

// adding event listeners to input doms.
input_type.addEventListener("change",validationCheck);
input_title.addEventListener("input",validationCheck);
easyMDE.codemirror.on("change", controlClearButton);

//event listeners for clear button enablization.
for(var i=0; i<clearables.length;i++) {
    clearables[i].addEventListener("input",controlClearButton);
}

// linking buttons to its executing functions.
button_generate.addEventListener("click",generateCommand);
button_copy.addEventListener("click",copyCommand);
button_clear.addEventListener("click",clearInputs);
}