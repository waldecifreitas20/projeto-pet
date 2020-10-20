<template>
    <div id="register-container">
        <main>
            <form action="http://www.google.com" method="post" class="form-submit" id="form-data" enctype="multipart/form-data">
                <div id="form-user">
                    <header>
                        <nav class="top_bar">
                            <router-link to="/" id="routy">Voltar para o início</router-link>
                        </nav>
                    </header>            
                    <fieldset>
                        <legend>Seus dados</legend>
                        
                        <div class="input-block name">
                            <label for="name">Nome:</label>
                            <input type="text" name="name" id="name" required pattern="[a-z\s]+$" placeholder="Nome Completo">
                            <div class="error_tag error_name" id="error">Preencha esse campo</div>
                        </div>
                        <div class="input-block email">
                            <label for="email">E-mail:</label>
                            <input type="email" name="email" id="email" required placeholder="ex: carlos@augusto.com">
                            <p class="error_tag error_email">Preencha esse campo</p>
                        </div>
                        <div class="input-block password">
                            <label for="password">Senha:</label>
                            <input type="password" name="password" id="password" required placeholder="Digite uma senha">
                            <p class="error_tag error_password">Preencha esse campo</p>
                        </div>
                        <div class="flex">
                                <div class="input-block address">
                                <label for="address">Endereço:</label>
                                <input type="text" name="address" id="address" required placeholder="Rua,Tv, Av, Alameda,...">
                                <p class="error_tag">Preencha esse campo</p>
                            </div>
                            <div class="input-block complement">
                                <label for="address">Complemento:</label>
                                <input type="text" name="complement" id="complement" required placeholder="ex: Condomínio, apto, cohab...">
                                <p class="error_tag">Preencha esse campo</p>
                            </div>
                            <div class="input-block number">
                                <label for="number">Nº:</label>
                                <input type="number" name="number" id="number" required pattern="[0-9]{3}" placeholder="XXX">
                                <p class="error_tag">Preencha esse campo</p>
                            </div>
                            <div class="input-block neighborhood">
                                <label for="neighborhood">Bairro</label>
                                <input type="text" name="neighborhood" id="neigh" required pattern="[A-Za-z1-9]+" placeholder="Conceição">
                                <p class="error_tag">Preencha esse campo</p>
                            </div> 
                            <div class="input-block cep">
                                <label for="cep">CEP</label>
                                <input type="text" name="cep" id="cep" required pattern="[0-9]{8}" placeholder="XXXXXXXX">
                                <p class="error_tag">Informe um CEP válido</p>
                            </div>
                            <div class="input-block tel">
                                <label for="tel">Telefone:</label>
                                <input type="text" name="tel" id="tel" required pattern="[/(][0-9]{2}[/)][0-9]{9}" placeholder="(XX) XXXXX-XXXX">
                                <p class="error_tag">Número inválido</p>
                            </div>     
                        </div>
                                          
                    </fieldset>
                    <div id="btn_next"><a class="btn_prox" @click="validFormUser">Proximo</a></div>
                </div>
                <div id="form-pet">  
                    <header>
                          <a href="#form-user" @click="back">Voltar</a>                        
                    </header>
                    <fieldset>
                      
                        <legend>Dados do PET</legend>
                        
                        <div class="flex">
                            <div class="input-block name-pet">
                                <label for="name">Nome:</label>
                                <input type="text" name="name_pet" id="name_pet" pattern="[A-Za-z]+" required>
                            </div>
                            <div class="input-block years">
                                <label for="name">Nascimento:</label>
                                <input type="date" name="years" id="years" required>
                            </div>
                        </div>
                        <div class="input-block checkbox-medal">                            
                            <input type="checkbox" name="chk_medal" id="chk_medal" v-model="have_medal_check">
                            <label for="chk_medal">Já tenho uma medalha</label>
                        </div>
                        <div class="input-block medal" v-if="have_medal_check">
                            <label for="address">Informe o ID da medalha:</label>
                            <input type="text" name="id_pet" id="id_pet" required>
                        </div>
                        <div class="input-block checkbox-house">                            
                            <input type="checkbox" name="chk_house" id="chk_house" checked v-model="check_address_pet">
                            <label for="chl_house">O animal mora em minha residência</label>
                        </div>
                        <div class="input-block address" v-if="!check_address_pet">
                            <label for="address">Endereço:</label>
                            <input type="text" name="address_pet" id="address_pet" required>
                        </div>
                        <div class="input-block number_house_pet" v-if="!check_address_pet">
                            <label for="cep_pet">Nº:</label>
                            <input type="number" name="number_house_pet" id="number_house_pet" required>
                        </div>
                        <div class="input-block neighborhood" v-if="!check_address_pet">
                            <label for="neighborhood_pet">Bairro:</label>
                            <input type="text" name="neighborhood_pet" id="neighborhood_pet" required>
                        </div>
                        <div class="input-block cep_pet" v-if="!check_address_pet">
                            <label for="cep_pet">CEP:</label>
                            <input type="number" name="cep_pet" id="cep_pet" required>
                        </div>
                        <fieldset class="vacination_field">
                            <legend>Vacinação</legend>
                            <div class="select-block">
                                <label for="species">Selecione a espécie do seu animal</label>
                                <select name="species" id="species" required v-model="animal">
                                    <option :value="null" disabled selected>--selecione uma opção--</option>
                                    <option value="cat">Gato</option>
                                    <option value="dog">Cachorro</option>
                                </select>
                            </div>
                            <!-- ==========================CAT HTML BLOCK=========================== -->
                            <div class="species_cat" v-if="(animal == 'cat')">

                                <div class="input-vermifugation vermifugation_cat">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_vermifug" id="chk_vac_vermifug_c" v-model="vacination_check[0]">
                                        <label for="name">Vermifugação</label>
                                    </div>                                        
                                    <div class="subinput-block" v-show="vacination_check[0]">
                                        <label for="input_vermifug">Data da última dose:</label>
                                        <input type="date" name="date_vermifug" id="input_vermifu_cg">                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_cat">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_antRab_c" v-model="vacination_check[1]">
                                        <label for="name">Anti-Rábica</label>                                    
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[1]">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" name="date_antRab" id="input_antRab_c">                                   
                                    </div>                                    
                                </div>

                                <div class="input-valenties valenties_cats">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_valenties" id="chk_vac_valenties_c" v-model="vacination_check[2]">
                                        <label for="name">V3, V4 ou V5</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[2]">
                                        <label for="input_valenties">Data da última dose:</label>
                                        <input type="date" name="date_valenties" id="input_valenties_c">                                    
                                    </div>
                                </div>
                            </div>
                            <!-- ==========================DOG HTML BLOCK=========================== -->
                            <div class="species_dog" v-else>

                                <div class="input-vermifugation vermifugation_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_vermifug" id="chk_vac_vermifug" v-model="vacination_check[0]" >
                                        <label for="name">Vermifugação</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[0]">
                                        <label for="input_vermifug">Data da última dose:</label>
                                        <input type="date" name="date_vermifug" id="input_vermifug">                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_antRab" v-model="vacination_check[1]">
                                        <label for="name">Anti-Rábica</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[1]">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" name="date_antRab" id="input_antRab">                                   
                                    </div>                                    
                                </div>

                                <div class="input-valenties valenties_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_valenties" v-model="vacination_check[2]">
                                        <label for="name">V8 ou V10</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[2]">
                                        <label for="input_valenties">Data da última dose:</label>
                                        <input type="date" name="date_valenties" id="input_valenties">                                    
                                    </div>
                                </div>
                            </div>                            
                        </fieldset>
                        <button type="submit" form="form-data">Enviar</button>
                    </fieldset>
                </div>
                
            </form>
        </main>
    </div>
