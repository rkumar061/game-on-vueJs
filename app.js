function getRandomNumber(min, max){
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;

}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            logs:[],
            currentRound: 0,
            
        }
    },
    watch: {
        playerHealth: function(newValue, oldValue){
            if(newValue <= 0){
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.gameOver('monster');
                this.logs.push(`Player health: ${oldValue}-${newValue-oldValue}=${newValue}`);
                
            } else if(newValue >= 100){
                this.playerHealth = 100;
            } else{
                this.logs.push(`Player health: ${oldValue}-${newValue-oldValue}=${newValue}`);
            }
        },
        monsterHealth: function(newValue, oldValue){
            if(newValue <= 0){
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.logs.push(`Monster health: ${oldValue}-${newValue-oldValue}=${newValue}`);
                this.gameOver('player');
            } else if(newValue>= 100){
                this.monsterHealth = 100;
            } else{
                this.logs.push(`Monster health: ${oldValue}-${newValue-oldValue}=${newValue}`);
            }
        }
    },
    computed: {
     
        playerBarColor() {
            return {
                'width': this.playerHealth + '%'
            }
        },
        monsterBarColor() {
            return {
                'width': this.monsterHealth + '%'
            }
        },
        canUseSpecialAttack() {
            console.log('canUseSpecialAttack');
            return this.currentRound % 3 !== 0;
        }
            
    
    },
    methods: {
        attackMonster() {
                atackValue = getRandomNumber(3, 10);
                this.monsterHealth -= atackValue;
                this.attackPlayer();
        },
        attackPlayer() {
                atackValue = getRandomNumber(3, 10);
                this.playerHealth -= atackValue;
                this.currentRound++;
        },
        healPlayer() {
            atackValue = getRandomNumber(3, 10);
            this.playerHealth += atackValue;
            this.healMonster();
        },
        healMonster() {
            atackValue = getRandomNumber(3, 10);
            this.monsterHealth += atackValue;
        },
        specialAttackMonster() {
            atackValue = getRandomNumber(6, 20);
            this.monsterHealth -= atackValue;
            this.currentRound++;
            
        },
        gameOver(winner) {
            if(winner === 'player'){
                this.logs.push('You won!');
                alert('You won!');
            } else {
                this.logs.push('You lost!');
                alert('You lost!');
            }
        },
        surrender() {
            this.logs.push('You surrendered!');
            this.playerHealth = 100;
            this.monsterHealth = 100;
            alert('You surrendered!');
        }
    }
});

app.mount('#game');