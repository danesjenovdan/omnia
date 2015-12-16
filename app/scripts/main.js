function hoursUntilMidnight() {
    var midnight = new Date();
    midnight.setHours( 24 );
    midnight.setMinutes( 0 );
    midnight.setSeconds( 0 );
    midnight.setMilliseconds( 0 );
    return Math.ceil(( midnight.getTime() - new Date().getTime() ) / 1000 / 60 / 60);
}

$(document).ready(function() {

    $('.thetime').text(hoursUntilMidnight());

  initmap();

  $('.zavesa .button').on('click', function() {
    $('.zavesa').animate({
      'top': -1000
    }, 600);

    $('.header .circle').removeClass('hidden');
  });

  $('#themap').on('click', '.namera', function() {
    window.open('http://www.dvk-rs.si/files/files/Obr05_glasovanje_izven_okraja.pdf', '_blank');

    $('.stepone').addClass('hidden');
    $('.steptwo').removeClass('hidden');
    $('.header .circle').addClass('hidden');

    $('.zavesa').animate({
      'top': 75
    }, 600);
  });

  // generate social

  $('body').on('click', '.fb', function() {
    var url = 'https://www.facebook.com/dialog/share?app_id=301375193309601&display=popup&href=' + encodeURIComponent(document.location.href) + '&redirect_uri=' + encodeURIComponent(document.location.href) + '&ref=responsive';
    window.open(url, '_blank');
    return false;
  });

  $('body').on('click', '.tw', function() {
    var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('Imaš manj kot ' + hoursUntilMidnight() + ' ur, da sporočiš, kje boš glasoval/-a. Povsod si lahko ZA! ' + document.location.href);
    window.open(url, '_blank');
    return false;
  });

  $('body').on('click', '.email', function() {
    var url = 'mailto:?subject=Imaš manj kot ' + hoursUntilMidnight() + ' ur, da sporočiš, kje boš glasoval/-a.&body=Zemljevid OMNIA volišč za volilce/-ke, ki bodo glasovali/-e v Sloveniji, toda izven volilnega okraja stalnega prebivališča. Povsod si lahko ZA!' + document.location.href;
    window.open(url, '_blank');
    return false;
  });

});
