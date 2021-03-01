// Your JS Script here
function readInputFromText() {

    const textFromInput = document.getElementById("InputText").value
    if (textFromInput) {
        document.getElementById("viewerText").innerText = textFromInput
    }else{
        alert("Escreva alguma coisa")
    }
}