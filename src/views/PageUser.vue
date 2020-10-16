<template>
    <div id="page-user">
        <header>
            <TopBarMenu :slot2="myData" :slot4="scheduleVac" :slot3="missingPet" :slot1="logOut"/>
        </header>
        <div id="container">
            <div id="home">
                <header>
                    <h1>Meus Pets</h1>                    
                    <div class="input-block" v-for="(item,index) in pets" :key="item.id">
                        <input type="radio" name="pet" :id="index" class="input-radio" @click="changePet" checked>
                        <label :for="index">{{item.name}}</label>
                    </div>
                    <a href="#add_pet" class="btn-add" @click="changePage('#home','#add_pet')"><span></span>Adicionar pet</a>
                </header>
                
                
                <div class="view-pet" v-for="pet in pets" :key="pet.id">
                    <ul class="list-data-pet" v-if="pet.check">
                        <img :src="pet.image" class="img-item" v-if="pet.image != ''">
                        <div class="not-found-img" v-else><span>+</span>Adicionar foto</div>
                        <div class="list-item-block">
                            <li class="list-item" name="name-pet" id="name-pet"><h1>{{pet.name}}</h1></li>
                            <li class="list-item" name="age-pet" id="age-pet">idade: {{pet.age}}</li>
                            <li class="list-item" name="specie-pet" id="specie-pet">Espécie: {{pet.specie}}</li>
                            <li class="list-item" name="next-vacine" id="next-vacine">Proxima vacina: {{pet.nextVac}}</li>
                            <li class="list-item" name="identifier" id="identifier">ID: {{pet.id}}</li>
                            <li class="list-item" name="responsible" id="responsible">Responsavel: {{pet.responsible}}</li>
                            <li class="list-item" name="address" id="address">Endereço: {{pet.address}}</li>
                            <li class="list-item" name="complement" id="complement">Complemento: {{pet.complement}}</li>
                            <li class="list-item" name="last-localization" id="last-localization">Ultima localização: <iframe :src="pet.lastLoc" width="250" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></li>
                        </div>    
                    </ul>
                </div>
                            
                <div class="btn-block">
                    <Buttons value="Editar dados" route="#add_pet" id="btn-edit" @click="changePage('#home','#add_pet')"/>
                    <Buttons value="Atualizar Localização" id="btn-update"/>
                </div>
                
            </div>
            <div id="my_profile">

            </div>
            <div id="pet_data">
            </div>
            <div id="add_pet">
                <form action="" method="post" id="form-pet" enctype="multipart/form-data">
                    <fieldset>                      
                        <legend>Dados do PET</legend>
                        
                        <div class="add-photo">
                            <img src="" alt="" id="preview-pet" v-show="selected">
                            <input type="file" name="" id="select-file" accept=".png, .jpg" @change="selectedFile" hidden>
                            <label for="select-file" :class="{ 'selected': selected, 'unselected': !selected }">Selecionar Foto +</label>
                        </div>
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
                            <label for="chk_house">O animal mora em minha residência</label>
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
                                        <label for="chk_vac_vermifug_c">Vermifugação</label>
                                    </div>                                        
                                    <div class="subinput-block" v-if="vacination_check[0]">
                                        <label for="input_vermifug">Data da última dose:</label>
                                        <input type="date" required name="date_vermifug" id="input_vermifu_cg">                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_cat">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_antRab_c" v-model="vacination_check[1]">
                                        <label for="chk_vac_antRab_c">Anti-Rábica</label>                                    
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-if="vacination_check[1]">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" required name="date_antRab" id="input_antRab_c">                                   
                                    </div>                                    
                                </div>

                                <div class="input-valenties valenties_cats">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_valenties" id="chk_vac_valenties_c" v-model="vacination_check[2]">
                                        <label for="chk_vac_valenties_c">V3, V4 ou V5</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-if="vacination_check[2]">
                                        <label for="input_valenties">Data da última dose:</label>
                                        <input type="date" required name="date_valenties" id="input_valenties_c">                                    
                                    </div>
                                </div>
                            </div>
                            <!-- ==========================DOG HTML BLOCK=========================== -->
                            <div class="species_dog" v-else>

                                <div class="input-vermifugation vermifugation_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_vermifug" id="chk_vac_vermifug" v-model="vacination_check[0]" >
                                        <label for="chk_vac_vermifug">Vermifugação</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-if="vacination_check[0]">
                                        <label for="input_vermifug">Data da última dose:</label>
                                        <input type="date" name="date_vermifug" id="input_vermifug" required>                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_antRab" required v-model="vacination_check[1]">
                                        <label for="chk_vac_antRab">Anti-Rábica</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-if="vacination_check[1]">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" name="date_antRab" id="input_antRab" required>                                   
                                    </div>                                    
                                </div>

                                <div class="input-valenties valenties_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_valenties" v-model="vacination_check[2]">
                                        <label for="chk_vac_valenties">V8 ou V10</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-if="vacination_check[2]">
                                        <label for="input_valenties">Data da última dose:</label>
                                        <input type="date" name="date_valenties" id="input_valenties" required>                                    
                                    </div>
                                </div>
                            </div>                            
                        </fieldset>
                        <button type="submit" class="submit">Enviar</button>
                    </fieldset>
                </form>
            </div>
            <div id="edit_pet">
                <form action="" method="post" id="form-pet" enctype="multipart/form-data">
                    <fieldset>                      
                        <legend>Dados do PET</legend>
                        
                        <div class="add-photo">
                            <img src="" alt="" id="preview-pet" v-show="selected">
                            <input type="file" name="" id="select-file" accept=".png, .jpg" @change="selectedFile" hidden>
                            <label for="select-file" :class="{ 'selected': selected, 'unselected': !selected }">Selecionar Foto +</label>
                        </div>
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
                            <label for="chk_house">O animal mora em minha residência</label>
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
                                        <label for="chk_vac_vermifug_c">Vermifugação</label>
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
                                        <label for="chk_vac_valenties_c">V3, V4 ou V5</label>
                                    
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
                                        <label for="chk_vac_vermifug">Vermifugação</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[0]">
                                        <label for="input_vermifug">Data da última dose:</label>
                                        <input type="date" name="date_vermifug" id="input_vermifug">                                    
                                    </div>
                                </div>

                                <div class="input-antRab antRab_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_antRab" v-model="vacination_check[1]">
                                        <label for="chk_vac_antRab">Anti-Rábica</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[1]">
                                        <label for="input_antRab">Data da última dose:</label>
                                        <input type="date" name="date_antRab" id="input_antRab">                                   
                                    </div>                                    
                                </div>

                                <div class="input-valenties valenties_dog">
                                    <div class="input-block">
                                        <input type="checkbox" name="chk_vac_antRab" id="chk_vac_valenties" v-model="vacination_check[2]">
                                        <label for="chk_vac_valenties">V8 ou V10</label>
                                    
                                    </div>
                                    
                                    <div class="subinput-block" v-show="vacination_check[2]">
                                        <label for="input_valenties">Data da última dose:</label>
                                        <input type="date" name="date_valenties" id="input_valenties">                                    
                                    </div>
                                </div>
                            </div>                            
                        </fieldset>
                        <button type="submit" class="submit">Enviar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div> 
       
