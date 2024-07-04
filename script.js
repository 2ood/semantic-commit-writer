const easyMDE = new EasyMDE({minWidth : "500px", placeholder: "(Optional) Detailed description of the commit."});

window.onload = () => {

const input_type = document.getElementById("commit_type");
const input_title = document.getElementById("commit_title");
const input_issue = document.getElementById("commit_issue");

const button_generate = document.getElementById("generate");
const button_copy = document.getElementById("copy");

var validationCheck = ()=>{
    if(input_type.value!="unchosen" && input_title.value.length>0) {
        if(button_generate.classList.contains("disabled")){
            button_generate.classList.remove("disabled");
            button_generate.classList.remove("btn-secondary");
            button_generate.classList.add("btn-primary");
            button_generate.innerHTML="Generate!";
        }
    }
    else {
        if(!button_generate.classList.contains("disabled")){
            button_generate.classList.add("disabled");
            button_generate.classList.remove("btn-primary");
            button_generate.classList.add("btn-secondary");
            button_generate.innerHTML="Fill the blanks to generate";
        }
    }
};

input_type.addEventListener("change",validationCheck);
input_title.addEventListener("change",validationCheck);


button_generate.addEventListener("click",()=>{
    let type = input_type.value;
    let issue = input_issue.value;
    let title = input_title.value;
    let desciption = easyMDE.value();

    console.log(type+" "+issue+" "+title+" "+desciption);
});

button_copy.addEventListener("click",()=>{

});
}