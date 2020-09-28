<template>
      <a :href="route" class="buttons-container button">{{value}}</a>     
</template>

<script>
export default {
    props :{
        value : String,
        route : String  
    }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Ranchers&display=swap');

    :root{
        --color-primary-button : #9b09d4;
        --color-secondary-button : #40e62a;
        --color-secondary-dark : #30bb1e;
        --color-light-button : #ba25ff;
        --color-text-default : #ffffff;
    }
   
    .buttons-container{
        z-index: 0;
        height: 7rem;
        width: 16rem;
        border: none;
        align-items: center;
        justify-content: center;
        display: flex;
        border-radius: 1rem;
        background-color: #45db31;
        position: relative;
        
    }
    .button{
      color: var(--color-primary-button);
      font-size: 1.4rem;
      font-family: 'Ranchers', cursive;
    }
   
</style>