</template>

<script>

export default {
    data(){
        return{
            animal: String,
            check_address_pet:  true,
            vacination_check: [],
            directionForm: true,
            have_medal_check: false,
        }
    },
    methods:{
        back(){
            var from = document.querySelector("#form-pet")
            var to = document.querySelector("#form-user")
            from.setAttribute("style", "display: none")
            to.setAttribute("style", "z-index: 5")
        },
        validFormUser(){
            var error = document.querySelectorAll(".error_tag")            
            var anchor = document.querySelector(".btn_prox")
            
            
            var elements = {
                name : { val : document.querySelector("#name")},          //0              
                email : { val : document.querySelector("#email")},         //1
                password : { val : document.querySelector("#password")},   //2
                address : { val : document.querySelector("#address")},     //3
                complement : {val : document.querySelector("#complement")},//4
                number : { val : document.querySelector("#number")},       //5
                neighborhood : { val : document.querySelector("#neigh")},  //6                
                cep : { val : document.querySelector("#cep")},             //7
                tel : { val : document.querySelector("#tel")},             //8    
                  
            }          
            /* =================CLEAR ERROR-TAG ON CLICK=================== */
            for(let i = 0 ; i < error.length; i++ ){
                error[i].setAttribute("style","display: none")
            }
           ////////////////////////////////////////////////////////////////////
            if(elements.name.val.value.length == 0){
                error[0].setAttribute("style", "display: block")
                error[0].focus()
                alert('Informe o seu nome!')
            }else if(!isNaN(elements.name.val.value)){
                error[0].setAttribute("style", "display: block")
                error[0].focus()
                error[0].innerHTML = "Digite um nome válido"
                elements.name.val.value = ""
                alert('Seu nome não pode ser um número!')
            }else if(elements.email.val.value.length == 0){
                error[1].setAttribute("style", "display: block")
                error[1].focus()
                alert('Informe um email válido!')
            }else if(elements.email.val.value.indexOf('@') == -1 || elements.email.val.value.indexOf('.') == -1){
                error[1].setAttribute("style", "display: block")
                error[1].focus()
                error[1].innerHTML = 'Informe um email válido'
                elements.email.val.value = "" 
                alert('Informe um email válido!')         
            }else if(elements.password.val.value.length < 8){
                error[2].setAttribute("style", "display : block")
                error[2].focus()
                error[2].innerHTML = 'Sua senha deve ter pelo menos 8 caracteres'
                alert('Sua senha deve conter pelomenos 8 caracteres')
            }else if(elements.address.val.value.length == 0){
                error[3].setAttribute("style", "display: block")
                error[3].focus()
                alert('Informe um endereço')
            }else if(elements.complement.val.value.length == 0){
                error[4].setAttribute("style", "display: block")
                error[4].focus() 
                alert('Informe um complemento. Exemplo: vila, altos, ponto de referência')           
            }else if(elements.number.val.value.length == 0){
                error[5].setAttribute("style", "display: block")
                error[5].focus()
                alert('O numero da sua casa não pode estar vazio')
            }else if(elements.number.val.value.length > 4){
                error[5].setAttribute("style", "display: block")
                error[5].focus()
                error[5].innerHTML = "Informe um valor válido"
                elements.number.val.value = ""
            }else if(elements.neighborhood.val.value.length == 0){
                error[6].setAttribute("style", "display: block")
                error[6].focus()
                alert('Informe o seu bairro')
            }else if(isNaN(elements.cep.val.value) || elements.cep.val.value.length != 8){
                error[7].setAttribute("style", "display: block")
                error[7].focus()
                elements.cep.val.value = ""
                alert('digite um cep valido')
            }else if(elements.tel.val.value.length < 11){
                error[8].setAttribute("style", "display: block")
                error[8].focus()
                alert('Informe um telefone pra contato com DDD')
            }else{
                anchor.setAttribute("href","#form-pet")
                let formUser = document.querySelector("#form-user")
                let formPet = document.querySelector("#form-pet")
                formUser.setAttribute("style", "display: none")
                formPet.setAttribute("style", "display: block")
            }
        }
    }
}
</script>

