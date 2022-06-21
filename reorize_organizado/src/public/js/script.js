// Juros Compostos
function calculate(){
    var field1=document.getElementById("vi").value;
    var field2=document.getElementById("jp").value;
    var field3=document.getElementById("qm").value;

    var result=parseFloat(field1)*(1+(parseFloat(field2)/100))**field3;
    var result=parseFloat(field1)+result;

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
    var result=parseFloat(field1)+result;

    if(!isNaN(result)){
        document.getElementById("simples").innerHTML="Valor Final: R$ "+result.toFixed(2);
    }
}
// Calculo de porcentagem
function calculate2(){
    var field1=document.getElementById("vi2").value;
    var field2=document.getElementById("jp2").value;

    var result=100*(parseFloat(field2)-parseFloat(field1))/parseFloat(field1);

    if(!isNaN(result)){
        var x = result>0 ? "Lucro de: R$ " : result==0 ? "Valor : R$ " : "Prejuizo de: R$ ";
        document.getElementById("porcentagem").innerHTML= x +result.toFixed(2);
    }
}
// Conversão Mensal
function calculate3(){
    var field1=document.getElementById("vi3").value;
    
    var result=100*((1+parseFloat(field1)/100)**12-1);    

    if(!isNaN(result)){
        document.getElementById("convercaoM").innerHTML="Resultado Anual: % "+result.toFixed(3);
    }
}
// Conversão Anual
function calculate4(){
    var field1=document.getElementById("vi4").value;

    var result=100*((1+parseFloat(field1)/100)**(1/12)-1);

    if(!isNaN(result)){
        document.getElementById("conversaoA").innerHTML="Resultado Mensal: % "+result.toFixed(3);
    }
}

// mascara de valor
$(document).ready(function(){
    $('.money').mask('#0.00', {reverse: true});  
    $('.percent').mask('##0.00%', {reverse: true});
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
    autoclose: true,
    onselect: function(dateText) {
        $(this).change();
    }
}).change(function() {
    let params = (new URL(document.location)).searchParams;
    let names_url = params.get("account");
    window.location.href = "?account=" + names_url + "&calendar=" + this.value;
})