</template>
<script>
import TopBarMenu from '../components/TopBarMenu.vue'
import Buttons from '../components/Buttons.vue'
export default {
    data(){
        return{
            animal: String,
            check_address_pet:  true,
            vacination_check: [],
            directionForm: true,
            have_medal_check: false,
            selected : false,
            logOut : {
                value : 'Sair',
                route: '/'
            },
            myData : {
                value : 'Meu Perfil',
                route : '#my_profile'
            },
            missingPet : {
                value : 'Seu PET sumiu?',
                route : '#missing_pet'
            },
            scheduleVac : {
                value : 'Vacinas',
                route : '#vacination'
            },
            objeto : {
                    check: true,
                    image:'',
                    name : '',
                    age : '',
                    specie : '',
                    nextVac : '',
                    id : '',
                    responsible : '',
                    address : '',
                    complement : '',
                    lastLoc : ""
                },
            pets : [
                {
                    check: true,
                    image:'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_450x337.jpg" alt="cachorro',
                    name : 'Bombadier Sant',
                    age : '10',
                    specie : 'Cachorro',
                    nextVac : 'Anti Rabica - 20/03/21',
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
                    nextVac : 'Anti Rabica - 20/03/21',
                    id : '$gW55#h0K4ç8.Xof80+a',
                    responsible : 'Augusto César Filho',
                    address : 'Rua Quintino Veiga, 852',
                    complement : 'Altos',
                    lastLoc : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510555.88086461107!2d-48.60194212167592!3d-1.345755896513534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66936bb845ca05f4!2sPdg%20mirai%20offices%20-%20Rua%20Municipalidade%20-%20Reduto%2C%20Bel%C3%A9m%20-%20PA!5e0!3m2!1spt-BR!2sbr!4v1601405619400!5m2!1spt-BR!2sbr"
                },
                {
                    check: false,
                    image:'https://s2.glbimg.com/slaVZgTF5Nz8RWqGrHRJf0H1PMQ=/0x0:800x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/e/NTegqdSe6SoBAoQDjKZA/cachorro.jpg',
                    name : 'Whindersson',
                    age : '10',
                    specie : 'Cachorro',
                    nextVac : 'Anti Rabica - 20/03/21',
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
        Buttons
    },
    methods : {
        changePet(){
            var pet = document.querySelectorAll('.input-radio')
            
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
        addPet(){
            
        },
        changePage(pageFrom, pageTo){
            var from = document.querySelector(pageFrom)
            var to = document.querySelector(pageTo)
            
            from.style.display = 'none'
            to.style.display = 'block'
        },
        selectedFile(event){
            try {
                this.objeto.image = event.target.files[0]
               try {
                    const previewPet = document.querySelector('#preview-pet')
                    const reader = new FileReader()
                    const fileUpload = this.objeto.image
                    this.selected = true
                    reader.onload = event => previewPet.src = event.target.result
                    reader.readAsDataURL(fileUpload)
               } catch (error) {
                   console.error(error);
               }
            } catch (error) {
                console.error(error);
            }
            
        },
    }

}
</script>

<style scoped>

    #page-user{
        width: 100%;
        background: rgb(231, 138, 250);
        height: 100%;
        
    }
    #container{
        margin: auto;
        width: 90%;
        background: rgb(255, 255, 255);
        padding: 0rem 2.4rem;
        height: 100%;
        box-shadow: 0rem 0rem 2rem rgba(0, 0, 0, 0.37);
    }
    /* ===========================HOME=========================== */
    #home{
        z-index: 5;
        font-size: 3rem;
        padding-top: 25rem;
        margin: 0;
        position: relative;
        top: -15rem;
        height: 100%;
        display: none;
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
        opacity: 0;
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
        background: url('../assets/btn_add.png') no-repeat center;
        background-size: 100% 70%; 
    }
    #home iframe{
        z-index: 1;
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
    @media(min-width: 800px){
        #home{
            padding: 0;
            padding-top: 350px;
            height: 330vh;
        }
        #home header h1{
            font-size: 100%;
            border-bottom: 2px solid;
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
            width: 200px;
            height: 60px;
            display: flex;
            align-items: center;
            font-size: 20px;
            padding: 0;
            padding-top: 2px;
            padding-left: 10px;
        }
        #home .btn-add span{
            display: block;
            padding: 18px 15px;
            margin-right: 10px;
            background-position: left;
            background-size: 100% 80%;
        }
        #home .list-item-block #last-localization{
            position: absolute;
            z-index: 12;
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
            top: 1000px;
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
    /* ================================ADD PET==================================== */
    #add_pet{
        display: block;
        min-height: 106rem;
        padding-top: 10rem;
        font-size: 3rem;
    }
    #add_pet #form-pet legend{
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
    #add_pet #form-pet .input-block{
        color: #d6027e;
        height: 100%;
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
    #add_pet .submit{
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
        }
        #add_pet #form-pet legend{
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
        #add_pet #form-pet .input-block input:focus,
        #add_pet #form-pet .input-block input:valid,
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
            width: 50%;
            height: 70px;
            font-size: 30px;
            transition: all 400ms;
        }
        #form-pet .submit:hover{
            background: rgb(228, 4, 53);
            transform: scale(1.01);
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.425) ;
        }
    }
    /* ==============================MY PROFILE=================================== */
    
</style>