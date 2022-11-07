var previsao1 = ""
var cam = document.getElementById('camera');
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
 });
 Webcam.attach('#camera');
 function capturar() {
    Webcam.snap( function(data_uri) {
        // display results in page
        document.getElementById('results').innerHTML = 
         '<img src="'+data_uri+'" id="imgcapturada" />';

    } );       
}
console.log('ml5 version: ', ml5.version);
alert('Enable your webcam!');
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tK0jnWoNl/model.json', modelLoaded);
function modelLoaded() {
    console.log("modelo carregado 👍");
}
function speech() {
 var sintetizador = window.speechSynthesis;
 var txt1 = 'A previsão é: ' + previsao1;
 var speak = new SpeechSynthesisUtterance(txt1);
 sintetizador.speak(speak);
}
function check() {
    var img = document.getElementById('imgcapturada');
    classifier.classify(img, obtainResults);
}
function obtainResults(error, results) {
    if (error) {
        console.error('Error at line 35 "function obtainResults(error, results)"');
        console.error('error: ' + error);
    }
    else{
        console.log('Operation Completed. Results: ' + results);
        previsao1 = results[0].label;
        document.getElementById('resultadoemocao').innerHTML = previsao1;
         speech()
         // 1ª Previsão
         if (previsao1 == 'Vitória') {
            document.getElementById('updateEmoji').innerHTML ='&#9996;'
           }
           if (previsao1 == 'Joia') {
            document.getElementById('updateEmoji').innerHTML ='&#128077;'
           }
           if (previsao1 == 'Hang Loose') {
            document.getElementById('updateEmoji').innerHTML ='&#129305;'
           }
           
    }
   
}