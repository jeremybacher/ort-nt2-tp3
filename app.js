new Vue({
    el: '#app',
    data: {
        healthPlayer: 100,
        healthMonster: 100,
        gameRunning: false,
        turns: [], //log events
        rangeAttack: [3, 10],
        rangeEspecialAttack: [10, 20],
        rangeMonsterAttack: [5, 12],
    },

    methods: {
        getHealth(health) {
            return `${health}%`
        },
        startGame: function () {
            this.healthPlayer = 100
            this.healthMonster = 100
            this.gameRunning = true
            this.turns = []
        },
        attack: function () {
            const damage = this.calculateWounds(this.rangeAttack)
            this.healthMonster -= damage
            this.registerEvent(true, 'The player attacks the monster for' + damage)
            if (this.verifyWinner()) {
                return;
            }
            this.monsterAttack()
        },
        specialAttack: function () {
            const damage = this.calculateWounds(this.rangeEspecialAttack)
            this.healthMonster -= damage
            this.registerEvent(true, 'The player super attacks the monster for' + damage)
            if (this.verifyWinner()) {
                return;
            }
            this.monsterAttack()
        },
        cure: function () {
            if (this.healthPlayer <= 90) {
                this.healthPlayer += 10
            } else {
                this.healthPlayer = 100
            }
            this.registerEvent(true, 'The player recovers to' + this.healthPlayer)
            this.monsterAttack()
        },
        registerEvent(esJugador, desc) {
            this.turns.unshift({
                isPlayer: esJugador,
                text: desc
            })
        },
        finishGame: function () {
            if(confirm('Sure want to give up?')){
                this.gameRunning = false
            }            
        },
        monsterAttack: function () {
            const damage = this.calculateWounds(this.rangeMonsterAttack)
            this.healthPlayer -= damage
            this.registerEvent(false, 'The monster hurts the player by ' + damage)
            this.verifyWinner()
        },
        calculateWounds: function (range) {
            return Math.max(Math.floor(Math.random() * range[1]) + 1, range[0]);
        },
        verifyWinner: function () {
            if (this.healthMonster <= 0) {
                if(confirm('Won! Play again?')){
                    this.startGame()
                } else {
                    this.gameRunning = false
                }
                return true
            } else if (this.healthPlayer <= 0) {
                if(confirm('You lost! Play again?')){
                    this.startGame()
                } else {
                    this.gameRunning = false
                }
                return true
            }
            return false
        },
        cssEvento(turn) {
            return {
                'player-turn': turn.isPlayer,
                'monster-turn': !turn.isPlayer
            }
        }
    }
});