// Juros Compostos
function calculate(){
    var field1=document.getElementById("vi").value;
    var field2=document.getElementById("jp").value;
    var field3=document.getElementById("qm").value;

    var result=parseFloat(field1)*(1+(parseFloat(field2)/100))**field3;

    if(!isNaN(result)){
        document.getElementById("composto").innerHTML="Valor Final: R$ "+result.toFixed(2);
    }
}
// juro simples
function calculate1(){
    var field1=document.getElementById("vi1").value;
    var field2=document.getElementById("jp1").value;
    var field3=document.getElementById("qm1").value;

    var result=parseFloat(field1)*(parseFloat(field2)/100)*field3;

    if(!isNaN(result)){
        document.getElementById("simples").innerHTML="Valor Final: R$ "+result.toFixed(2);
    }
}
// Calculo de investimento
function calculate2(){
    var field1=document.getElementById("vi2").value;
    var field2=document.getElementById("jp2").value;
    var field3=document.getElementById("qm2").value;

    var result=parseFloat(field1)*(parseFloat(field2)/100)*field3;

    if(!isNaN(result)){
        document.getElementById("investimento").innerHTML="Valor Final: R$ "+result.toFixed(2);
    }
}
// Juros efetivos price
function calculate3(){
    var field1=document.getElementById("vi3").value;
    var field2=document.getElementById("jp3").value;
    var field3=document.getElementById("qm3").value;

    var result=parseFloat(field1)*(parseFloat(field2)/100)*field3;

    if(!isNaN(result)){
        document.getElementById("efetivos").innerHTML="Valor Final: R$ "+result.toFixed(2);
    }
}
// financiamento price
function calculate4(){
    var field1=document.getElementById("vi4").value;
    var field2=document.getElementById("jp4").value;
    var field3=document.getElementById("qm4").value;

    var result=parseFloat(field1)*(parseFloat(field2)/100)*field3;

    if(!isNaN(result)){
        document.getElementById("financiamento").innerHTML="Valor Final: R$ "+result.toFixed(2);
    }
}
// Financiamento sac
function calculate5(){
    var field1=document.getElementById("vi5").value;
    var field2=document.getElementById("jp5").value;
    var field3=document.getElementById("qm5").value;

    var result=parseFloat(field1)*(parseFloat(field2)/100)*field3;

    if(!isNaN(result)){
        document.getElementById("sac").innerHTML="Valor Final: R$ "+result.toFixed(2);
    }
}

// mascara de valor
$(document).ready(function(){
    $('.money').mask('#0,00', {reverse: true});  
    $('.percent').mask('##0,00%', {reverse: true});
    $('.integer').mask('#', {reverse: true});
    $('.dateFormat').mask('00/0000', {reverse: false});
});


//botao flutuante
$(function() {
    $('.btn-group-fab').on('click', '.btn', function() {
      $('.btn-group-fab').toggleClass('active');
    });
    $('has-tooltip').tooltip();
  });
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
  })

//calendario
$(".datepicker").datepicker( {
    format: "mm/yyyy",
    minViewMode: "months",
    language: "pt-BR",
    autoclose: true 
});

// Chartjs
//Grafico Despesas
new Chart(document.getElementById("doughnut-chart-expense"), {
    type: 'doughnut',
    data: {
      labels: ["Familia"],
      datasets: [
        {
          backgroundColor: ["#c45850"],
          data: [80]
        }
      ]
    },
    options: {
        title: {
            display: true,
            text: 'Valores em R$'
        }
    }
});
//Grafico Receitas
new Chart(document.getElementById("doughnut-chart-income"), {
    type: 'doughnut',
    data: {
      labels: ["Outros"],
      datasets: [
        {
          backgroundColor: ["#5ce1e6"],
          data: [286]
        }
      ]
    },
    options: {
        title: {
            display: true,
            text: 'Valores em R$'
        }
    }
});
