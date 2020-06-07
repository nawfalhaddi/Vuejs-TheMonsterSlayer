new Vue({
    el:"#app",
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame:function(){
            this.gameIsRunning=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.turns=[];
        },attack:function(){
            
            var damage=this.calculateDammage(3,10);
            this.monsterHealth -=damage;
            this.turns.unshift({
                isPlayer:true,
                text:"Player Attacked Monster with damage "+damage+"%"
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack:function(){
            var damage=this.calculateDammage(10,20);
            this.monsterHealth -=damage;
            this.turns.unshift({
                isPlayer:true,
                text:"Player Attacked Monster with damage "+damage+"%"
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
            
        },
        heal:function(){
            if (this.playerHealth<=90) {
                this.playerHealth+=10;
            }else{
                this.playerHealth=100;
            }
            this.turns.unshift({
                isPlayer:true,
                text:"Player heals with 10%"
            });
            this.monsterAttack();
        },
        monsterAttack:function(){
            var damage=this.calculateDammage(3,11);
            this.playerHealth -=damage;
            this.turns.unshift({
                isPlayer:false,
                text:"Monster Attacked Player with damage "+damage+"%"
            });
            this.checkWin();
        },
        playerAtteck:function(min,max){
            
        },
        giveUp:function(){
            this.gameIsRunning=false;
        },
        calculateDammage:function(min,max){
            var dammage=Math.max((Math.floor(Math.random()*max)+1) , min);
            return dammage;
        },
        checkWin(){
            if(this.monsterHealth<=0){
                if(confirm('You Won ! you Do you want to play another game')){
                    this.startGame();
                }
                else{
                alert('you won!');
                this.gameIsRunning=false;
                }
                return true;
            }
            else if (this.playerHealth<=0){ 
                if(confirm('You lost ! Do you want to play another game')){
                    this.startGame();
                }
                else{
                alert('you lost');
                this.gameIsRunning=false;
                }
                return true;
            }
            return false;

        }
    }
});