  var header = "white";
  var decelerationCurve = [0.0, 0.0, 0.2, 1];
  var accelerationCurve = [0.4, 0.0, 1, 1];
  var sharpCurve = [0.4, 0.0, 0.6, 1];
  var standardCurve = [0.4, 0.0, 0.2, 1];
  var open = false;
  var animating = false;
  var animSpeed = 205;
$(function(){

  $(".widget").click(function(){
    console.log("nigga");
    if (!animating){
      if (!open){
        animating = true;
        $(".widget").animate({"right":"-220px"}, animSpeed, $.bez(sharpCurve));
        $(".widget__content").animate({"height":"30px", opacity:'0'}, animSpeed, $.bez(sharpCurve),function(){
          animating = false;
        });
        open = true;
      } else {
        animating = true;
        $(".widget").animate({"right":"-0px"}, animSpeed, $.bez(decelerationCurve));
        $(".widget__content").animate({"height":"126px", opacity:'1'}, animSpeed, $.bez(sharpCurve),function(){
          animating = false;
        });
        open = false;
      }
    }
  });

  // ScrollMagic
  var controller = new ScrollMagic.Controller();

  var i1 = 0;
  var i2 = 0;

  var scene = new ScrollMagic.Scene()
  .addTo(controller)
  .on("update", function() {
    if($(window).width() > 1025){
      var x1 = controller.info("scrollDirection");
      var x2 = $(window).scrollTop();
      var x3 = 1600;

      console.log(header);
          if ( x1 == "REVERSE" && x2 >= x3 && i1 == 0 ) {
              TweenLite.to(".header", 0.24, {position:"fixed", color:"white",  top: "0px",delay:.2,  ease:  $.bez(accelerationCurve), onComplete:headerBlack});
              TweenLite.to(".header__logo--white", 0, {opacity:'1', ease:  $.bez(accelerationCurve)});
              TweenLite.to(".header__logo", 0, {opacity:'0', ease:  $.bez(accelerationCurve)});
              i1++;
              i2 = 0;
          }
          if ( x1 == "REVERSE" && x2 == 0 && header == "black") {
              TweenLite.fromTo(".header", 0.6, { position:"relative", top: "0px"}, {color:"rgb(34, 34, 34)", background:"rgb(255,255,255)",top: "0px", ease:  $.bez(accelerationCurve), onComplete:headerWhite});
              TweenLite.fromTo(".header__logo", 0.6, { opacity:"0"}, {opacity:'1', ease:  $.bez(accelerationCurve)});
              TweenLite.fromTo(".header__logo--white", 0.6, { opacity:"1"}, {opacity:'0', ease:  $.bez(accelerationCurve)});
              i1 = 0;
              i2 = 0;
            }

          if ( x1 == "FORWARD" && x2 <= x3 ) {
              TweenLite.to( ".header", 0.4, {position:"relative", background: "white", top:"0px", ease: $.bez(accelerationCurve) });
              i1 = 0;
              i2 = 0;
          } else if ( x1 == "FORWARD" && x2 >= x3 ) {
              TweenLite.to( ".header", 0.2, {background: "rgb(34, 34, 34)", top: "-130px", ease: $.bez(accelerationCurve)});
              i1 = 0;
              i2 = 0;
          }
    }
  });

});
$(function(){
  $(".nav-icon").click(function(){
    console.log("ex");
    $('.header').toggleClass("active");
  });
  $(".footer__back-to-top").click(function(){
    $("html, body").animate({scrollTop:"0px"},1000, $.bez(accelerationCurve));
  });
});
function headerBlack(){
  header = 'black';
  console.log('header changed to '+header);
}
function headerWhite(){
  header = 'white';
  console.log('header changed to '+header);
}
