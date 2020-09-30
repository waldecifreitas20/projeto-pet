<template>
    <div id="page-user">
        <header>
            <TopBarMenu :slot2="myData" :slot4="scheduleVac" :slot3="missingPet" :slot1="logOut"/>
        </header>
        <div id="container">
            <div id="home">
                <br><br><br><br><br><br><br>
                <h1>Bob</h1>
                <p>idade: 10</p>
                <p>Espécie: Cachorro</p>
                <p>Proxima vacina: Anti-rabica 20/01/21</p>
                <p>ID: #56d4t6R$Rh654jy65</p>
                <p>Responsavel: Augusto César Filho</p>
                <p>Endereço: Tv Villena, 842</p>
                <p>Complemento: Próx. Praça João Bosco</p>
                <p>Ultima localização: <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510555.88086461107!2d-48.60194212167592!3d-1.345755896513534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66936bb845ca05f4!2sPdg%20mirai%20offices%20-%20Rua%20Municipalidade%20-%20Reduto%2C%20Bel%C3%A9m%20-%20PA!5e0!3m2!1spt-BR!2sbr!4v1601405619400!5m2!1spt-BR!2sbr" width="250" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></p>
            </div>
            <div id="my_data">

            </div>
            <div id="pet_data">

            </div>
            
        </div>
    </div>    
</template>

<script>
import TopBarMenu from '../components/TopBarMenu.vue'
export default {
    data(){
        return{
            logOut : {
                value : 'Sair',
                route: '/'
            },
            myData : {
                value : 'Meus Dados',
                route : '#my_data'
            },
            missingPet : {
                value : 'Seu PET sumiu?',
                route : '#missing_pet'
            },
            scheduleVac : {
                value : 'Vacinas',
                route : '#vacination'
            }
        }
    },
    components:{
        TopBarMenu,
    },
}
</script>

<style>
    #page-user{
        width: 100%;
        background: rgb(231, 138, 250);
        height: 126rem;
    }
    #container{
        margin: auto;
        width: 90%;
        background: rgb(255, 255, 255);
        padding: 0 3rem;
        height: 100%;
        box-shadow: 0rem 0rem 2rem rgba(0, 0, 0, 0.37);
    }
    /* ===========================HOME=========================== */
    #home{
        font-size: 3rem;
        padding: 0;
        margin: 0;
        position: relative;
        top: -15rem;
    }
    #home iframe{
        width: 100%;
        height: 50rem;
        margin-top: 2rem;
        border-radius: 1rem;
    }
    #home h1,
    #home p{
        font-weight: 500;
        color: rgb(165, 55, 192);
    }
    #home h1{
        margin-bottom: 2rem;
    }
    #home p{
        margin-top: 1.5rem;
    }
    
</style>