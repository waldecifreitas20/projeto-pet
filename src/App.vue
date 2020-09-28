<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Ranchers&display=swap');

 *, html, body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Ranchers', cursive;
    outline: none;
    border: none;
  }
  html,body{
    min-width: 60rem;
    height: 100vh;
    /* overflow: hidden; */
  }
  #form-user{
    overflow: hidden;
  }
</style>
