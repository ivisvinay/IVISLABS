<template>
    <nav>
      <div class="logo"><img src="https://ivislabs.s3.ap-south-1.amazonaws.com/logo_transparent.png" alt="IVIS LABS" height="90VH"></div>
      <ul class="mainbar">
        <li class="hide"><label class="switch" id="desktop_theme_switch">
            <span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="#ffd43b">
                  <circle r="5" cy="12" cx="12"></circle>
                  <path
                    d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z">
                  </path>
                </g>
              </svg></span>
            <span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z">
                </path>
              </svg></span>
            <input type="checkbox" class="input">
            <span class="slider"></span>
          </label></li>
        <li class="hide hover"><router-link to="/">Home</router-link></li>
        <li class="hide hover"><router-link to="/solution">Our Solutions</router-link></li>
        <li class="hide hover"><router-link to="/aboutus">About Us</router-link></li>
        <li class="stopShowing"> <input type="checkbox" id="checkbox">
          <label for="checkbox" class="toggle" style="z-index: 100;">
            <div class="bars" id="bar1"></div>
            <div class="bars" id="bar2"></div>
            <div class="bars" id="bar3"></div>
          </label>
        </li>
      </ul>
      <ul class="sidebar" style="margin-top: 0;">
        <li><label class="switch" id="mobile_theme_switch">
            <span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="#ffd43b">
                  <circle r="5" cy="12" cx="12"></circle>
                  <path
                    d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z">
                  </path>
                </g>
              </svg></span>
            <span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z">
                </path>
              </svg></span>
            <input type="checkbox" class="input">
            <span class="slider"></span>
          </label></li>
        <li class="hover"><router-link to="/">Home</router-link></li>
        <li class="hover"><router-link to="/solution">Our Solutions</router-link></li>
        <li class="hover"><router-link to="/aboutus">About Us</router-link></li>
      </ul>
    </nav>
  </template>
  <script>
  
  export default {
    name: 'NavBar',
    components: {
  //    HelloWorld
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
    margin-top: 60px;
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
  </style>
  