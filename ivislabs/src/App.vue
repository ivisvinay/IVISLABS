<template>
<NavBar/>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
}
/* Google Fonts - Poppins */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

  :root{
  --primary-color:#edf2fc;
  --secondary-color:#282828;
  /* --secondary-color:#212121; */
}

.dark-theme {
  --primary-color:#282828;
  --secondary-color:#fff;
}

.container {
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e3f2fd;
}
.testimonial {
  position: relative;
  max-width: 900px;
  width: 100%;
  padding: 50px 0;
  overflow: hidden;
}
.testimonial .image {
  height: 170px;
  width: 170px;
  object-fit: cover;
  border-radius: 50%;
}
.testimonial .slide {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 30px;
  height: 100%;
  width: 100%;
}
.slide p {
  text-align: center;
  padding: 0 160px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
}
.slide .quote-icon {
  font-size: 30px;
  color: #4070f4;
}
.slide .details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.details .name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.details .job {
  font-size: 12px;
  font-weight: 400;
  color: #333;
}
/* swiper button css */
.nav-btn {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transform: translateY(30px);
  background-color: rgba(0, 0, 0, 0.1);
  transition: 0.2s;
}
.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.nav-btn::after,
.nav-btn::before {
  font-size: 20px;
  color: #fff;
}
.swiper-pagination-bullet {
  background-color: rgba(0, 0, 0, 0.8);
}
.swiper-pagination-bullet-active {
  background-color: #4070f4;
}
@media screen and (max-width: 768px) {
  .slide p {
    padding: 0 20px;
  }
  .nav-btn {
    display: none;
  }
}

@media (min-height:950px){
  .container {
    height: 50vh;
  }
}
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto";
}

:root{
  --primary-color:#edf2fc;
  --secondary-color:#282828;
}

.dark-theme {
  --primary-color:#282828;
  --secondary-color:#fff;
}

body {
  /* background-image: url(assets/background.jpg); */
  background-size: cover;
  background-position: right center;
  background-color: var(--primary-color);
}

.logo img {
  width: 100px;
  margin-left: .5rem;
  cursor: pointer;
}

nav {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: var(--primary-color);
  z-index: 100;
  min-height: 10vh;
  box-shadow: 2px 2px 4px lightblue;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  z-index: 10;
  background-color: var(--primary-color);
  box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(100px);
  gap: 2rem;
}

.sidebar a {
  text-decoration: none;
  color: var(--secondary-color)
}

.mainbar {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.mainbar a {
  text-decoration: none;
  color: var(--secondary-color);
}

.hover a:hover{
  background-color: #c9e6e5;
  /* background-color: rgb(39, 240, 240); */
  color: black;
  padding: .4rem .8rem;
  transition: .3s cubic-bezier(0, 0, 0.61, 0.83);
}

.button {
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
}

/* button styling */
.button {
  --border-right: 6px;
  --text-stroke-color: #3be0ef;
  --animation-color: #3be0ef;
  --fs-size: 1.5em;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-stroke-color);
}

/* this is the text, when you hover on button */
.hover-text {
  position: absolute;
  box-sizing: border-box;
  content: attr(data-text);
  color: var(--animation-color);
  width: 0%;
  inset: 0;
  border-right: var(--border-right) solid var(--animation-color);
  overflow: hidden;
  transition: 0.5s;
  -webkit-text-stroke: 1px var(--animation-color);
}

/* hover */
.button:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 23px var(--animation-color))
}

/* The switch - the box around the slider */
.switch {
  display: block;
  --width-of-switch: 3.5em;
  --height-of-switch: 2em;
  /* size of sliding icon -- sun and moon */
  --size-of-icon: 1.4em;
  /* it is like a inline-padding of switch */
  --slider-offset: 0.3em;
  position: relative;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
  cursor: pointer;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 64px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #73C0FC;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 30px;
  width: 30px;
  border-radius: 20px;
  left: 2px;
  bottom: 2px;
  z-index: 2;
  background-color: #e8e8e8;
  transition: .4s;
}

