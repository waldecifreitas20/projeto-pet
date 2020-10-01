<template>
    <div id="page-user">
        <header>
            <TopBarMenu :slot2="myData" :slot4="scheduleVac" :slot3="missingPet" :slot1="logOut"/>
        </header>
        <div id="container">
            <div id="home">
               
                <ul class="list-data-pet">
                    <li class="list-item" name="name-pet" id="name-pet"><h1>{{dataPet.name}}</h1></li>
                    <li class="list-item" name="age-pet" id="age-pet">idade: {{dataPet.age}}</li>
                    <li class="list-item" name="specie-pet" id="specie-pet">Espécie: {{dataPet.specie}}</li>
                    <li class="list-item" name="next-vacine" id="next-vacine">Proxima vacina: {{dataPet.nextVac}}</li>
                    <li class="list-item" name="identifier" id="identifier">ID: {{dataPet.id}}</li>
                    <li class="list-item" name="responsible" id="responsible">Responsavel: {{dataPet.responsible}}</li>
                    <li class="list-item" name="address" id="address">Endereço: {{dataPet.address}}</li>
                    <li class="list-item" name="complement" id="complement">Complemento: {{dataPet.complement}}</li>
                    <li class="list-item" name="last-localization" id="last-localization">Ultima localização: <iframe :src="dataPet.lastLoc" width="250" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></li>
                </ul>
                            
                <div class="btn-block">
                    <Buttons value="Editar dados" id="btn-edit"/>
                    <Buttons value="Atualizar Localização" id="btn-update"/>
                </div>
                
            </div>
            <div id="my_profile">

            </div>
            <div id="pet_data">

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
            dataPet : {
                name : 'Bob',
                age : '10',
                specie : 'Cachorro',
                nextVac : 'Anti Rabica - 20/03/21',
                id : '$gW55#h0K4ç8.Xof80+a',
                responsible : 'Augusto César Filho',
                address : 'Rua Quintino Veiga, 852',
                complement : 'Altos',
                lastLoc : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510555.88086461107!2d-48.60194212167592!3d-1.345755896513534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66936bb845ca05f4!2sPdg%20mirai%20offices%20-%20Rua%20Municipalidade%20-%20Reduto%2C%20Bel%C3%A9m%20-%20PA!5e0!3m2!1spt-BR!2sbr!4v1601405619400!5m2!1spt-BR!2sbr"
            }
        }
    },
    components:{
        TopBarMenu,
        Buttons
    },
}
</script>

<style scoped>

    #page-user{
        width: 100%;
        background: rgb(231, 138, 250);
        height: 160rem;
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
        padding: 25rem 0;
        margin: 0;
        position: relative;
        top: -15rem;
        height: 100%;
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
    }
    #home .list-data-pet .list-item:first-child{
        margin-bottom: 4rem;
        border-bottom: .4rem solid;
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
    }
    #home .btn-block #btn-update{
        color: rgb(0, 0, 0);
        background: rgb(0, 183, 255);
    }
    #home .btn-block #btn-edit{
         color: rgb(255, 255, 255);
        background: rgb(255, 0, 128);
    }
    
</style>