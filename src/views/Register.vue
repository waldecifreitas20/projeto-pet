<template>
    <div id="register-container">
        <main>
            <form action="" method="GET" class="form-submit" id="form-data" enctype="multipart/form-data">
                <div id="user-form">
                    <header>
                        <nav class="top_bar">
                            <router-link to="/" id="routy">Voltar para o início</router-link>
                        </nav>
                    </header>            
                    <fieldset>
                        <legend>Seus dados</legend>
                        
                        <div class="input-block name">
                            <label for="name">Nome:</label>
                            <input type="text" name="name" id="name" required pattern="^[^-\s][a-zA-ZÀ-ú ]*" placeholder="Nome Completo" v-model="dataUser.name">
                            <div class="error_tag error_name" id="error">Preencha esse campo</div>
                        </div>
                        <div class="input-block email">
                            <label for="email">E-mail:</label>
                            <input type="email" name="email" id="email" required placeholder="ex: carlos@augusto.com" v-model="dataUser.email">
                            <p class="error_tag error_email">Preencha esse campo</p>
                        </div>
                        
                        <div class="flex">
                            <div class="input-block password">
                            <label for="password">Senha:</label>
                            <input type="password" name="password" id="password" @keyup="confirmPassword" required placeholder="Digite uma senha" v-model="dataUser.password">
                            <p class="error_tag error_password">Sua senha deve conter pelo menos 8 caracteres</p>
                        </div>
                        <div class="input-block confirm_password">
                            <label for="confirm_password">Confirme a senha:</label>
                            <input type="password" name="confirm_password" id="confirm_password" required placeholder="Digite uma senha" @keyup="confirmPassword" v-model="dataUser.confirmPassword">
                            <p class="error_tag error_confirm_password">As senhas não concidem</p>
                        </div>
                            <div class="input-block cep">
                                <label for="cep">CEP</label>
                                <input type="text" name="cep" id="cep" required pattern="[0-9]{8}" placeholder="XXXXXXXX" @keyup="checkCEP" v-model="dataUser.cep">
                                <p class="error_tag error_cep">Informe um CEP válido</p>
                            </div>
                            <div class="input-block address">
                                <label for="address">Endereço:</label>
                                <input type="text" name="address" id="address" required placeholder="Rua,Tv, Av, Alameda,..." v-model="dataUser.address">
                                <p class="error_tag">Preencha esse campo</p>
                            </div>
                            <div class="input-block neighborhood">
                                <label for="neighborhood">Bairro</label>
                                <input type="text" name="neighborhood" id="neigh" required pattern="[A-Za-z1-9]+" placeholder="Conceição" v-model="dataUser.neighborhood">
                                <p class="error_tag">Preencha esse campo</p>
                            </div>
                            <div class="input-block complement">
                                <label for="address">Complemento:</label>
                                <input type="text" name="complement" id="complement" required placeholder="ex: Condomínio, apto, cohab..." v-model="dataUser.complement">
                                <p class="error_tag">Preencha esse campo</p>
                            </div>
                            <div class="input-block number">
                                <label for="number">Nº:</label>
                                <input type="number" name="number" id="number" required pattern="[0-9]{3}" placeholder="XXX" v-model="dataUser.number">
                                <p class="error_tag">Preencha esse campo</p>
                            </div>                    
                            <div class="input-block tel">
                                <label for="tel">Telefone:</label>
                                <input type="text" name="tel" id="tel" @keyup="formatTel" required pattern="[/(][0-9]{2}[/)][0-9]{5}[/-][0-9]{4}" placeholder="(XX) XXXXX-XXXX" v-model="dataUser.tel">
                                <p class="error_tag">Número inválido</p>
                            </div>     
                        </div>
                                          
                    </fieldset>
                    <div id="btn_next"><a class="btn_prox" @click="validateUserForm">Proximo</a></div>
                </div>
                <div id="pet-form">  
                    <header>
                          <a href="#user-form" @click="changePage('#pet-form','#user-form')">Voltar</a>                        
                    </header>
                    <fieldset>
                      
                        <legend>Dados do PET</legend>
                        
                        <div class="add-photo">
                            <img alt="" id="preview-pet" v-show="selected">
                            <input type="file" name="" id="select-file" accept=".png, .jpg" @change="previewPhoto" hidden>
                            <label for="select-file" :class="{'selected': selected, 'unselected': !selected }">Selecionar Foto +</label>
                        </div>
                        
                        <div class="flex">
                            <div class="input-block name-pet">
                                <label for="name">Nome:</label>
                                <input type="text" name="name_pet" id="name_pet" pattern="^[^-\s][a-zA-ZÀ-ú ]*" required v-model="dataPet.name">
                            </div>
                            <div class="input-block birth-pet">
                                <label for="name">Nascimento:</label>
                                <input type="date" name="birth-pet" id="birth-pet" required v-model="dataPet.birth">
                            </div>
                        </div>
                        <div class="input-block checkbox-medal">                            
                            <input type="checkbox" name="chk_medal" id="chk_medal" v-model="dataPet.checkMedal">
                            <label for="chk_medal">Já tenho uma medalha</label>
                        </div>
                        <div class="input-block medal" v-if="dataPet.checkMedal">
                            <label for="address">Informe o ID da medalha:</label>
                            <input type="text" name="id_pet" id="id_pet" required v-model="dataPet.id">
                        </div>
                        <div class="input-block checkbox-house">                            
                            <input type="checkbox" name="chk_house" id="chk_house" checked v-model="dataPet.sameAddress">
                            <label for="chl_house">O animal mora em minha residência</label>
                        </div>
                        <div class="other-address" v-if="!dataPet.sameAddress">
                            <div class="input-block address">
                                <label for="address">Endereço:</label>
                                <input type="text" name="address_pet" id="address_pet" required v-model="dataPet.address">
                            </div>
                            <div class="input-block number_house_pet">
                                <label for="cep_pet">Nº:</label>
                                <input type="number" name="number_house_pet" id="number_house_pet" required v-model="dataPet.number">
                            </div>
                            <div class="input-block neighborhood">
                                <label for="neighborhood_pet">Bairro:</label>
                                <input type="text" name="neighborhood_pet" id="neighborhood_pet" required v-model="dataPet.neighborhood">
                            </div>
                            <div class="input-block cep_pet">
                                <label for="cep_pet">CEP:</label>
                                <input type="number" name="cep_pet" id="cep_pet" required v-model="dataPet.cep">
                            </div>
                        </div>
                        <fieldset class="vacination_field">
                            <legend>Vacinação</legend>
                            <div class="select-block">
                                <label for="species">Selecione a espécie do seu animal</label>
                                <select name="species" id="species" required v-model="dataPet.specie">
                                    <option :value="null" disabled selected>--selecione uma opção--</option>
                                    <option value="cat">Gato</option>
                                    <option value="dog">Cachorro</option>
                                </select>
                            </div>
                            <!-- ==========================CAT HTML BLOCK=========================== -->
                            <div class="species_cat" v-if="(dataPet.specie == 'cat')">

                                <div class="input-deworming deworming_cat">
                                    <div class="input-block">
                                        <input type="checkbox" name="check-deworming" id="check-deworming_c" v-model="dataPet.vaccines.deworming.check">
                                        <label for="name">Vermifugação</label>
                                    </div>                                        
                                    <div class="subinput-block" v-show="dataPet.vaccines.deworming.check">
                                        <label for="input_deworming">Data da última dose:</label>
                                        <input type="date" name="date_deworming" id="input_vermifu_cg" v-model="dataPet.vaccines.deworming.lastDose">                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_cat">
                                    <div class="input-block">
                                        <input type="checkbox" name="check-antRab" id="check-antRab_c" v-model="dataPet.vaccines.antRab.check">
                                        <label for="name">Anti-Rábica</label>                                                                        
                                    </div>                                    
                                    <div class="subinput-block" v-show="dataPet.vaccines.antRab.check">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" name="date_antRab" id="input_antRab_c" v-model="dataPet.vaccines.antRab.lastDose">                                   
                                    </div>                                    
                                </div>

                                <div class="input-valenties valenties_cats">
                                    <div class="input-block">
                                        <input type="checkbox" name="check-valenties" id="check-valenties_c" v-model="dataPet.vaccines.valences.check">
                                        <label for="name">V3, V4 ou V5</label>
                                    </div>                                    
                                    <div class="subinput-block" v-show="dataPet.vaccines.valences.check">
                                        <label for="input_valenties">Data da última dose:</label>
                                        <input type="date" name="date_valenties" id="input_valenties_c" v-model="dataPet.vaccines.valences.lastDose">                                    
                                    </div>
                                </div>

                            </div>
                            <!-- ==========================DOG HTML BLOCK=========================== -->
                            <div class="species_dog" v-else>

                                <div class="input-deworming deworming_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="check-deworming" id="check-deworming" v-model="dataPet.vaccines.deworming.check" >
                                        <label for="name">Vermifugação</label>                                    
                                    </div>                                    
                                    <div class="subinput-block" v-show="dataPet.vaccines.deworming.check">
                                        <label for="input_deworming">Data da última dose:</label>
                                        <input type="date" name="date_deworming" id="input_deworming" v-model="dataPet.vaccines.deworming.lastDose">                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="check-antRab" id="check-antRab" v-model="dataPet.vaccines.antRab.check">
                                        <label for="name">Anti-Rábica</label>                                    
                                    </div>                                    
                                    <div class="subinput-block" v-show="dataPet.vaccines.antRab.check">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" name="date_antRab" id="input_antRab" v-model="dataPet.vaccines.antRab.lastDose">                                   
                                    </div>                                    
                                </div>

                                <div class="input-valenties valenties_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="check-antRab" id="check-valenties" v-model="dataPet.vaccines.valences.check">
                                        <label for="name">V8 ou V10</label>                                    
                                    </div>                                    
                                    <div class="subinput-block" v-show="dataPet.vaccines.valences.check">
                                        <label for="input_valenties">Data da última dose:</label>
                                        <input type="date" name="date_valenties" id="input_valenties" v-model="dataPet.vaccines.valences.lastDose">                                    
                                    </div>

                                </div>
                            </div>                            
                        </fieldset>
                        
                    </fieldset>
                </div>
                
            </form>
            <button @click="submitImage">Enviar</button>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted : function() {
        // Inicializa variáveis de localização do pet //
        // Desativa Ctrl+v no <input> "confirmar senha" //
        document.getElementById('confirm_password').onpaste = function() {
            return false;
        };
        document.querySelector('#user-form').style.display = 'none';
        document.querySelector('#pet-form').style.display = 'block';

    },
    updated() {
        this.dataPet.address = this.dataUser.address;
        this.dataPet.cep = this.dataUser.cep;
        this.dataPet.number = this.dataUser.number;
        this.dataPet.neighborhood = this.dataUser.neighborhood;
        this.dataPet.complement = this.dataUser.complement;
        console.log(this.dataPet.address);
        this.formData = {
            dataUser : this.dataUser,
            dataPet : this.dataPet
        }
    },
    data: function(){
        return{
            selected : false, // Controle de CLasse
            imagePreview: null, // Recebe image temporaria
            formData : JSON,
            dataUser : { // Dados do usuário
                name : '',                              
                email : '',
                password : '',
                confirmPassword : '', 
                address :  '',
                complement : '',
                number : '',
                neighborhood : '',
                cep : '',         
                tel : '',
            },
            dataPet : { // Dados do pet 
                name : '',
                birth: '',
                checkMedal : false,
                idMedal : '',
                photo : null,
                sameAddress: true,
                specie: '',
                address :  '',
                complement : '',
                number : '',
                neighborhood : '',
                cep : '',
                lastLocation : '',    
                vaccines : {
                    antRab : {
                        check : false,
                        lastDose : ''
                    },
                    valences : {
                        check : false,
                        lastDose : '' 
                    },
                    deworming : {
                        check : false,
                        lastDose : '' 
                    }
                }
            }
        }
    },
    methods:{
        changePage(from, to) { // Alterna as páginas a partir dos parâmetros definidos
            if (from.length > 0) {
                document.querySelector(from)
                .style.display = 'none';
            }
            if (to.length > 0) {
                document.querySelector(to)
                .style.display = 'block';
            }            
        },
        validateUserForm() {   // Verifica se os dados do usuário estão aceitáveis
            var error = document.querySelectorAll(".error_tag");            
            var anchor = document.querySelector(".btn_prox");
                  
            /* =================CLEAN UP ERROR-TAG ON CLICK=================== */
            for(let i = 0 ; i < error.length; i++ ){
                error[i].setAttribute("style","display: none");
            }
           /* =============== CHECKING USER VARIABLES  ===================== */
            if(this.dataUser.name.length == 0){
                error[0].setAttribute("style", "display: block");
                error[0].focus();
                alert('Informe o seu nome!')
            }else if(!isNaN(this.dataUser.name)){
                error[0].setAttribute("style", "display: block");
                error[0].focus();
                error[0].innerHTML = "Digite um nome válido"
                this.dataUser.name = ""
                alert('Seu nome não pode ser um número!')
            }else if(this.dataUser.email.length == 0){
                error[1].setAttribute("style", "display: block");
                error[1].focus();
                alert('Informe um email válido!')
            }else if(this.dataUser.email.indexOf('@') == -1 || this.dataUser.email.indexOf('.') == -1){
                error[1].setAttribute("style", "display: block");
                error[1].focus();
                error[1].innerHTML = 'Informe um email válido'
                this.dataUser.email = "" 
                alert('Informe um email válido!')         
            }else if(this.dataUser.password.length < 8){
                error[2].setAttribute("style", "display : block");
                error[2].focus();
                error[2].innerHTML = 'Sua senha deve ter pelo menos 8 caracteres'
                alert('Sua senha deve conter pelo menos 8 caracteres')
            }else if(this.dataUser.address.length == 0){
                error[3].setAttribute("style", "display: block");
                error[3].focus();
                alert('Informe um endereço')
            }else if(this.dataUser.complement.length == 0){
                error[4].setAttribute("style", "display: block");
                error[4].focus(); 
                alert('Informe um complemento. Exemplo: vila, altos, ponto de referência')           
            }else if(this.dataUser.number.length == 0){
                error[5].setAttribute("style", "display: block");
                error[5].focus();
                alert('O numero da sua casa não pode estar vazio')
            }else if(this.dataUser.number.length > 4){
                error[5].setAttribute("style", "display: block");
                error[5].focus();
                error[5].innerHTML = "Informe um valor válido"
                this.dataUser.number = ""
            }else if(this.dataUser.neighborhood.length == 0){
                error[6].setAttribute("style", "display: block");
                error[6].focus();
                alert('Informe o seu bairro')
            }else if(isNaN(this.dataUser.cep) || this.dataUser.cep.length != 8){
                error[7].setAttribute("style", "display: block");
                error[7].focus();
                this.dataUser.cep = ""
                alert('digite um cep valido')
            }else if(this.dataUser.tel.length != 14){
                error[8].setAttribute("style", "display: block");
                error[8].focus();
                alert('Informe um telefone pra contato com DDD')
            }else{
                anchor.setAttribute("href","#pet-form");
                let userForm = document.querySelector("#user-form");
                let userPet = document.querySelector("#pet-form");
                userForm.setAttribute("style", "display: none");
                userPet.setAttribute("style", "display: block");
            }
        },
        confirmPassword() {    // Verifica se as senhas coincidem entre si
            var $ = document.querySelector.bind(document);
            
            if (this.dataUser.password.length < 8) {
                $('.error_password').style.display = 'block';
            } else {
                $('.error_password').style.display = 'none';
            }

            if (this.dataUser.confirmPassword.length < 8 
                    || this.dataUser.password != this.dataUser.confirmPassword) { 
                $('.error_confirm_password').style.display = 'block';       
            } else {
                $('.error_confirm_password').style.display = 'none';
            }
        },
        checkCEP() {           // Utiliza cep para preenchimento automático
            const CEP = this.dataUser.cep.trim();
            this.dataUser.address = '';
            this.dataUser.neighborhood = '';
            if (CEP.length != 8) {
                    document.querySelector('.error_cep').style.display = 'block';
            } else {
                axios.get(`https://viacep.com.br/ws/${CEP}/json/`).then(response => {
                    if (response.data.erro) {
                        document.querySelector('.error_cep').style.display = 'block';
                    } else {
                        document.querySelector('.error_cep').style.display = 'none';
                        this.dataUser.address = response.data.logradouro;
                        this.dataUser.neighborhood = response.data.bairro;
                    }                      
                })   
            }
            
        
        },
        formatTel() {          // Formata o campo TELEFONE
            if (this.dataUser.tel.length == 11) {
                var ddd = this.dataUser.tel.slice(0,2);
                var part1 = this.dataUser.tel.slice(2,7);
                var part2 = this.dataUser.tel.slice(7,11);
                var finalString = '('+ ddd + ')' + part1 + '-' + part2;
                this.dataUser.tel = finalString;
            } else {
                this.resetString();
            }
        },
        resetString() {        // Remove simbolos da String
            this.dataUser.tel = this.dataUser.tel.replace('(', '');
            this.dataUser.tel = this.dataUser.tel.replace(')', '');
            this.dataUser.tel = this.dataUser.tel.replace('-', '');
        },
        previewPhoto(e) {
            try {
                this.imagePreview = e.target.files[0];
                this.selected = true;
                var img = document.querySelector("#preview-pet");
                var reader = new FileReader();
                reader.onload = event => {
                    img.src = event.target.result;
                    console.log(img.src);
                }            
                reader.readAsDataURL(this.imagePreview);
            } catch (error) {
                console.error(error);
            }
        },
        submitImage() {
            const CLIENT_ID = 'b2301735476d975';
            const doUpload = (url, options) => {
                const callBack = (resolve, reject) => {
                    fetch(url, options)
                    .then(response => response.json())
                    .then(resolve)
                    .catch(reject)
                }
                return new Promise(callBack);
            }
            const data =  new FormData();
            data.append('image', this.imagePreview);

            doUpload('https://api.imgur.com//image', {
                method : 'POST',
                body : data,
                headers : {
                    'Authorization' : `Client-ID ${CLIENT_ID}`,
                }
            })
            .then(resolve => {
                console.log(resolve.data.link);
                this.dataPet.photo = this.data.link;
            })
            .catch(console.error)
            .finally(this.submitForm())
        },
        submitForm() {
            this.resetString();
            const URL = 'https://jsonplaceholder.typicode.com/posts';
            fetch(URL, {
                method : 'POST',
                body : JSON.stringify(this.formData),
                headers : {
                    'Content-type' : 'application/json; charset=UTF-8'
                },
            }).then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.error(error))
            .finally(alert('seus dados foram salvos no servidor'));
        }

    },
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
        margin-bottom: 0rem;
        transition: all 500ms;
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
    #user-form{
        overflow: hidden;
        position: sticky;
        z-index: 8;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(104, 4, 235);
        color: white;
        padding: 5rem 2rem;
        top: 0rem;                
    }
    .input-block{
        padding: 1rem 0;
        color: rgb(4, 255, 255);
        height: 100%;
        
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
    #user-form a{
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
    #user-form a:hover{
        background: rgb(3, 196, 180);
    }
    @media(min-width: 800px){
        label,input,legend, *{
            font-size: 25px;
        }
        #register-container #user-form{
            position: static;
            z-index: 5;
            width: 100%;
            height: 100%;
            background-color: rgb(104, 4, 235);
            color: white;
            padding: 50px 20px;

        }
        #user-form .top_bar{
            width: 100%;
        }
        #user-form .top_bar #routy{
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
        #user-form legend{
            display: block;
            text-align: center;
            font-size: 40px;
            border-bottom: 1px solid;
            margin-bottom: 30px;
            padding-top: 10px;
        }
        #user-form .flex{
            display: grid;
            column-gap: 30px;
            justify-content: space-between;
            grid-template-columns: 1fr 1fr;
            
        }
        .flex .input-block input{
            width: 100%;
        }
        .input-block{
            height: 100%;
            margin: 0;
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
        #user-form #btn_next a{
            height: 50px;
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }
    /* =======================FORM PET==================================== */
    #pet-form header a{
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
    #pet-form header a{
        color: rgb(2, 119, 134);
    }
    #pet-form header a:hover{
        color: rgb(0, 255, 234);
        background-color: rgb(0, 168, 160);
    }
    #pet-form{
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
    #pet-form .add-photo{
        display: block;
        margin: 2rem 0;
    }
    #pet-form .add-photo .unselected{
        width: 100%;
        display: flex;
        border: .19rem solid  rgb(0, 255, 234);
        border-bottom: .5rem solid  rgb(4, 255, 255);
        border-radius: 1rem;
        padding: 0rem;
        height: 30rem;
        justify-content: center;
        align-items: center;
        color: rgb(0, 255, 255);
        cursor: pointer;
    }
    #pet-form .add-photo .selected{
        height: 7rem;
        width: 100%;
        display: flex;
        border: .2rem solid  #d6027e;
        border-bottom: .5rem solid  #d6027e;
        border-radius: 1rem;
        padding: 0rem;
        justify-content: center;
        align-items: center;
        color: rgb(40, 224, 24);
        cursor: pointer;
    }
    .add-photo #preview-pet{
        border: .3rem solid  #d6027e;
        border-bottom: .5rem solid  #d6027e;
        padding: .5rem;
        border-radius: 1rem;
        width: 100%;
    }
    
    #pet-form .input-block input[type=checkbox]{
        height: 2.5rem;
        
    }
    #pet-form .input-block input:focus, #pet-form .input-block input:valid{
        padding: 1rem;
        height: 5.6rem;
        background-color: rgb(4, 255, 234);
        border-radius: 1rem;
        color:rgb(2, 119, 134)
    }
    
    #pet-form .select-block select{
        width:100%;
        height: 6rem;
        border-radius: 1rem;
        background:  rgb(3, 255, 234);
        border: none;
        color: rgb(2, 119, 134);
        margin-bottom: 4rem;
    }
    #pet-form .select-block select option{
        font-size: .8rem;
        width: 10rem;
        color: rgb(2, 119, 134);
        box-shadow: none;
    }
    #pet-form .checkbox-house, 
    #pet-form [type=checkbox],
    #pet-form .checkbox-medal{
        display: grid;
        grid-template-columns: 6% 1fr;
        align-items: center;
        height: 5rem;
    }   
    #pet-form .checkbox-house label{
        margin-left: 1rem;
    } 
    #pet-form .vacination_field .input-block{
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
        display: block;
        margin-top: 5rem;
        width: 100%;
        height: 8rem;
        border-radius: 1rem;
        background-color: rgb(3, 255, 234);
        color: rgb(2, 119, 134);
    }
    @media(min-width: 800px){
        #pet-form header a{
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
        #pet-form{
            padding: 20px;
            height: 100%;
        }
         #pet-form .add-photo{
            width: 50%;
            position: relative;
            display: flex;
            align-items: center;            
        }
        #pet-form .add-photo .unselected{
            height: 300px;
            width: 100%;
            font-size: 30px;
            transition: all 400ms;
        }
        #pet-form .add-photo .selected{
            position: absolute;
            display: flex;
            top: 0;
            transition: all 400ms;
            height: 100%;
            width: 100%;
            font-size: 20px;
            opacity: 0;
        }
        #pet-form .add-photo .selected:hover{
            opacity: 1;
            background: black;
        }
        #pet-form .add-photo .unselected:hover,
        #pet-form .add-photo .selected:hover{
            background: rgba(255, 0, 98, 0.39);
            color: white;
        }
        #pet-form .add-photo #preview-pet,
        #pet-form .add-photo .unselected,
        #pet-form .add-photo .selected{
            border: 2px solid #d6027e;
            border-bottom: 4px solid#d6027e;
        }
        #pet-form .input-block input:focus, #pet-form .input-block input:valid{
            height: 50px;
        }
        #pet-form .input-block input[type=checkbox]{
            height: 15px;
        }
        #pet-form fieldset legend, legend{
            font-size: 40px;
        }
        #pet-form .select-block{
            padding: 20px 0;
        }
        #pet-form .select-block select{
            margin: 0;
            margin-left: 10px;
            width: 20%;
            height: 50px;
        }
        #pet-form .select-block select option{
            font-size: 20px;
            
        }
        #pet-form .vacination_field .input-block{
            padding: 0;
            height: 50px;
        }
         #pet-form .vacination_field .subinput-block input{
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