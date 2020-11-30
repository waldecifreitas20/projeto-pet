<template>
    <div id="page-user">
        <header>
            <TopBarMenu :slot2="myData" :slot4="scheduleVac" :slot3="missingPet" :slot1="logOut" @changepa="menuOptions"/>
        </header>
        <div id="container">
            <div id="home" class="page">
                <header>
                    <h1>Meus Pets</h1> 
                    <div class="grid-header">
                        <div class="input-block" v-for="(item,index) in pets" :key="item.id">
                            <input type="radio" name="pet" :id="index" class="input-radio" @click="changePet('.input-radio')" checked>
                            <label :for="index">{{item.name}}</label>
                        </div>
                        <a href="#add_pet" class="btn-add" @click="changePage('#home','#add_pet')"><span></span>Adicionar pet</a>
                    </div>     
                </header>

                <div class="view-pet" v-for="pet in pets" :key="pet.id">
                    <ul class="list-data-pet" v-if="pet.check">
                        <img :src="pet.photo" class="img-item" v-if="pet.photo != ''">
                        <div class="not-found-img" v-else><span>+</span>Adicionar foto</div>
                        <div class="list-item-block">
                            <li class="list-item" name="name-pet" id="name-pet"><h1>{{pet.name}}</h1></li>
                            <li class="list-item" name="age-pet" id="age-pet">idade: {{pet.birth}}</li>
                            <li class="list-item" name="specie-pet" id="specie-pet">Espécie: {{pet.specie}}</li>
                            <li class="list-item" name="next-vacine" id="next-vacine">Proxima vacina: {{pet.nextVac}}</li>
                            <li class="list-item" name="identifier" id="identifier">ID: {{pet.id}}</li>
                            <li class="list-item" name="responsible" id="responsible">Responsavel: {{pet.caregiver}}</li>
                            <li class="list-item" name="address" id="address">Endereço: {{pet.address}}</li>
                            <li class="list-item" name="complement" id="complement">Complemento: {{pet.complement}}</li>
                            <li class="list-item" name="last-localization" id="last-localization">Ultima localização: <iframe :src="pet.lastLoc"></iframe></li>
                        </div>    
                    </ul>
                </div>
                            
                <div class="btn-block">
                    <Buttons value="Editar dados" route="#add_pet" id="btn-edit" @click="changePage('#home','#add_pet')"/>
                    <Buttons value="Atualizar Localização" id="btn-update"/>
                </div>
                
            </div>

            <div id="my_profile" class="page">
                <div>
                    <a href="#home" @click="changePage('#my_profile','#home')" class="btn-back">Voltar</a>
                </div>
                <form method="POST" id="form-user">
                    <fieldset>
                        <legend>Seus dados</legend>
                        
                        <div class="input-block name">
                            <label for="name">Nome:</label>
                            <input type="text" name="name" id="name" required pattern="^[a-zA-Z][a-zA-Z-_\.]{1,20}$" placeholder="Nome Completo" v-model="userData.name">
                        </div>
                        <div class="input-block email">
                            <label for="email">E-mail:</label>
                            <input type="email" name="email" id="email" required placeholder="ex: carlos@augusto.com" v-model="userData.email">
                        </div>
                        <div class="flex">
                                <div class="input-block address">
                                <label for="address">Endereço:</label>
                                <input type="text" name="address" id="address" required placeholder="Rua,Tv, Av, Alameda,..." v-model="userData.address">
                            </div>
                            <div class="input-block complement">
                                <label for="address">Complemento:</label>
                                <input type="text" name="complement" id="complement" required placeholder="ex: Condomínio, apto, cohab..." v-model="userData.complement">
                            </div>
                            <div class="input-block number">
                                <label for="number">Nº:</label>
                                <input type="number" name="number" id="number" required pattern="[0-9]{3}" placeholder="XXX" v-model="userData.number">
                            </div>
                            <div class="input-block neighborhood">
                                <label for="neighborhood">Bairro</label>
                                <input type="text" name="neighborhood" id="neigh" required pattern="[A-Za-z1-9]+" placeholder="Conceição" v-model="userData.neighborhood">
                            </div> 
                            <div class="input-block cep">
                                <label for="cep">CEP</label>
                                <input type="text" name="cep" id="cep" required pattern="[0-9]{8}" placeholder="XXXXXXXX" v-model="userData.cep">
                            </div>
                            <div class="input-block tel">
                                <label for="tel">Telefone:</label>
                                <input type="text" name="tel" id="tel" required pattern="[/(][0-9]{2}[/)][0-9]{9}" placeholder="(XX) XXXXX-XXXX" v-model="userData.tel">
                            </div>     
                        </div> 
                        <div class="input-block password">
                            <label for="password">Senha:</label>
                            <input type="password" name="password" id="password" required placeholder="Digite sua senha" @keyup="onChangePassword" v-model="userData.comparePassword">
                        </div>          
                    </fieldset>
                </form>
                <button type="submit" :class="{'actived': clickable, 'desactived': !clickable }" id="btn-submit" @click="validPassword()" disabled>Salvar</button>
            </div>

            <div id="add_pet" class="page">
                <div>
                    <a href="#home" @click="changePage('#add_pet','#home')" class="btn-back">Voltar</a>
                </div>
                <form action="" method="post" id="form-pet" enctype="multipart/form-data">
                    <fieldset>        

                        <legend>Dados do PET</legend>
                        
                        <div class="add-photo">
                            <img src="" alt="" id="preview-pet" v-show="selected">
                            <input type="file" name="" id="select-file" accept=".png, .jpg" @change="previewFile" hidden>
                            <label for="select-file" :class="{ 'selected': selected, 'unselected': !selected }">Selecionar Foto +</label>
                        </div>
                        
                        <div class="flex">
                            <div class="input-block name-pet">
                                <label for="name">Nome:</label>
                                <input type="text" name="name_pet" v-model="formData.dataPet.name" id="name_pet" pattern="[A-Za-z]+" required>
                            </div>
                            <div class="input-block years">
                                <label for="name">Nascimento:</label>
                                <input type="date" name="years" id="years" v-model="formData.dataPet.birth" required>
                            </div>
                        </div>

                        <div class="input-block checkbox-medal">                            
                            <input type="checkbox" name="chk_medal" id="chk_medal" v-model="formData.dataPet.checkMedal">
                            <label for="chk_medal">Já tenho uma medalha</label>
                        </div>
                        <div class="input-block medal" v-if="formData.dataPet.checkMedal">
                            <label for="address">Informe o ID da medalha:</label>
                            <input type="text" name="id_pet" id="id_pet" v-model="formData.dataPet.idMedal" required>
                        </div>
                        
                        <div class="input-block checkbox-house">                            
                            <input type="checkbox" name="chk_house" id="chk_house" checked v-model="formData.dataPet.sameAddress">
                            <label for="chk_house">O animal mora em minha residência</label>
                        </div>

                        <div class="block-plus-pet" v-if="!formData.dataPet.sameAddress">
                            <div class="input-block address">
                                <label for="address">Endereço:</label>
                                <input type="text" name="address_pet" id="address_pet" v-model="formData.dataPet.address" required>
                            </div>
                            <div class="input-block number_house_pet">
                                <label for="cep_pet">Nº:</label>
                                <input type="number" name="number_house_pet" id="number_house_pet" v-model="formData.dataPet.number" required>
                            </div>
                            <div class="input-block neighborhood">
                                <label for="neighborhood_pet">Bairro:</label>
                                <input type="text" name="neighborhood_pet" id="neighborhood_pet" v-model="formData.dataPet.neighborhood" required>
                            </div>
                            <div class="input-block cep_pet">
                                <label for="cep_pet">CEP:</label>
                                <input type="number" name="cep_pet" id="cep_pet" v-model="formData.dataPet.cep" required>
                            </div>
                        </div>
                        
                        <fieldset class="vacination_field">
                            <legend>Vacinação</legend>
                            <div class="select-block">
                                <label for="species">Selecione a espécie do seu animal</label>
                                <select name="species" id="species" required v-model="formData.dataPet.specie">
                                    <option :value="null" disabled selected>--selecione uma opção--</option>
                                    <option value="cat">Gato</option>
                                    <option value="dog">Cachorro</option>
                                </select>
                            </div>
                            <!-- ==========================CAT HTML BLOCK=========================== -->
                            <div class="species_cat" v-if="(formData.dataPet.species == 'cat')">

                                <div class="input-deworming deworming_cat">
                                    <div class="input-block">
                                        <input type="checkbox" name="check_deworming" id="check_deworming_c" v-model="formData.dataPet.vaccines.deworming.check">
                                        <label for="check_deworming_c">Vermifugação</label>
                                    </div>                                        
                                    <div class="subinput-block" v-if="formData.dataPet.vaccines.deworming.check">
                                        <label for="input_deworming">Data da última dose:</label>
                                        <input type="date" required name="date_deworming" id="input_vermifu_cg" v-model="formData.dataPet.vaccines.deworming.lastDose">                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_cat">
                                    <div class="input-block">
                                        <input type="checkbox" name="check_antRab" id="check_antRab_c" v-model="formData.dataPet.vaccines.antRab.check">
                                        <label for="check_antRab_c">Anti-Rábica</label>                            
                                    </div>                                    
                                    <div class="subinput-block" v-if="formData.dataPet.vaccines.antRab.check">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" required name="date_antRab" id="input_antRab_c" v-model="formData.dataPet.vaccines.antRab.lastDose">                                   
                                    </div>                                    
                                </div>

                                <div class="input-valences valences_cats">
                                    <div class="input-block">
                                        <input type="checkbox" name="check_valences" id="check_valences_c" v-model="formData.dataPet.vaccines.valences.check">
                                        <label for="check_valences_c">V3, V4 ou V5</label>                                    
                                    </div>                                    
                                    <div class="subinput-block" v-if="formData.dataPet.vaccines.valences.lastDose">
                                        <label for="input_valences">Data da última dose:</label>
                                        <input type="date" required name="date_valences" id="input_valences_c">                                    
                                    </div>                                    
                                </div>

                            </div>
                            <!-- ==========================DOG HTML BLOCK=========================== -->
                            <div class="species_dog" v-else>

                                <div class="input-deworming deworming_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="check_deworming" id="check_deworming" v-model="formData.dataPet.vaccines.deworming.check" >
                                        <label for="check_deworming">Vermifugação</label>                                   
                                    </div>                                    
                                    <div class="subinput-block" v-if="formData.dataPet.vaccines.deworming.check">
                                        <label for="input_deworming">Data da última dose:</label>
                                        <input type="date" name="date_deworming" id="input_deworming" v-model="formData.dataPet.vaccines.deworming.lastDose" required>                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="check_antRab" id="check_antRab" required v-model="formData.dataPet.vaccines.antRab.check">
                                        <label for="check_antRab">Anti-Rábica</label>
                                    </div>                                    
                                    <div class="subinput-block" v-if="formData.dataPet.vaccines.antRab.check">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" name="date_antRab" id="input_antRab" v-model="formData.dataPet.vaccines.antRab.lastDose" required>                                   
                                    </div>                                    
                                </div>

                                <div class="input-valences valences_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="check_antRab" id="check_valences" v-model="formData.dataPet.vaccines.valences.check">
                                        <label for="check_valences">V8 ou V10</label>                                    
                                    </div>                                    
                                    <div class="subinput-block" v-if="formData.dataPet.vaccines.valences.check">
                                        <label for="input_valences">Data da última dose:</label>
                                        <input type="date" name="date_valences" id="input_valences" v-model="formData.dataPet.vaccines.valences.lastDose" required>                                    
                                    </div>
                                </div>

                            </div>                            
                        </fieldset>
                        <button @click.prevent="uploadImage" class="submit">Enviar</button>
                    </fieldset>
                </form>
            </div>

            <div id="missing_pet" class="page">
                <div>
                    <a href="#home" @click="changePage('#add_pet','#home')" class="btn-back">Voltar</a>
                </div>

            </div>   
            <div id="vacination" class="page">
                <div>
                    <a href="#home" @click="changePage('#vacination','#home')" class="btn-back">Voltar</a>
                </div>
                <header class="header">
                    <h1>Meus Pets</h1> 
                    <div class="grid-header">
                        <div class="input-block" v-for="(item,index) in pets" :key="item.id">
                            <input type="radio" name="pet" :id="index+150" class="input-radio2" @click="changePet('.input-radio2')" checked>
                            <label :for="index+150">{{item.name}}</label>
                        </div>
                    </div>             
                </header>
                    <div class="table-block" v-for="item in pets" :key="item.id">
                        <img :src="item.image" :alt="item.name" v-if="item.check" class="img-pet">
                        <table class="table" v-if="item.check">
                            <caption>Tabela de Vacinas - {{item.name}}</caption>
                            <tr class="table-rows rows-tile">
                                <th class="table-title">Espécie</th>
                                <th class="table-title">Vacina</th>
                                <th class="table-title">Próxima Dose</th>
                            </tr>
                            <tr class="table-rows rows-items"> 
                                <td class="table-item">{{item.specie}}</td>
                                <td class="table-item">Anti Rabica</td>
                                <td class="table-item">{{item.nextVac}}</td>
                            </tr>
                        </table>
                    </div>
                    
            </div>     
           
        </div>
    </div> 
       
