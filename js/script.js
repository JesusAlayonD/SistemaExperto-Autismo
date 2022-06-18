// Obtener todos los elementos
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");


// Si das clic en Test (Botón principal)
start_btn.onclick = () => {
    // Ocultar el botón principal
    start_btn.classList.add("inactive");
    // Mostrar info
    info_box.classList.add("activeInfo"); // Mostar la info box
}


// Si das clic en Salir
exit_btn.onclick = () => {
    // Mostrar el botón principal
    start_btn.classList.remove("inactive");
    // Ocultar info
    info_box.classList.remove("activeInfo"); // Ocultar la info box
}


// Si das clic en Continuar
continue_btn.onclick = () => {
    // Ocultar info
    info_box.classList.remove("activeInfo");
    // Mostrar el formulario
    quiz_box.classList.add("activeQuiz");
    // Mandar a llamar las preguntas y empezar a contar las preguntas
    showQuestions(0);
    queCounter(0);
    // Desactivar el siguiente hasta tener una respuesta
    next_btn.classList.add("disable");
}

let cont1 = 0;  // Si
let cont2 = 0;  // No
let que_cont = 0;  // Total de preguntas
let statusP = 0;  // El status de la pregunta actual (Si 1 /No 2)


const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = () => {
    // Desactivar el siguiente hasta tener una respuesta
    next_btn.classList.add("disable");
    // Retirar el estado de checked de las opciones
    option_list.children[0].classList.remove("checked");
    option_list.children[1].classList.remove("checked");


    // Sumar los valores de preguntas
    if(statusP == 1){
        cont1+= questions[que_cont].value
    } else {
        cont2+= questions[que_cont].value
    }
    console.log(cont1)
    console.log(cont2)
    

    // Aumentar las preguntas para irlas mostrando
    if(que_cont < questions.length - 1){
        que_cont++;
        showQuestions(que_cont);
        queCounter(que_cont);
    } else {
        console.log("Over")
    }
    

}


// Obtener las preguntas
const showQuestions = (index) => {
    const que_Text =  document.querySelector(".que_text");
    let que_Tag = '<span>' + questions[index].question + '</span>';
    que_Text.innerHTML = que_Tag;
    const option = option_list.querySelectorAll(".option");

    // Mandar la opción escogida
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


const optionSelected = (answer) => {
    // Activar el siguiente hasta tener una respuesta
    next_btn.classList.remove("disable");
    // Si la opción es la primera (Si) entonces marcar la segunda
    if (option_list.children[0] == answer){
        option_list.children[0].classList.add("checked");
        option_list.children[1].classList.remove("checked");
    } else {
        option_list.children[1].classList.add("checked");
        option_list.children[0].classList.remove("checked");
    }
    
    let userAns = answer.textContent;

    // Establecer el status 
    if(userAns == "Si"){
        statusP = 1;
    } else {
        statusP = 0;
    }
}


const queCounter = (index) => {
    // Se muestra el número de preguntas
    let totalQueCounTag = '<span>Pregunta <p>'+ (index+1) +'</p></span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // Actualizando
}