<template>
  <div id="login">
    <header>
      <h1>Projeto PET</h1>
    </header>
    <div id="login-container">
      <div id="content">
        <form action="/backend" method="POST" id="form_login">
          <legend>Login</legend>
          <div class="input-block">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required>
          </div>
          <div class="input-block">
            <label for="">Senha:</label>
            <input type="password" name="password" id="password" required>
            <div class="sub-block">
              <router-link to="/" class="router">Esqueceu a Senha?</router-link>
            </div>
          </div>     
        </form>
        <div class="footer-form">
            <button type="submit" @click="login">Entrar</button>             
            <router-link to="/cadastro" class="router">Não é cadastrado ainda?</router-link>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email : String,
      password : String,
    }    
  },
  methods:{
    login(){
      var email = document.querySelector("#email").value
      var password = document.querySelector('#password').value
      alert(password.length)
      if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
        alert('digite um email válido')
      }else if(password.length < 8){
        alert('Sua senha deve conter pelo menos 8 caracteres')
      }else{
        window.location.replace('/page_user');
      }
    }
  }
}
</script>

<style scoped>
#login{
  position: relative;
  width: 100%;
}
  #login header{
    position: absolute;
    top: 10rem;
    font-size: 3rem;
    display: block;
    width: 100%;
    padding: 2rem;
    text-align: center;
    color: white;
    text-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.342);
  }
  #login-container{
    height: 106.5rem;      
    background: rgb(174, 104, 255);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #content{
    background: rgb(112, 30, 219);
    height: 45rem;
    width: 40rem;
    padding: 1rem 3rem ;
    font-size: 3.5rem;
    text-align: center;
    color: white;
    text-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.342);
    border-radius: 2rem;
  }
  #content .input-block{
    margin-top: 2rem;
    font-size: 2rem;
    text-align: left;
    color: white;
    text-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.342);
  }
  #content .input-block input{
    width: 100%;
    height: 50%;    
    padding: 1rem;
    font-size: 2rem;
    border-bottom: .2rem solid white;
    background: transparent;
    transition: all 500ms;
  }
  #content .input-block input:focus,
  #content .input-block input:valid{
    height: 100%;
    background: white;
    border-radius: 1rem;
  }
  .input-block .sub-block{
    text-align: right;
    margin-top: 5px;
  }
  .footer-form{
    margin-top: 5rem;
  }
  .router{
    font-size: 1.6rem;
    color: white;
  }
  .footer-form button{
    display: block;
    width: 100%;
    height: 4.6rem;
    outline: none;
    background: yellow;
    border-radius: 1rem;
    font-size: 3rem;
  }
  @media(min-width: 800px){
    #login header{
      font-size: 30px;
      top: 10px;
    }
    #login-container{
      height: 100vh;
    }
    #content{
      margin-top: 5rem;
      height: 380px;
      width: 450px;
      font-size: 30px;
      padding: 20px;
      border-radius: 20px;
    }
    #content .input-block{
      font-size: 15px;
      margin-top: 10px;
    }
    #content .input-block input{
      height: 10px;
      border-radius: 0px;
      font-size: 15px;
      background: transparent;
      transition: all 500ms;
      border-bottom: 1px solid white;
    }
    #content .input-block input:focus,
    #content .input-block input:valid{
      height: 35px;
      background: white;
      border-radius: 10px;
    }
    .router{
      font-size: 12px;
      display: block;
    }
    .footer-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-form  div{
      display: block;
    }
    .footer-form button{
      height: 40px;
      width: 150px;
      font-size: 20px;
      border-radius: 10px;
      transition: all 300ms;
      cursor: pointer;
    }
    .footer-form button:hover{
      background: rgb(199, 196, 1);
    }
  }
    
</style>