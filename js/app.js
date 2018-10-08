/*-- FUNCIONES PROPIAS DE LA VISTA --*/
function showNewSearch(){
  $('.back-container').delay(2000).show('slide', { direction: "right" }, 500);
}

function newSearchEvent(){
  $('input[type="text"]').val('');
  $('html, body').animate(
    {
      scrollTop: 0
    },1300, function(){$('.back-container').hide()});
}

/*-- ----------------------------- --*/

/*Funcion de peticion a la API MARVEL*/
function peticion(valueInput){
  var URL = "http://gateway.marvel.com/v1/public/characters?ts=3&apikey=2b36ee461828b80466f69c1731e7099b&hash=0419168e37262d3cdf71d50cc1e29667";
  $.get(URL,{name:valueInput},function(response){
    console.log(response);
    appendHTML(response);
  })
}


/* Función appendHTML que recibe la respuesta de la API como parámetro*/
function appendHTML(response){
  $(".nombre").text(response.data.results[0].name);
  $("#descripcion").text(response.data.results[0].description);
  $("#image").attr("src",response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension)
  $.each(response.data.results[0].comics.items,function(indice,elemento){/*Recoorrer el array de los comics*/
    $("#comics").append("<li><a href='#'>"+elemento.name + "</a></li>")
  })

  $.each(response.data.results[0].series.items,function(indice,elemento){
    $("#series").append("<li><a href='#'>"+elemento.name + "</a></li>")
  })

  $.each(response.data.results[0].stories.items,function(indice,elemento){
    $("#stories").append("<li><a href='#'>"+elemento.name + "</a></li>")
  })

  $.each(response.data.results[0].events.items,function(indice,elemento){
    $("#events").append("<li><a href='#'>"+elemento.name + "</a></li>")
  })

/*-- ANIMACIÓN PROPIA DE LA VISTA, NO MODIFICAR --*/
  $('html, body').animate(
    {
      scrollTop: $("#page2").offset().top
    },1300, showNewSearch);
/*-- ------------------------------------------ --*/
}





/* FUNCIÓN DOCUMENT.READY */
$(function(){
  $(window).scrollTop(0)
  $('input[type="text"]').val('');
  alert("Consultar mas personajes en la url del JSON")
  $('.back-container').click(newSearchEvent);
  $(".input-group-button .button").on("click",function(){
    var valueInput = $('input[type="text"]').val();
    peticion(valueInput);
  })

})