.sun svg {
  position: absolute;
  top: 6px;
  left: 36px;
  z-index: 1;
  width: 24px;
  height: 24px;
}

.moon svg {
  fill: #73C0FC;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 1;
  width: 24px;
  height: 24px;
}

/* .switch:hover */.sun svg {
  animation: rotate 15s linear infinite;
}

@keyframes rotate {
 
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* .switch:hover */.moon svg {
  animation: tilt 5s linear infinite;
}

@keyframes tilt {
 
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-10deg);
  }

  75% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.input:checked + .slider {
  background-color: #183153;
}

.input:focus + .slider {
  box-shadow: 0 0 1px #183153;
}

.input:checked + .slider:before {
  transform: translateX(30px);
}

ul {
  list-style: none;
}

#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: .3s;
}

.bars {
  width: 100%;
  height: 4px;
  background-color: var(--secondary-color);
  border-radius: 5px;
  transition-duration: .3s;
}

#checkbox:checked+.toggle .bars {
  margin-left: 13px;
}

#checkbox:checked+.toggle #bar2 {
  transform: rotate(135deg);
  margin-left: 0;
  transform-origin: center;
  transition-duration: .3s;
}

#checkbox:checked+.toggle #bar1 {
  transform: rotate(45deg);
  transition-duration: .3s;
  transform-origin: left center;
}

#checkbox:checked+.toggle #bar3 {
  transform: rotate(-45deg);
  transition-duration: .3s;
  transform-origin: left center;
}

@media (min-width:992px) {
  .collapse {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

@media (max-width:330px) {
  .example-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .example-2 .icon-content .tooltip {
    left: 90%;
    transform: translateY(-60%);
  }
}

@media (max-width:600px) {
  .hide {
    display: none;
  }
}

@media (min-width:600px) {
  .stopShowing {
    display: none;
  }
}

.main {
  position: relative;
  /*background-image: url(Assets/people-detection.gif);*/
  width: 100%;
  height: calc(100vh - 80px);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: max(1500px, 100vw);
  animation: transitionIn 0.75s;
}

@keyframes transitionIn {
  from{
    opacity: 0;
    transform: rotateX(-10deg);
  }
  to{
    opacity: 1;
    transform: rotateX(0);
  }
}

.bg-box {
  position: absolute;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #000000;
  opacity: .25;
  top: 0;
}

.text {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  flex-direction: column;
  gap: 20px;
  padding: 0 30px;
}

.text .line-main {
  color: white;
  text-align: center;
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 2.5rem;
  margin: 0;
}

.text .tagline {
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  text-align: center;
}

.main .text button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 10em;
  font-size: 17px;
  font-weight: 600;
  padding: 1em 2em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 0 0 var(--secondary-color);
}

.buttons {
  display: flex;
  gap: 0.8rem;
}

.buttons a{
  text-decoration: none;
  color: var(--secondary-color);
}

.deck {
  display: flex;
  gap: 10px;
}

.main .text button:hover {
  transform: translateY(-4px) translateX(-2px);
  box-shadow: 2px 5px 0 0 var(--secondary-color);
}

.main .text button:active {
  transform: translateY(2px) translateX(1px);
  box-shadow: 0 0 0 0 var(--secondary-color);
}

.main .text .deck{
  background-color: #25bcbe;
}

.main .text .deck:hover {
  transform: translateY(4px) translateX(2px);
  box-shadow: 2px 5px 0 0 black;
}

/* roadmap */

.roadmap {
  background-color: var(--primary-color);
}

.roadmap img{
  width: 100%;
}

.roadmap .light-image{
  display: block;
}

.roadmap .dark-image{
  display: none;
}

body.dark-theme .roadmap .light-image{
  display: none;
}

body.dark-theme .roadmap .dark-image{
  display: block;
}

.roadmap h2 {
  text-align: center;
  font-weight: 900;
  animation: pop 1s alternate infinite;
  margin: 1rem;
  font-size: 2rem;
  color: var(--secondary-color);
}

@keyframes pop {
  0%{
    transform: translateY(50%);
  }

  100%{
    transform: translateY(0);
  }
}

/* client Testimonials start*/
.container h1{
  text-align: center;
  padding-bottom: 2rem;
  font-size: 2rem;
}

/* whatsApp chatbox  */

.whatsapp-button {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
  margin: 1rem;
  cursor: pointer;
}

.whatsapp-button img{
  width: 50px;
  height: 50px;
}

.whatsapp-button:hover{
  scale: 1.05;
  transition: 0.8s;
}

.chat-container {
  /* display: none; */
  width: 300px;
  border-radius: 1rem;
  z-index: 10;
  position: fixed;
  right: 0;
  bottom: 10%;
  margin: 1rem;
  overflow: hidden;
}
.chat-header {
  background-color: #075e54;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
}
.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}
.chat-info {
  display: flex;
  flex-direction: column;
}
.chat-name {
  font-weight: bold;
}
.chat-status {
  font-size: 0.8em;
  opacity: 0.8;
}
.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #e5ddd5;
}
.message {
  max-width: 70%;
  padding: 8px 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  clear: both;
}
.sent {
  background-color: #dcf8c6;
  float: right;
}
.received {
  background-color: #fff;
  float: left;
}
.chat-input {
  display: flex;
  padding: 10px;
  background-color: #f0f0f0;
}
.chat-input input {
  flex-grow: 1;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
}
.chat-input button {
  background-color: #075e54;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
}

