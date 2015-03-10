/**
 * @preserve Responsi – Making responsive and retina-ready images easy, lightweight and asynchronous.
 * @version 0.1.1
 * @author Emanuele Feliziani – emanuele@gravida.pro – http://gravida.pro
 * @homepage https://github.com/GioSensation/responsi
 * @license MIT License
 */
var responsi={viewport:document.documentElement.clientWidth,dpi:window.devicePixelRatio||1,init:function(e){function t(e){var t=e.getAttribute("data-responsi-"+r)||e.getAttribute("data-responsi-large")||e.getAttribute("data-responsi-medium")||e.getAttribute("data-responsi-small");return t}function s(e){var t;return t=e.hasAttribute("data-responsi-alt")?e.getAttribute("data-responsi-alt"):document.title}var i=this.viewport,a=this.dpi,r="large",n={phones:480,tabs:768,laps:1200,desks:1900};e="undefined"!=typeof e?e:n,(i<=e.phones||i<e.tabs&&1.5>a)&&(r="small"),(i>e.phones&&i<e.laps&&a>1.5||i>=e.tabs&&i<e.desks&&1.5>a)&&(r="medium"),(i>=e.laps&&a>1.5||i>=e.desks)&&(r="large");var o=document.querySelectorAll(".responsi-img");[].forEach.call(o,function(e){if(t(e)){var i=new Image;i.src=t(e),i.alt=s(e),e.appendChild(i),e.classList.remove("responsi-img")}});var l=document.querySelectorAll(".responsi-bg-img");[].forEach.call(l,function(e){var s=t(e);e.style.backgroundImage="url("+s+")",e.classList.remove("responsi-bg-img")})}};