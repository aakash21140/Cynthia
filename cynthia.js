var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function firstPageAnim(){
    var tl= gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        dealy:-1,
        ease: Expo.easeInOut
    })    
}

// jab mouse move ho toh hum log skew kar paye aur maximum skew and minumum skew 
//define kar paye, jab mouse move ho to chapta ki value badhe , aur jab mouse 
//chalna band ho jaye toh chapta hat jaye


function circleChaptaKaro(){
//define default scale value
var xscale = 1;
var yscale=1;

//peechla value pe mouse kaha tha
var xprev = 0;
var yprev= 0; 

window.addEventListener("mousemove", function(dets){
    clearTimeout(timeout); //peechla timeout clear
        
    //clamp se the nearest value for the input value
        xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

        xprev = dets.clientX; //new xprevious will be updated one 
        yprev = dets.clientY; //new yprevous will be udated one

        circleMouseFollower(xscale,yscale);
        
        timeout = setTimeout(function (){
            document.querySelector( "#minicircle").style.transform = 
      `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        },100);
    });
}

circleChaptaKaro();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector( "#minicircle").style.transform = 
      `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }
  
  circleMouseFollower();
  firstPageAnim();


  //teeno element ko select karo , useke baad teeno par ek 
  //moousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par
  //hai,jiska mtlb mouse ki x and y positon pata karo,
  //ab mouse ki x y position ke badle udd imshr kok show karo and us 
  //imshr ko movr ksto , mobr karte waqt rotate karo and jaise 
  //jaise mouse chae waise waise rotaion bhe tez ho jaye


  document.querySelectorAll(".elem")
  .forEach(function(elem) {

    var rotate =0;
    var diffrot = 0;
    elem.addEventListener("mouseleave",function (dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function(details) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot* 5),
        });
    });
  });
  