/* service suites start*/

.m1-container {
  margin: 1rem;
}

.services {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
}

.heading-container{
  display: flex;
  align-items: center;
  justify-content: center;
}

.heading {
  display: inline-block;
  font-size: 3rem;
  font-weight: 900;
  margin: 2rem;
  color: #413e3e;
  align-content: center;
}

/* .head {
  border-right: 5px solid;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 10px;
  animation: typing 2s ,
            cursor 0.8s step-end alternate infinite;
} */
.head {
  border-right: 5px solid;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 10px;
  opacity: 0;
  transition: opactiy 1s ease-out;
  color: var(--secondary-color);
}

.head.visible {
  opacity: 1;
  animation: typing 2s,
             cursor 0.8s step-end alternate infinite;
}

@keyframes cursor {
  50%{
    border-color: transparent;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  
}

.card-footer h2 {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.card {
  position: relative;
  /* width: 31vw; */
  height: 30vh;
  margin: 2rem;
  /* background-color: #f2f2f2; */
  background-color: #145da0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 0 0 5px #ffffff80;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card img {
  width: 100%;
  height: 100%;
}

.card__image {
  width: 100%;
  height: 50%;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--primary-color);
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card__content button{
  margin: 20px;
  align-content: center;
} 

.card:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 12px;
  color: var(--secondary-color);
  font-weight: 700;
  padding: 0.6rem;
}

.title-front{
  color: white;
  padding: 0.4rem;
  font-size: 12px;
  height: 10vh;
  text-align: center;
  align-content: center;
  justify-items: center;
}

.card:hover svg {
  scale: 0;
}

.card__description {
  margin: 10px 0 10px;
  font-size: 12px;
  color: #777;
  line-height: 1.4;
}

.card__button {
  padding: 15px;
  border-radius: 8px;
  background: #777;
  border: none;
  color: white;
}

.secondary {
  background: transparent;
  color: #777;
  border: 1px solid #777;
}

/* footer styling */

footer{
  position: relative;
  bottom: 0;  
  background-color: var(--primary-color);
  box-shadow: 10px 10px 50px lightblue inset;
  padding: 0 1rem 1rem;
}

.footer {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  min-height: 10vw;
}

.footer a{
  text-decoration: none;
  color: var(--secondary-color);
}

.footer-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-logo h2{
  color: #2ebfc1;
  text-align: center;
}

.navigation ul{
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
}

.contact-div {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
}

.contacts {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 15px;
}

.location {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.location-text{
  text-align: center;
  color: var(--secondary-color);
}

.rights {
  text-align: center;
  color: var(--secondary-color);
}

.example-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.example-2 .icon-content {
  margin: 0 10px;
  position: relative;
}
.example-2 .icon-content .tooltip {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  padding: 6px 10px;
  border-radius: 5px;
  opacity: 0;
  visibility: hidden;
  font-size: 14px;
  transition: all 0.3s ease;
}
.example-2 .icon-content:hover .tooltip {
  opacity: 1;
  visibility: visible;
  top: 60px;
}
.example-2 .icon-content a {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #4d4d4d;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
}
.example-2 .icon-content a:hover {
  box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
}
.example-2 .icon-content a svg {
  position: relative;
  z-index: 1;
  width: 30px;
  height: 30px;
}
.example-2 .icon-content a:hover {
  color: white;
}

.example-2 .icon-content a .filled {
  position: absolute;
  top: auto;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: #000;
  transition: all 0.3s ease-in-out;
}
.example-2 .icon-content a:hover .filled {
  height: 100%;
}

.example-2 .icon-content a[data-social="linkedin"] .filled,
.example-2 .icon-content a[data-social="linkedin"] ~ .tooltip {
  background-color: #0274b3;
}

.example-2 .icon-content a[data-social="github"] .filled,
.example-2 .icon-content a[data-social="github"] ~ .tooltip {
  background-color: #24262a;
}
.example-2 .icon-content a[data-social="instagram"] .filled,
.example-2 .icon-content a[data-social="instagram"] ~ .tooltip {
  background: linear-gradient(
    45deg,
    #405de6,
    #5b51db,
    #b33ab4,
    #c135b4,
    #e1306c,
    #fd1f1f
  );
}
.example-2 .icon-content a[data-social="WhatsApp"] .filled,
.example-2 .icon-content a[data-social="WhatsApp"] ~ .tooltip {
  background-color: #25d366;
}

.example-2 .icon-content a[data-social="gmail"] .filled,
.example-2 .icon-content a[data-social="gmail"] ~ .tooltip {
  background-color: #0078d4;
}




@media (max-width:860px) {
  .footer {
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
}

.services {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
}

.card-4, .card-5 {
  width: 26vw;
}

.card-1 { grid-area: 1 / 1 / 2 / 2; }
.card-2 { grid-area: 1 / 2 / 2 / 3; }
.card-3 { grid-area: 1 / 3 / 2 / 4; }
.card-4 { grid-area: 2 / 1 / 3 / 3; }
.card-5 { grid-area: 2 / 2 / 3 / 4; }

}

@media (max-width:725px) {
  .head {
    letter-spacing: 0;
  }

  .footer-item{
    padding: 0.8rem;
  }
}

@media (max-width:570px) {
  .head {
    font-size: 3rem;
  }

  .card-1, .card-2, .card-3 {
    margin: 0.5rem;
  }

  .buttons{
    flex-direction: column-reverse;
  }

  .footer {
    grid-template-columns: 1fr;
  }

  .footer-item{
    padding: 0.5rem;
  }
}

@media (max-width:490px){
  .services {
    display: flex;
    flex-direction: column;
  }

  .card-1, .card-2, .card-3, .card-4, .card-5 {
    width: 35vh;
  }

  .card {
    height: 40vh;
  }
}

@media (max-width:390px) {
  .head {
    font-size: 2rem;
  }
}

@media (min-height:950px) {
  .main, .bg-box, .text{
    height: 50vh;
  }
}
</style>
