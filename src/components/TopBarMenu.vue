<template>
    <div class="top_bar_menu">
        <label for="check"><img id="asset_menu" src="../assets/menu_hambuguer.png" alt="" srcset=""></label>
        <input type="checkbox" id="check">
        <nav class="menu-block">
            <router-link to="/"><img src="../assets/logo_pet.png" alt="logomarca" id="logo" @click="check(0)"></router-link>
           
                <ul class="menu" id="menu">
                    <li class="menu-item"><router-link :to="slot1.route"><div>{{slot1.value}}</div></router-link></li>
                    <li class="menu-item"><a :href="slot2.route" @click="changePager(slot2.route)"><div>{{slot2.value}}</div></a></li>
                    <li class="menu-item"><a :href="slot3.route" @click="changePager(slot3.route)"><div>{{slot3.value}}</div></a></li>
                    <li class="menu-item"><a :href="slot4.route" @click="changePager(slot4.route)"><div>{{slot4.value}}</div></a></li>
                </ul>                         
        </nav>    
    </div>
</template>

<script>
export default {
    props:{
        slot1 : Object,
        slot2 : Object,
        slot3 : Object,
        slot4 : Object
    },
    methods:{
        changePager(routy){
            let menu = document.querySelector('#check')
            menu.checked = false
            try {
                this.$emit('changepa',routy)
            } catch (error) {
                console.error(error);
            } 
        }
    }
}
</script>

<style>
    :root{
        --color-primary : #9b09d4;
        --color-primary-opacity : hsla(283, 92%, 43%, 0.801);
        --color-secondary : #45db31;
        --color-light : #ba25ff;
        --color-text-default : #ffffff;        
    }
    *{
        list-style: none;
        text-decoration: none;
    }
    .top_bar_menu{
        height: 9%;
    }
    #asset_menu{
        z-index: 10;
        padding: .5rem;
        position: fixed;
        top: 2rem;
        left: 2rem;
    }
    #asset_menu:hover{
        z-index: 10;
        border: 1px solid #a002e9;
        
    }
    #check{
        display: none;
    }
    .menu-block{
        z-index: 9;
        width: 100%;
        height: 8rem;
        background-color: #9b09d4;
        position: fixed;
        top: 0;
        left: 0;
        text-align: right;
        margin: 0;
        box-shadow: 5px 0px 12px rgba(0, 0, 0, 0.452);
        
    }
    #logo{
        height: 100%;
        margin: auto;
    }
    
    .menu{
        z-index: 5;
        position: absolute;
        margin: 0;
        padding-top: 8rem;
        background-color: #ba25ffe7;
        margin-top: 0px ;
        transition: all 200ms;
        top: 0;
        left: -54rem;
        width: 75%;
        height: 200rem; 
        
        transition: all 400ms ease-out;
    }
    
    
    .menu .menu-item:hover{
        background-color: #d815ae;
    }
    #favicon_fb{
        width: 2rem;
    }
    
    .menu .menu-item,
    .menu .menu-item-un {
        display: list-item;
        color: white;        
        align-items: center;
        margin: auto;
        border-bottom: 1px solid white ;
        font-size: 3.5rem;
        font-weight: 500;
        margin-top: 5rem;
        height: 9rem;
        padding: 4rem 2rem 9rem 2rem;

        transition: all .8s;
        transition-timing-function: ease-in-out;
        
    }    
    .menu-item div{
        text-align: left;
        color: rgb(255, 255, 255);
    }
   
    #check:checked ~ .menu-block ul{
        transform: translateX(54rem);
        box-shadow: 300px 0px 50px rgba(0, 0, 0, 0.212);
    }
    #check:checked ~ .menu-block .menu-item {
        margin-top: 0rem;
    }
    
    @media (min-width: 800px) {
        *{
            padding: 0;
            margin: 0;
            box-sizing: 0;
        }
        input#check, img#asset_menu{
            display: none;
        }
        .menu-block img{
            position:absolute;
            top: 0;
        }
        .menu-block{
            z-index: 10;
            width: 100%;
            height: 70px;
            background-color: #9b09d4;
            position: fixed;
            margin: 0;
            text-align: initial;            
        }
        .menu{
            z-index: 5;
            position: absolute;
            margin: 0;
            padding-top: 0;
            background-color: #ba25ff00;
            margin-top: 0px ;
            top: 0;
            right: 0%;
            left: auto;
            width: 70%;
            height: 70px; 
            box-shadow: none;
            display: flex;
            padding: 0;
            
        
        }
        .menu li.menu-item {
            /* position: absolute; */
            display: inline-block;        
            align-content: center;
            margin: 0;
            border-bottom: none;
            font-size: 17px;
            font-weight: 500;
            margin-top: 0;
            height: 70px;
            width: 200px;
            padding: 0;
            
            transition: all 300ms;
            transition-timing-function: ease-in-out;
            
        }
        
        .menu-item div{
            text-align: left;
            color: rgb(255, 255, 255);
            text-align: center;
            margin-top: 25px;
        }
         .menu .menu-item-un {
            /* position: absolute; */
            display: inline-block;        
            align-items: center;
            margin: 0;
            border-bottom: none;
            font-size: 17px;
            font-weight: 500;
            margin-top: 0;
            height: 70px;
            width: 200px;
            padding: 0;
             background-color: #d815ae;
            transition: all 300ms;
            transition-timing-function: ease-in-out;
            
        }
        
        .menu-item-un div{
            text-align: left;
            color: rgb(255, 255, 255);
            text-align: center;
            margin-top: 25px;
        }
}
</style>