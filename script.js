const easyMDE = new EasyMDE({minWidth : "500px", placeholder: "(Optional) Detailed description of the commit."});

window.onload = () => {

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

input_type.addEventListener("change",validationCheck);
input_title.addEventListener("change",validationCheck);

for(var i=0; i<clearables.length;i++) {
    clearables[i].addEventListener("input",controlClearButton);
}
easyMDE.codemirror.on("change", controlClearButton);

button_generate.addEventListener("click",()=>{
    let type = input_type.value;
    let issue = input_issue.value;
    let title = input_title.value;
    let desciption = easyMDE.value();

    console.log(type+" "+issue+" "+title+" "+desciption);
});

button_copy.addEventListener("click",()=>{

});

button_clear.addEventListener("click",()=>{
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
})
}