</template>
<script>
import Buttons from '../../components/Buttons.vue';
import TopBarMenu from '../../components/TopBarMenu';

export default {
    mounted : function(){
       // this.getDataForm(); // Carrega dados do servidor
        this.selected = false;
        this.fileSelected = null;
        this.formData.dataUser = this.dataUser;
        var currentURL = location.href.toString()
        var pages = document.querySelectorAll('.page')
        for(let i = 0; i < pages.length; i++){
            pages[i].style.display= 'none'
        }
        if(currentURL.indexOf(this.myData.route) != -1){
            this.menuOptions(this.myData.route)
        }else if(currentURL.indexOf(this.missingPet.route) != -1){
            this.menuOptions(this.missingPet.route);
        }else if(currentURL.indexOf(this.scheduleVac.route) != -1){
            this.menuOptions(this.scheduleVac.route);
        }else if (currentURL.indexOf('add_pet') != -1){
            document.querySelector('#add_pet')
            .style.display = 'block';
        }else if (currentURL.indexOf('#edit_pet') != -1) {
            document.querySelector('#edit_pet')
            .style.display = 'block';
        }else {
            var $ = document.querySelector('#home')
            $.style.display = 'block'
        }
    },
    updated : function() {
        if (this.formData.dataPet.sameAddress) {
            this.formData.dataPet.cep          = this.formData.dataUser.cep;
            this.formData.dataPet.number       = this.formData.dataUser.number;
            this.formData.dataPet.address      = this.formData.dataUser.address;
            this.formData.dataPet.complement   = this.formData.dataUser.complement;
            this.formData.dataPet.neighborhood = this.formData.dataUser.neighborhood;
        }        
    },
    data : function(){
        return{    
            fileSelected : Object,
            selected : false, 
            clickable: false,
            logOut : {      // Variável de controle TopBar
                value : 'Sair',
                route: '/',
            },
            myData : {      // Variável de controle TopBar
                value : 'Meu Perfil',
                route : '#my_profile',
            },
            missingPet : {  // Variável de controle TopBar
                value : 'Seu PET sumiu?',
                route : '#missing_pet'
            },
            scheduleVac : { // Variável de controle TopBar  
                value : 'Vacinas',
                route : '#vacination'
            },

            formData : {    // Variavel de escrita de dados
                dataUser : { // Dados do usuário
                    name : 'Jubior',                              
                    email : 'asxsaasxa',
                    password : 'saas',
                    confirmPassword : 'asaassds', 
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
                },
            },
            
            userData : {     // Variavel de leitura de dados
                name : 'Junior',
                email : 'juniosantos21@hotmail.com',
                password : '123456789',
                comparePassword: '',
                address : 'Rua da Mata',
                complement : 'Entre passagem nova e 6ª rua',
                number : '744',
                neighborhood : 'Marambaia',
                cep : '66615420',
                tel : '(91)996223591',
            },
            pets : [        // Variavel de leitura de dados
                {
                    check: true,
                    name : 'Bombadier Sant',
                    birth : '10',
                    photo:'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_450x337.jpg" alt="cachorro',
                    specie : 'Cachorro',
                    nextVac : 'Anti Rabica - 20/03/25',
                    id : '$gW55#h0K4ç8.Xof80+a',
                    responsible : 'Augusto César Filho',
                    address : 'Rua Quintino Veiga, 852',
                    complement : 'Altos',
                    lastLoc : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510555.88086461107!2d-48.60194212167592!3d-1.345755896513534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66936bb845ca05f4!2sPdg%20mirai%20offices%20-%20Rua%20Municipalidade%20-%20Reduto%2C%20Bel%C3%A9m%20-%20PA!5e0!3m2!1spt-BR!2sbr!4v1601405619400!5m2!1spt-BR!2sbr"
                },
                {
                    check : false,
                    image : 'https://static1.patasdacasa.com.br/articles/7/44/7/@/1498-algumas-racas-de-cachorro-sao-mais-indep-opengraph_1200-1.jpg',
                    name : 'Gustavo',
                    age : '10',
                    specie : 'Cachorro',
                    nextVac : 'Anti Rabica - 05/10/21',
                    id : '$gW55#h0K4ç8.Xof80+a',
                    responsible : 'Augusto César Filho',
                    address : 'Rua Quintino Veiga, 852',
                    complement : 'Altos',
                    lastLoc : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510555.88086461107!2d-48.60194212167592!3d-1.345755896513534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66936bb845ca05f4!2sPdg%20mirai%20offices%20-%20Rua%20Municipalidade%20-%20Reduto%2C%20Bel%C3%A9m%20-%20PA!5e0!3m2!1spt-BR!2sbr!4v1601405619400!5m2!1spt-BR!2sbr"
                },            
            ] 
        }
    },
    components:{
        TopBarMenu,
        Buttons,
    },   
    methods : {
        getDataForm() {
            const ENDPOINT_URL = 'https://api.petcode.com/5/data-form';
            fetch(ENDPOINT_URL)
            .then(resolve => resolve.json)
            .then(json => this.pets = json)// pega um vetor de objetos 
            .catch(console.error);
        },
        menuOptions($route) {
            var all  = document.querySelectorAll('.page')
            
            for(let i = 0; i < all.length; i++){
                all[i].style.display = 'none'
            }
            this.changePage('', $route)
        },        
        addPet() {
            this.pets.sort(this.formUpdate);
        },
        changePet($) {
            var pet = document.querySelectorAll($)
            
            for(let i = 0; i < pet.length; i++){
                this.pets[i].check = false
            }            
            for(let i = 0; i < pet.length; i++){
                if(pet[i].checked){
                    this.pets[i].check = true                    
                }else if(pet.checked){
                    this.pets[i].check = true
                }
            }           
        },
        changePage(pageFrom, pageTo) {
            if(pageTo.length > 0){
                var to = document.querySelector(pageTo)
                to.style.display = 'block'               
            }
            if(pageFrom.length > 0){
                var from = document.querySelector(pageFrom)
                from.style.display = 'none'
            }           
        },
        previewFile(event) {
            alert(this.fileSelected);
            this.fileSelected = event.target.files[0]
            try {
                const previewPet = document.querySelector('#preview-pet');
                const reader = new FileReader();
                this.selected = true;
                reader.onload = (onload) => previewPet.src = onload.target.result;
                reader.readAsDataURL(this.fileSelected);
                console.log(this.fileSelected);
            } catch (error) {
                console.error(error);
            }
        },
        uploadImage() {
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
            const data = new FormData();
            data.append('image', this.fileSelected);

            doUpload('https://api.imgur.com/3/image', {
                method : 'POST',
                body : data,
                headers : {
                    'Authorization' : `Client-ID ${CLIENT_ID}`,
                }
            })
            .then(resolve => {
                console.log(resolve.data.link);
                this.pets[0].image = resolve.data.link;
            })
            .catch(console.error).finally(() => {
                console.log(this.pets[0].image);
            })
        },
        submitForm() {
            const API_ENDPOINT = 'https://api.petcode.com/6/posts';
            fetch(API_ENDPOINT, {
                method : 'POST',
                body : JSON.stringify(this.formData),
                headers : {
                    'Content-type' : 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(console.log)
            .catch(console.error)
        },
        validPassword() {
            var btn = document.querySelector('#btn-submit')
            if(this.userData.comparePassword != this.userData.password){
                alert('Senha incorreta!')                
                console.log(btn);
            }else{
                btn.setAttribute('form', 'form-user')
            }
        },
        onChangePassword() {
            var password = document.querySelector('#password')
            var btn = document.querySelector('#btn-submit')
            if(password.value.length > 7){
                this.clickable = true
                btn.disabled = false
            }else{
                this.clickable = false
                btn.disabled = true
            }            
        },
    }
}
</script>

<style scoped>

    #page-user{
        width: 100%;
        background: white;
        padding: 2rem;
        height: 100%;
    }
    
    .btn-back{
        color: #5e02d6;
        font-size: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 2rem;
        border: .3rem solid;
        padding: 2.5rem;
        
        width: 100%;
        height: 5rem;
        border-radius: 1rem;
        transition: all 300ms;
    }
    .btn-back:hover{
        background: #5e02d6;
        color: white;
        border-color: #5e02d6;
    }
    @media (min-width: 800px) {
        .btn-back{  
            font-size: 20px;
            border: 2px solid;
            padding: 2px;
            width: 70px;
            height: 40px;
            border-radius: 10px;
        }
    }
    /* ======================HOME====================== */
    #home{
        font-size: 200%;
        padding-top: 25rem;
        padding-bottom: 0;
        margin: 0;
        position: relative;
        top: -15rem;
        display: block;
        height: 100%;
        width: 100%;
    }
    #home header h1{
        border-bottom: .4rem solid;
        margin-bottom: 1rem;
        
    }
    #home header .input-block{
        display: inline-block;
        margin-right: 1rem;
    }

    #home .input-block label{
        display: flex;
        border: .3rem solid #d6027e;
        padding: .3rem;
        width: 100%;
        height: 5rem;
        align-items: center;
        margin-right: 1rem;
        border-radius: 1rem;
        margin-top: 1rem;
        cursor: pointer;
        transition: all .4s;
    }
    #home .input-block label::before{
        content: ""; 
        display: inline-block;
        width: 2rem;
        height: 2rem;       
        border: .3rem solid #d6027e;
        border-radius: 100%;
        margin: 0 1rem;
        transition: all .4s;
    }
    #home .input-block{
        margin:  0;
    }
    #home .input-block label:hover{
        background: #fc6ec1;
        color: white;
    }
    #home .input-block [type="radio"]:checked + label{
        background: #d6027e;
        color: white;
    }
    #home .input-block [type="radio"]:checked + label::before{
        width: 1rem;
        height: 1rem;
        border: .8rem solid white;
    }
    #home header .input-block .input-radio{
        display: none;
        width: 2rem;
        height: 2rem;
    }
    .btn-add{
        display: block;
        border: .2rem solid;
        width: 50%;
        padding: 1rem;
        margin: 2rem 0;
        border-radius: 1rem;
        text-align: center;
        color: #d6027e;

        transition: all 400ms;
    }
    .btn-add:hover{
        background: #d6027e;
        color: white;
    }
    .btn-add span{
        color: rgb(0, 177, 0);
        margin-right: 1rem;
        padding: 1rem 2rem;
        background: url('../../assets/btn_add.png') no-repeat center;
        background-size: 100% 70%; 
    }
    #home iframe{
        width: 100%;
        height: 50rem;
        margin-top: 2rem;
        border-radius: 1rem;
    }
    #home h1,
    #home li{
        font-weight: 500;
        color: rgb(165, 55, 192);
    }
    #home .list-data-pet .list-item{
        margin-top: 1.5rem;
        border: .17rem solid;
        padding: 1rem;
        border-radius: 1rem;
        border-bottom: .3rem solid;
    }
    #home .list-data-pet .list-item:first-child{
        margin-bottom: 4rem;
        border-bottom: .4rem solid;
    }
    #home .img-item{
        border-radius: 1rem;
        border: .4rem solid rgba(184, 3, 255, 0.377);    
        border-bottom: .8rem solid rgba(184, 3, 255, 0.377);
    }

    #home .btn-block{
        display: flex;
        justify-content: space-between;
        margin-top: 4rem;
        padding: 2rem 0; 
    }
    #home .btn-block #btn-update,
    #home .btn-block #btn-edit{
        width: 23rem;
        font-size: 2.3rem;
        font-weight: 500;
        transition: all 200ms;
        cursor: pointer;
        
    }
    #home .btn-block #btn-update{
        color: rgb(0, 0, 0);
        background: rgb(0, 217, 255);
        box-shadow: 0.1rem .3rem rgb(0, 191, 224);
    }
    #home .btn-block #btn-edit{
        color: rgb(255, 255, 255);
        background: rgb(255, 0, 128);
        box-shadow: 0.1rem .3rem rgb(219, 0, 110);
    }
    #home .btn-block #btn-update:hover{
        background: rgb(0, 191, 244);
    }
    #home .btn-block #btn-edit:hover{
        background: rgb(219, 0, 110);
    }
    #home .list-data-pet img{
        width: 100%;
    }
    #home .view-pet .list-data-pet{
        margin-bottom: 5rem
    }
    @media(min-width: 800px){
        #home{
            padding-top: 300px;
            margin-bottom: 700px;            
        }
        #home header h1{
            font-size: 100%;
            border-bottom: 2px solid;
        }        
        #home .grid-header{
            display: grid;
            grid-template-columns: repeat(5,1fr);
            padding: 20px 0;
        }
        #home .grid-header .input-block{
            margin: 10px;
        }
        #home .input-block label{
            font-size: 20px;
            min-width: 200px;
            width: 100%;
            height: 50px;
            border: none;
            margin: 0;
            padding: 0;
            box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.082);
        }
        #home .input-block label::before{
            width: 13px;
            height: 13px;
            margin-right: 5px;
            border: 2px solid rgb(219, 0, 110);;
        }
        #home .input-block [type="radio"]:checked + label::before{
            width: 8px;
            height: 8px;
            border: 5px solid white;
        }
        #home .btn-add{
            width: 92.5%;
            height: 50px;
            display: flex;
            align-items: center;
            align-self: center;
            font-size: 20px;
            height: 50px;
            border: none;
            margin: 0;
            padding: 0 8px;
            box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.082);
        }
        #home .btn-add span{
            display: block;
            padding: 18px 15px;
            margin-right: 10px;
            background-position: left;
            background-size: 100% 80%;
        }
        .btn-add:hover{
            background: #d6027e;
            color: white;
            border-color: #d6027e;
        }

        #home .list-item-block #last-localization{
            position: absolute;
            display: block;
            left: 0;
            width: 100%;
            padding: 10px;
        }
        #home .list-data-pet{
            display: flex;
            justify-content: space-between;
        }
        #home .img-item{
            max-height: 350px;
            box-sizing: content-box;
            max-width: 50%;
            margin-top: 24px;
            display: block;
            border: 2px solid rgba(184, 3, 255, 0.377);    
            border-bottom: 4px solid rgba(184, 3, 255, 0.377);
        }
        #home .list-item-block{
            display: block;  
        }
        #home .list-item{
            margin: 0;
            font-size: 15px;
            width:  500px;
        }
        #home .btn-block{
            width: 50%;
            position: absolute;
            top: 70%;
            left: 0;
            flex-direction: column;
        }
        #home .btn-block #btn-edit,
        #home .btn-block #btn-update{
            height: 80px;
            width: 100%;
            margin: 20px 0;
            font-size: 25px;
        }
    }
    /* =====================ADD PET==================== */
     #add_pet{
        display: none;
        padding: 10rem 0;
        font-size: 3rem;
    }
    legend{
        display: block;
        width: 100%;
        font-size: 5rem;
        color: #d6027e;
        border-bottom: .3rem solid;
        margin-bottom: 2rem;
    }
    #add_pet .add-photo{
        display: block;
        width: 100%;
        margin-bottom: 4rem;
    }
    #add_pet .add-photo .unselected{
        width: 100%;
        display: flex;
        border: .3rem solid  #d6027e;
        border-bottom: .5rem solid  #d6027e;
        border-radius: 1rem;
        padding: 0rem;
        height: 30rem;
        justify-content: center;
        align-items: center;
        color: rgb(40, 224, 24);
        cursor: pointer;
    }
    #add_pet .add-photo .selected{
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
    #form-pet .input-block{
        color: #d6027e;
        margin: 2rem 0;
    }
    
    #form-pet .flex .input-block{
        margin-bottom: 2rem;
    }
    .input-block [type="checkbox"]{
        width: 2.4rem;
    }
    #form-pet .checkbox-house, 
    #form-pet [type=checkbox],
    #form-pet .checkbox-medal{
        display: grid;
        grid-template-columns: 6% 1fr;
        align-items: center;
        height: 3rem;
        gap: .3rem;
        box-shadow: none;
    }
    #form-pet .select-block{
       color: #d6027e;
    }
    #form-pet .select-block select{
        margin-top: 1rem;
        width:100%;
        height: 6rem;
        border-radius: 1rem;
        background-color: #fc6ec1;
        border: none;
        color: rgb(255, 255, 255);
        margin-bottom: 4rem;
        font-size: 3rem;
        padding: 0 1rem;
        box-shadow: .3rem .3rem 1rem #fc6ec1;
    }
    #form-pet .select-block select option{
        font-size: .8rem;
        width: 10rem;
        color: rgb(253, 253, 253);
        box-shadow: none;
    }
    #form-pet .vacination_field{
        margin-top: 5rem;
    }
    #form-pet .vacination_field .input-block{
        display: grid;
        grid-template-columns: 6% 1fr;
        align-items: center;
    }
    .vacination_field .subinput-block{
        margin-left: 3rem;
        color: #d6027e;
        font-size: 2.9rem;
    }
    
    .input-block input,
    .vacination_field .subinput-block input{
        width: 100%;
        display: block;
        height: 3rem;
        font-size: 3rem;
        background-color: transparent;
        
        padding: 2rem 0rem;
        transition: all 500ms;
        color: rgb(255, 0, 64);
        border-bottom: .3rem solid #d6027e;
    }
    .input-block input:valid,
    .input-block input:focus,
    .select-block select:focus,
    .subinput-block input:focus,
    .subinput-block input:valid{
        background-color: #fc6ec1;
        height: 6rem;
        color: black;
        border-radius: 1rem;
        box-shadow: .3rem .3rem 1rem #fc6ec1;
        padding: 1rem;
        
    }
    .submit, 
    .desactived,
    .actived{
        width: 100%;
        display: block;
        height: 7rem;
        background: rgb(255, 1, 56);
        border-radius: 1rem;
        font-size: 3rem;
        margin: 3rem 0;
        color: white;
    }
    #edit_pet{
        display: none;
    }
    @media (min-width: 800px) {
        #add_pet{
            padding: 0;
            margin: 0;
            padding-top: 90px;
            min-width: 100vh;

        }
        legend{
            font-size: 45px;
            border-bottom: 2px solid;
        }
        #form-pet .add-photo{
            width: 50%;
            position: relative;
            display: flex;
            align-items: center;            
        }
        #form-pet .add-photo .unselected{
            height: 300px;
            width: 100%;
            font-size: 30px;
            transition: all 400ms;
        }
        #form-pet .add-photo .selected{
            position: absolute;
            display: flex;
            top: 0;
            transition: all 400ms;
            height: 100%;
            width: 100%;
            font-size: 20px;
            opacity: 0;
        }
        #form-pet .add-photo .selected:hover{
            opacity: 1;
            background: black;
        }
        #form-pet .add-photo .unselected:hover,
        #form-pet .add-photo .selected:hover{
            background: rgba(255, 0, 98, 0.39);
            color: white;
        }
        #form-pet .add-photo #preview-pet,
        #form-pet .add-photo .unselected,
        #form-pet .add-photo .selected{
            border: 2px solid #d6027e;
            border-bottom: 4px solid#d6027e;
        }
        #form-pet .flex{
            display: flex;
            justify-content: space-between;
            width: 100%;
            gap: 50px;
        }
        #add_pet .flex{
            margin: 10px 0;
        }
        #add_pet #form-pet .input-block{
            width: 100%;
            font-size: 25px;
            height: 100%;
            margin: 10px;
        }
        #add_pet .input-block,
        #add_pet .subinput-block{
            font-size: 20px;
            margin-bottom: 20px;
        }
        #add_pet .input-block input,
        #add_pet .subinput-block input{
            height: 20px;
            padding: 12px 0;
            display: block;
            font-size: 20px;
            border-bottom: 2px solid #d6027e;
        }
        .input-block input:focus,
        .input-block input:valid,
        #add_pet #form-pet .subinput-block input:focus,
        #add_pet #form-pet .subinput-block input:valid{
            height: 50px;
            border-radius: 10px;
            padding: 0 10px;
        }
        .input-block [type="checkbox"]{
            width: 15px;
        }
        input::-webkit-inner-spin-button,
        input::-webkit-outer-spin-button{
            display: none;
        }
        #form-pet .checkbox-house, 
        #form-pet [type=checkbox],
        #form-pet .checkbox-medal{
            display: grid;
            grid-template-columns: 2% 1fr;
            align-items: center;
            height: 5px;
            gap: 0;
            box-shadow: none;
        }
        #form-pet .select-block{
            font-size: 25px;
        }
        #form-pet .select-block select{
            height: 50px;
            font-size: 20px;
            margin-bottom: 0;
        }
        #form-pet .submit{
            margin: 10px 0;
            width: 40%;
            height: 60px;
            font-size: 30px;
            transition: all 400ms;
        }
        #form-pet .submit:hover{
            background: rgb(228, 4, 53);
            transform: scale(1.01);
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.425) ;
        }
    } #add_pet{
        display: none;
        padding: 10rem 0;
        font-size: 3rem;
    }
    legend{
        display: block;
        width: 100%;
        font-size: 5rem;
        color: #d6027e;
        border-bottom: .3rem solid;
        margin-bottom: 2rem;
    }
    #add_pet .add-photo{
        display: block;
        width: 100%;
        margin-bottom: 4rem;
    }
    #add_pet .add-photo .unselected{
        width: 100%;
        display: flex;
        border: .3rem solid  #d6027e;
        border-bottom: .5rem solid  #d6027e;
        border-radius: 1rem;
        padding: 0rem;
        height: 30rem;
        justify-content: center;
        align-items: center;
        color: rgb(40, 224, 24);
        cursor: pointer;
    }
    #add_pet .add-photo .selected{
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
    #form-pet .input-block{
        color: #d6027e;
        margin: 2rem 0;
    }
    
    #form-pet .flex .input-block{
        margin-bottom: 2rem;
    }
    .input-block [type="checkbox"]{
        width: 2.4rem;
    }
    #form-pet .checkbox-house, 
    #form-pet [type=checkbox],
    #form-pet .checkbox-medal{
        display: grid;
        grid-template-columns: 6% 1fr;
        align-items: center;
        height: 3rem;
        gap: .3rem;
        box-shadow: none;
    }
    #form-pet .select-block{
       color: #d6027e;
    }
    #form-pet .select-block select{
        margin-top: 1rem;
        width:100%;
        height: 6rem;
        border-radius: 1rem;
        background-color: #fc6ec1;
        border: none;
        color: rgb(255, 255, 255);
        margin-bottom: 4rem;
        font-size: 3rem;
        padding: 0 1rem;
        box-shadow: .3rem .3rem 1rem #fc6ec1;
    }
    #form-pet .select-block select option{
        font-size: .8rem;
        width: 10rem;
        color: rgb(253, 253, 253);
        box-shadow: none;
    }
    #form-pet .vacination_field{
        margin-top: 5rem;
    }
    #form-pet .vacination_field .input-block{
        display: grid;
        grid-template-columns: 6% 1fr;
        align-items: center;
    }
    .vacination_field .subinput-block{
        margin-left: 3rem;
        color: #d6027e;
        font-size: 2.9rem;
    }
    
    .input-block input,
    .vacination_field .subinput-block input{
        width: 100%;
        display: block;
        height: 3rem;
        font-size: 3rem;
        background-color: transparent;
        
        padding: 2rem 0rem;
        transition: all 500ms;
        color: rgb(255, 0, 64);
        border-bottom: .3rem solid #d6027e;
    }
    .input-block input:valid,
    .input-block input:focus,
    .select-block select:focus,
    .subinput-block input:focus,
    .subinput-block input:valid{
        background-color: #fc6ec1;
        height: 6rem;
        color: black;
        border-radius: 1rem;
        box-shadow: .3rem .3rem 1rem #fc6ec1;
        padding: 1rem;
        
    }
    .submit, 
    .desactived,
    .actived{
        width: 100%;
        display: block;
        height: 7rem;
        background: rgb(255, 1, 56);
        border-radius: 1rem;
        font-size: 3rem;
        margin: 3rem 0;
        color: white;
    }
    #edit_pet{
        display: none;
    }
    @media (min-width: 800px) {
        #add_pet{
            padding: 0;
            margin: 0;
            padding-top: 90px;
            min-width: 100vh;

        }
        legend{
            font-size: 45px;
            border-bottom: 2px solid;
        }
        #form-pet .add-photo{
            width: 50%;
            position: relative;
            display: flex;
            align-items: center;            
        }
        #form-pet .add-photo .unselected{
            height: 300px;
            width: 100%;
            font-size: 30px;
            transition: all 400ms;
        }
        #form-pet .add-photo .selected{
            position: absolute;
            display: flex;
            top: 0;
            transition: all 400ms;
            height: 100%;
            width: 100%;
            font-size: 20px;
            opacity: 0;
        }
        #form-pet .add-photo .selected:hover{
            opacity: 1;
            background: black;
        }
        #form-pet .add-photo .unselected:hover,
        #form-pet .add-photo .selected:hover{
            background: rgba(255, 0, 98, 0.39);
            color: white;
        }
        #form-pet .add-photo #preview-pet,
        #form-pet .add-photo .unselected,
        #form-pet .add-photo .selected{
            border: 2px solid #d6027e;
            border-bottom: 4px solid#d6027e;
        }
        #form-pet .flex{
            display: flex;
            justify-content: space-between;
            width: 100%;
            gap: 50px;
        }
        #add_pet .flex{
            margin: 10px 0;
        }
        #add_pet #form-pet .input-block{
            width: 100%;
            font-size: 25px;
            height: 100%;
            margin: 10px;
        }
        #add_pet .input-block,
        #add_pet .subinput-block{
            font-size: 20px;
            margin-bottom: 20px;
        }
        #add_pet .input-block input,
        #add_pet .subinput-block input{
            height: 20px;
            padding: 12px 0;
            display: block;
            font-size: 20px;
            border-bottom: 2px solid #d6027e;
        }
        .input-block input:focus,
        .input-block input:valid,
        #add_pet #form-pet .subinput-block input:focus,
        #add_pet #form-pet .subinput-block input:valid{
            height: 50px;
            border-radius: 10px;
            padding: 0 10px;
        }
        .input-block [type="checkbox"]{
            width: 15px;
        }
        input::-webkit-inner-spin-button,
        input::-webkit-outer-spin-button{
            display: none;
        }
        #form-pet .checkbox-house, 
        #form-pet [type=checkbox],
        #form-pet .checkbox-medal{
            display: grid;
            grid-template-columns: 2% 1fr;
            align-items: center;
            height: 5px;
            gap: 0;
            box-shadow: none;
        }
        #form-pet .select-block{
            font-size: 25px;
        }
        #form-pet .select-block select{
            height: 50px;
            font-size: 20px;
            margin-bottom: 0;
        }
        #form-pet .submit{
            margin: 10px 0;
            width: 40%;
            height: 60px;
            font-size: 30px;
            transition: all 400ms;
        }
        #form-pet .submit:hover{
            background: rgb(228, 4, 53);
            transform: scale(1.01);
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.425) ;
        }
    }
    /* ====================MY PROFILE================== */
    #my_profile{
        padding-top: 10rem;
        height: 100%;
        position: relative;
        color: #d6027e;
    }
    #my_profile #form-user{
        font-size: 3rem;              
    }
    #my_profile #form-user a{
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
    #my_profile #form-user a:hover{
        background: rgb(3, 196, 180);
    }
    #my_profile .password{
        margin-top: 8rem;
        border: .2rem solid;
        padding: 2rem;
        border-radius: 1rem;
    }
    #my_profile .desactived{
        background: #ff004ca8;
        transition: all 400ms;
    }
    #my_profile .actived{
        background: #fa004b;
        transition: all 400ms;
    }
    @media(min-width: 800px){
        #my_profile{
            padding: 80px 0;
        }
        #my_profile .btn-back{
            margin: 10px;
        }
        #my_profile legend{
            margin-bottom: 20px;
            font-size:40px;
        }
        #my_profile .input-block{
            font-size: 40%;
            margin-bottom: 10px;
        }
        #my_profile .input-block input{
            font-size: 20px;
            padding: 10px;
        }
        #my_profile .flex{
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 20px;
        }
        #my_profile .password{
            margin: 0 auto;
            margin-top: 50px;
            height: 100%;
            width: 40%;
            padding: 10px;
            border-radius: 10px;
        }
        #my_profile .password input{
            height: 30px;
            padding-bottom: 8px;
            border-bottom: 2px solid #d6027e;
        }
        #my_profile .password input:valid,
        #my_profile .password input:focus{
            height: 50px;
        }
        #my_profile #btn-submit{
            width: 40%;
            height: 60px;
            border-radius: 10px;
            font-size: 30px;
            margin: auto;
            margin-top: 10px;
        }
        #my_profile .actived:hover{
            background: #cf013f;
        }
       
    }
    /* ====================EDIT PET==================== */

    /* ====================VACCINES==================== */
    #vacination{
        height: 100%;
        padding-top: 10rem;
        color: #d6027e;
        font-size: 3rem;
       
    }

    #vacination .header h1{
        border-bottom: .3rem solid;
        margin-bottom: 2rem;
    }
    #vacination .header .input-radio2{
        display: none;
    }
    #vacination .header .grid-header{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1.8rem;
        
    }
    #vacination .img-pet{
        display: flex;
        width: 100%;
        border: 2px solid;
        padding: 5px;
        border-radius: 20px;
        margin: 0;
        margin-top: 50px;
    }
    #vacination .header .input-block{
        height: 7rem;     
        display: flex;
        align-items: center;   
    }
    #vacination .header .input-block label{
        width: 100%;
        display: flex;
        padding: .5rem;
        border: .3rem solid;
        border-radius: 1rem;
        align-items: center;
        align-self: center;
    }
    #vacination .header .input-block label:hover{
        background: #d6027e;
        color: white;
    }
     #vacination .header .input-block label::before{
        content: "";
        width: 2rem;
        height: 2rem;
        display: inline-block;
        border: .3rem solid;
        border-radius: 100rem;
        margin: auto 0;
        margin-right: 1rem;
    } 

    #vacination .table{
        border: .3rem solid;
        padding: .5rem;
        border-radius: 1rem;
        margin-top: 5rem;
        font-size: 3.4rem;
    }
    #vacination .table .table-title{
        height: 5rem;
        background: violet;
        padding: 1rem;
        border-right: .3rem solid;
        border-radius: 1rem 1rem 0 0;
    }
    #vacination .table .table-item{
        border: .2rem solid;
        height: 5rem;
        padding: 1rem
    }
    @media(min-width: 800px){
        #vacination{
            padding-top: 80px;
            font-size: 20px;
        }
        #vacination .header .input-block{
            height: 100%;
            margin: 5px 0;
        }
        #vacination .header .input-block input:checked ~ label{
            background: #d6027e;
            color: white;
        }
        #vacination .header .input-block label::before{
            content: "";
            width: 10px;
            height: 10px;
            display: inline-block;
            border: .3rem solid;
            border-radius: 100rem;
            margin: auto 0;
            margin-right: 1rem;
        }
    }
</style>