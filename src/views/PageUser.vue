<template>
    <div id="PageUser">
        <header>
            <TopBarMenu :slot1="myData" :slot2="myData" :slot3="myData" :slot4="myData"/>
        </header>
        <div id="container">
            <div id="home">
                <br><br><br><br><br><br><br>
                <h1>Nome do PET</h1>
                <p>idade: 10</p>
                <p>Proxima vacina: Anti-rabica</p>
                <p>ID: #56d4t6R$Rh654jy65</p>
                <p>Ultima localização: <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510555.88086461107!2d-48.60194212167592!3d-1.345755896513534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66936bb845ca05f4!2sPdg%20mirai%20offices%20-%20Rua%20Municipalidade%20-%20Reduto%2C%20Bel%C3%A9m%20-%20PA!5e0!3m2!1spt-BR!2sbr!4v1601405619400!5m2!1spt-BR!2sbr" width="250" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></p>
                <p>Responsavel: Augusto César Filho</p>
                <p>Endereço: Tv Villena, 842</p>
                <p>Complemento: Próx. Praça João Bosco</p>
            </div>
            <div id="my_profile">

            </div>
            <div id="my_data">

            </div>
            
        </div>
    </div>    
</template>

<script>
import TopBarMenu from '../components/TopBarMenu.vue'
export default {
    data(){
        return{
            myData : {
                value : 'Meus Dados',
                route: '#my_data'
            },
            myProfile : {
                value : 'Meu Perfil',
                route : 'my_profile'
            },
        }
    },
    components:{
        TopBarMenu,
    }
}
</script>

<style>

</style>