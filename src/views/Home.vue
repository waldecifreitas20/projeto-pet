<template>
  <div id="home-container">   
    <main>
      <section>
        <article id="home">
          <header class="article-header">
            <hgroup>
              <h1 class="title">NOME DA MARCA</h1>
              <h5 class="subtitle">Slogan</h5>
            </hgroup>
            
            <img src="https://s2.glbimg.com/slaVZgTF5Nz8RWqGrHRJf0H1PMQ=/0x0:800x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/e/NTegqdSe6SoBAoQDjKZA/cachorro.jpg" alt="">
          </header>
          
          <div class="home-content">
            <div class="buttons_block">              
              <Buttons route="/cadastro" value="Cadastre-se" id="btn_register"/>
              <Buttons route="#searchId" value="Pesquisar ID" id="btn_searchID"/>
            </div>
          </div>
          
          
        </article>
        <article id="searchId">
          <form action="" method="get" id="form_search_id">
            <legend>Pesquisar por ID</legend>
            <p>Digite na caixa de texto abaixo, a sequência de caracteres localizada na parte traseira da medalha.</p>
            <div class="input-block">
              <input type="text" name="id" id="id" placeholder="Digite aqui o ID">
            </div>
            <button type="submit">Pesquisar</button>
          </form>          
        </article>
        <article id="como_funciona">          
          <h1 class="title">COMO FUNCIONA?</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque enim aspernatur iste adipisci debitis autem? Asperiores architecto iste, a fuga id nihil tempora qui voluptatum officiis veritatis neque vel! Harum.</p>

        </article >
        <article id="contact_us">
          <TopBarMenu id="top-bar" :slot1="login" :slot2="searchId" :slot3="whtWork" :slot4="contactUs"/>
          <h1>FALE CONOSCO</h1>
          <form action="" method="post" id="form_submit">
            <fieldset>
              <legend>Seus dados</legend>
              <div class="input-block">
                <label for="name">Nome:</label>
                <input type="text" name="name" id="name">
              </div>
              <div class="input-block ">
                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email">
              </div>
              <div class="textarea-block">
                <label for="message">Sua mensagem:</label>
                <textarea name="message" id="message" cols="50" rows="10"></textarea>
              </div>
            </fieldset>
            <button type="submit" class="btn_submit">Enviar</button>
          </form>
        </article>
      </section>
    </main>
    <footer id="footer-block">
      AQUI É O FOOOTEEEERRR
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBarMenu from '@/components/TopBarMenu.vue'
import Buttons from '@/components/Buttons.vue'
export default {
  name: 'Home',
  data(){
    return{
      login : {
        value : 'Login',
        route : '/login'
      },
      searchId : {
        value : 'Encontrou um PET?',
        route : '#searchId'
      },
      whtWork : {
        value : 'Como Funciona?',
        route : '#como_funciona'
      },
      contactUs : {
        value : 'Fale Conosco',
        route : '#contact_us'
      }
    }
  },
  components: {
    TopBarMenu,
    Buttons
  },
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Ranchers&display=swap');
  .title, .subtitle{
    font-family: 'Ranchers', cursive;
  }

  article{
    z-index: 0;
    position: sticky;
    top: 0;
    left: 0;
    box-shadow: 0rem -3rem 3rem rgba(0, 0, 0, 0.11);
  }
  #home-container{
    height: 100%;
    width: 100%;
  } 
  #home{
    height: 120rem;
    background-color: var(--color-primary);
    padding-top: 20rem;    
  } 
  @media (max-height: 731px){
    #home{
      height: 107rem;
    }
    #como_funciona{
      height: 107rem;
    }
    #contact_us{
      height: 107rem;
    }
  }
  @media (max-height: 823px){
    #home{
      height: 120em;
    }
    #como_funciona{
      height: 120rem;
    }
    #contact_us{
      height: 120rem;
    }
  }
  footer{
    background-color: rgba(0, 0, 0, 0.863);
    height: 20rem;
  }
  /* ====================================HOME============================================= */
  .article-header{
    padding-top: 10rem;
    
  }
  .article-header hgroup{
    color: white;
    font-size: 300%;
    text-align: center;
    font-family: 'Ranchers', cursive;

  }
  *{
    font-family: 'Ranchers', cursive;
    color: white;
  }
  .article-header img{
    display: block;
    width: 40rem;
    margin: 2rem auto;
    border-radius: 2rem ;
    box-sizing: content-box;
  }
  .buttons_block{
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-evenly;
  }

  #btn_register{
    position: relative;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0);
    color: white;
    border: 2px solid white;
    transition: all 200ms;
  }
  #btn_register:hover{
    color: var(--color-primary);
    background-color: white;
  }
  #btn_searchID{
    position: relative;
     z-index: 1;
    color: white;
    transition: all 200ms;
  }
  #btn_searchID:hover{
    background-color: var(--color-secondary-dark)
  }
  @media(min-width: 800px){
    #home{
      padding: 0;
      height: 900px;
      overflow-y: hidden;
    }
    #home .article-header{
      padding-top: 90px;
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
    .article-header hgroup{
      display: flex;
      flex-direction: column;
      align-self: center;
    }
    .article-header img{
      width: 600px;
    }
    .home-content .buttons_block{
      display: grid;
      grid-template-columns: 1fr 1fr 3fr;
      margin-left: 30px;
    }
    #btn_register, #btn_searchID{
      height: 90px;
      margin: 0 10px;
      
      width: 250px;
    }
  }
  /* ====================================SEARCH ID================================= */
  #searchId{
    height: 130rem;
    background: #cc0055;
    padding: 15rem 2.3rem;
    display: block;
    
  }
  #searchId .input-block, 
  #searchId p{
    display: block;
    font-size: 3.5rem;
    color: #fffb00;
  }
  #searchId .input-block{
    margin: 10rem 0;    
  }
  #searchId .input-block input{
    width: 100%;
    margin: 0;
    background: rgb(252, 84, 154);
    border: none;
    color: #e70362;
  }
  #searchId .input-block input::placeholder{
    color:#c505355d
  }
  #searchId form button{
    height: 7rem;
    width: 100%;
    border: none;
    border-radius: 1rem;
    margin-top: 10rem;
    color: #cc0055;
    font-size: 4rem;
    background-color: #f7df0a;
  }
  #searchId form button:hover{
    background-color: #dbc606;
  }
  #searchId legend{
    font-size: 5rem;
    color: #fffb00;
    margin-bottom: 2rem;
  }
  @media(min-width: 800px){
    #searchId{
      height: 100vh;
      width: 100%;
      padding: 100px 20px;
      background: #cc0055;
    }
    #searchId legend{
      font-size: 50px;
    }
    #searchId p{
      font-size: 30px;
    }
    #searchId form button,
    #searchId .input-block{
      margin: 20px 0;
    }
    #searchId form button{
      height: 50px;
      width: 30%;
      float: right;
      font-size: 20px;
      cursor: pointer;
    }
  }
  /* ===================================COMO FUNCIONA?============================= */
  #como_funciona{
    height: 120rem;
    padding-top: 13rem;
    background: rgb(230, 26, 203);
    font-size: 400%;
    padding: 13rem 3rem;
  }
  #como_funciona h1{
    font-size: 62pt;
    color: rgb(5, 247, 255);
    margin-bottom: 2rem;
  }
  #como_funciona p{
    font-size: 48pt;
  }
  @media(min-width: 824px){
    #como_funciona{
      padding: 100px 20px 0px;
    }
    #como_funciona h1,#como_funciona p{
      font-size: 60%;
    }
  }
  /* ================================CONTACT US ==================================== */
  #contact_us{
    padding-top: 15rem;
    top: 0;
    height: 120rem;
    background-color: #01b7ff;
    font-size: 5rem;
    font-family: 'Ranchers', cursive;
    padding: 10rem 2rem;
    
  }
  fieldset{
    border: none
  }
  #contact_us legend{
    font-size:  4rem;
    padding: 2rem 0;
    margin: 100rem 0 1rem 0;
    border-bottom: .3rem solid #009ac0;
    display: block;
    width: 100%;
  }
  .input-block{
    display: flex;
    font-size: 3.3rem;
    align-items: center;
  }
  .input-block input{
    color: black;
    height: 8rem;
    width: 43rem;
    font-size: 3rem;
    padding: 2rem;
    margin: 1rem;
    border-radius: 1rem;
    outline: none !important;
    border: 5px solid #009ac0;
  }
  .textarea-block{
    padding-top: 4rem;
    width: 99%;
    margin: auto;
  }
  .textarea-block textarea{
    height: 30rem;
    width: 100%;
    margin-top: 1rem;
    padding: 2rem;
    color: black;
    font-size: 3rem;
    border: .4rem solid #009ac0;
    resize: none;
  }
  .btn_submit{
    display: block;
    margin: 8rem 0;
    width: 100%;
    height: 7rem;
    background-color: #f10367;
    font-size: 4rem;
    border-radius: 1rem;
    outline: none;
    border: none;

    transition: background-color 200ms;
  }
  .btn_submit:hover{
    background-color: #cc0055;
  }
  @media(min-width: 800px){
    #contact_us{
      padding: 100px 20px;
      font-size: 40px;
      height: 100%;
  
    }
    #contact_us .input-block, #contact_us legend,
    #contact_us .textarea-block{
      font-size: 30px;
      margin: 0;
    }
    #contact_us legend{
      padding-bottom: 5px;
      border-bottom: 1px solid;
    }    
    .input-block input{
      height: 60px;
      font-size: 20px;
      padding: 10px;
    }
    .textarea-block{
      margin:0;
      padding: 30px 0; 
    }
    .textarea-block textarea{
      outline: none;
      height: 200px;
      padding: 10px;
      font-size: 20px;
    }
    .btn_submit{
      width: 30%;
      height: 70px;
      margin: 0 10px;
      margin-left: auto;
      font-size: 30px;
    }
  }
</style>
