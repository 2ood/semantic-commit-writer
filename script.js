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

const modal = document.getElementById("result_modal");
const command_display = document.getElementById("command_display");
const modal_title = document.getElementById("modal_title");
const spinner = document.getElementById("spinner");

//global param
let full_command = "";

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
    const type = input_type.value;
    const title = input_title.value;
    const desciption = easyMDE.value();

    const is_advanced_mode = advanced_enabled.checked;
    let breaking = "";
    let scope = "";
    let issue = "";

    if(is_advanced_mode) {
        if(advanced_breaking.checked) breaking = "!";
        if(advanced_scope.value.length>0) scope = `(${advanced_scope.value})`;
        if(advanced_issue.value.length>0) issue = `(#${advanced_issue.value})`;
    }

    let command_desc = "";
    if (desciption.length>0) command_desc=" -m \""+desciption+"\"";
    
    const command_title = type+scope+breaking+ " : "+title+issue;
    full_command = "git commit -m \""+command_title+"\""+command_desc;

    spinner.classList.add("visually-hidden");
    command_display.value=full_command;
    modal_title.textContent="Command is generated!";
    command_display.classList.remove("visually-hidden");
};


/** 
 * @name copyCommand
 * @function
 * @description function for copying the generated command to clipboard.
 */
var copyCommand = () =>{
    navigator.clipboard.writeText(full_command).then(()=>{
        const popover = bootstrap.Popover.getOrCreateInstance("#copy");
        popover.show();
        setTimeout(()=>{popover.hide();},2000);
    });
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

        advanced_enabled.checked = false;
        advanced_breaking.checked = false;
        advanced_issue.value = "";
        advanced_scope.value = "";

        button_clear.classList.add("disabled");
        button_clear.classList.add("btn-outline-danger");
        button_clear.classList.remove("btn-danger");

        validationCheck();
    }
}

/**
 * @name reinitailizeModal
 * @function
 * @description turns back the modal into default state.
 */

var reinitailizeModal = ()=>{
    modal_title.textContent="Generating...";
    command_display.value="If you see this, there was an error in finishing generation.";
    command_display.classList.add("visually-hidden");
    spinner.classList.remove("visually-hidden");
}

// adding event listeners to input doms.
input_type.addEventListener("change",validationCheck);
input_title.addEventListener("input",validationCheck);
easyMDE.codemirror.on("change", controlClearButton);

//event listeners for clear button enablization.
for(var i=0; i<clearables.length;i++) {
    clearables[i].addEventListener("input",controlClearButton);
}

// linking buttons to their corresponding executing functions.
button_generate.addEventListener("click",generateCommand);
button_copy.addEventListener("click",copyCommand);
button_clear.addEventListener("click",clearInputs);

// modal functionality stabilization.
modal.addEventListener("hidden.bs.modal",reinitailizeModal);
}