<style scoped>   
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-size: 2.5rem;
        outline: none;
        border: none;
        color: rgb(4, 255, 255);       
    }
    .error_tag{
        display: none;
        font-size: 1.8rem;
        color: rgb(255, 158, 94);
        margin-bottom: 20rem;
    }
    @media(min-width: 800px){
        .error_tag{
            font-size: 13px;
        }
    }
    input:invalid{
        animation: treme .1s;
        animation-iteration-count: 3;
    }

    @keyframes treme {
        0% {margin-left: 0;}
        25% {margin-left: 5px;}
        50% {margin-left: 0;}
        75% {margin-left: -5px;}
        100% {margin-left: 0;}
    }
    .top_bar{
        display: block;
        position:absolute;
        width: 100%;
        left: 0;
        top: 0;
        padding: 0;
        margin: 0;
    }
    .top_bar #routy{
        height: 3rem;
        width: 100%;
        z-index: 2;        
        display: flex;
        align-items: center;
        margin: 0;
        border-radius: 0;
    }
   
/*=============================FORM USER================================== */
    #form-user{
        overflow: hidden;
        position: sticky;
        z-index: 8;
        left: 0;
        width: 100%;
        height: 120rem;
        background-color: rgb(104, 4, 235);
        color: white;
        padding: 5rem 2rem;
        top: 0rem;                
    }
    .input-block{
        padding: 1rem 0;
        color: rgb(4, 255, 255);
        height: 10.6rem;
    }
    .input-block input{
        display: flex;
        flex-direction: row;
        background-color: transparent;
        width: 100%;
        margin-bottom: 0;
        border-bottom: 5px solid rgb(4, 255, 255);
        outline: none;
        color: rgb(226, 43, 43);
        transition: all 500ms;
        
    }
    .input-block input::placeholder{
        color: rgba(255, 255, 255, 0.24);
    }
    .input-block input:focus, .input-block input:valid{
        padding: 1rem;
        height: 5.6rem;
        background-color: rgb(4, 247, 255);
        border-radius: 1rem;
        color: black;
    }  
    fieldset legend{
        display: block;
        width: 100%;
        font-size: 4rem;
        padding-bottom: .2rem;
        border-bottom: .2rem solid rgb(4, 247, 255);
        margin-bottom: .1rem;
        color: rgb(4, 255, 255);
    }
    #form-user a{
        display: block;
        text-align: center;
        margin: 1.8rem auto;
        background: rgb(4, 247, 255);
        padding: 2rem;
        border-radius: 1rem;
        color: rgb(104, 4, 235);
        transition: all 300ms;
        cursor: pointer;
    }
    #form-user a:hover{
        background: rgb(3, 196, 180);
    }
    @media(min-width: 800px){
        label,input,legend, *{
            font-size: 25px;
        }
        #register-container #form-user{
            position: static;
            z-index: 5;
            width: 100%;
            height: 100%;
            background-color: rgb(104, 4, 235);
            color: white;
            padding: 50px 20px;

        }
        #form-user .top_bar{
            width: 100%;
        }
        #form-user .top_bar #routy{
            display: block;
            width: 100%;
            z-index: 2;        
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0 10px;
            border-radius: 0;
            font-size: 20px;
        }
        #form-user legend{
            display: block;
            text-align: center;
            font-size: 40px;
            border-bottom: 1px solid;
            margin-bottom: 30px;
            padding-top: 10px;
        }
        #form-user .flex{
            display: grid;
            column-gap: 30px;
            justify-content: space-between;
            grid-template-columns: 1fr 1fr;
            
        }
        .flex .input-block input{
            width: 100%;
        }
        .input-block{
            height: 100px;
            color: transparent;
        }
        .input-block input{
            margin-top: 10px;
            height: 30px;
            border-bottom: 1px solid;
            width: 100%;
            border-bottom: 1px solid rgb(4, 247, 255);
        }
        .input-block input:focus, .input-block input:valid{
            padding: 10px;
            height: 50px;
            background-color:rgb(4, 247, 255);
        }  
        #btn_next{
            display: grid;
            width: 100%;
            justify-content: right;
        }
        #form-user #btn_next a{
            height: 50px;
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }
    /* =======================FORM PET==================================== */
    #form-pet header a{
        position: relative;
        width: 20%;
        display: flex;
        align-items: center;
        left: 0;
        top: 0;
        height: 4rem;
        padding-left: 2rem;
        background: rgb(0, 255, 234);
        margin-bottom: 2rem;
    }
    #form-pet header a{
        color: rgb(2, 119, 134);
    }
    #form-pet header a:hover{
        color: rgb(0, 255, 234);
        background-color: rgb(0, 168, 160);
    }
    #form-pet{
        position: relative;
        z-index:1;
        left: 0;
        top: 0rem;
        width: 100%;
        height: 140rem;
        background-color: rgb(2, 119, 134);
        color: rgb(255, 6, 6);
        padding: 2rem;
        padding-top: 2rem;    
        display: none;         
    }
    #form-pet .input-block input[type=checkbox]{
        height: 2.5rem;
        
    }
    #form-pet .input-block input:focus, #form-pet .input-block input:valid{
        padding: 1rem;
        height: 5.6rem;
        background-color: rgb(4, 255, 234);
        border-radius: 1rem;
        color:rgb(2, 119, 134)
    }
    
    #form-pet .select-block select{
        width:100%;
        height: 6rem;
        border-radius: 1rem;
        background:  rgb(3, 255, 234);
        border: none;
        color: rgb(2, 119, 134);
        margin-bottom: 4rem;
    }
    #form-pet .select-block select option{
        font-size: .8rem;
        width: 10rem;
        color: rgb(2, 119, 134);
        box-shadow: none;
    }
    #form-pet .checkbox-house, 
    #form-pet [type=checkbox],
    #form-pet .checkbox-medal{
        display: grid;
        grid-template-columns: 6% 1fr;
        align-items: center;
        height: 5rem;
    }   
    #form-pet .checkbox-house label{
        margin-left: 1rem;
    } 
    #form-pet .vacination_field .input-block{
        display: grid;
        grid-template-columns: 6% 1fr;
        align-items: center;
    }
    .vacination_field{
        margin-top: 4rem;
    }
    .vacination_field .subinput-block input{
        padding: .8rem;
        border-radius: 1rem;
        width: 100%;
        background: rgb(3, 255, 234);
        color: rgb(2, 119, 134);
    }
    button{
        margin-top: 5rem;
        width: 100%;
        height: 8rem;
        border-radius: 1rem;
        background-color: rgb(3, 255, 234);
        color: rgb(2, 119, 134);
    }
    @media(min-width: 800px){
        #form-pet header a{
            color: rgb(2, 119, 134);
            display: block; 
            height: 35px;
            margin: 0;
            padding: 5px 10px;
            border-radius: 0;
            font-size: 20px;
            background-color: rgb(3, 255, 234);
            margin-bottom: 30px;
            transition: all 500ms;
        }
        #form-pet{
            padding: 20px;
            height: 100%;
        }
        #form-pet .input-block input:focus, #form-pet .input-block input:valid{
            height: 50px;
        }
        #form-pet .input-block input[type=checkbox]{
            height: 15px;
        }
        #form-pet fieldset legend, legend{
            font-size: 40px;
        }
        #form-pet .select-block{
            padding: 20px 0;
        }
        #form-pet .select-block select{
            margin: 0;
            margin-left: 10px;
            width: 20%;
            height: 50px;
        }
        #form-pet .select-block select option{
            font-size: 20px;
            
        }
        #form-pet .vacination_field .input-block{
            padding: 0;
            height: 50px;
        }
         #form-pet .vacination_field .subinput-block input{
             height: 50px;
             transition: all 500ms;
             margin-left: 10px;
             margin-bottom: 50px;
             width: 70%;
         }
         button{
            height: 50px;
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            cursor: pointer;

            transition: all 400ms;
         }
         button:hover{
             background: rgb(2, 206, 196);
         }
    }   
</style>