import Phaser from 'phaser';

let isPressed =  false
const BOMBS_TO_HIT_BEFORE_GAME_OVER = 5

export default class Start extends Phaser.Scene { 

    scoring?: Phaser.Physics.Arcade.StaticGroup
    bg?: Phaser.Sound.BaseSound

    isPlaying: boolean = false


    constructor() {
        super('Start')
        document.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (e.key === 'Enter') isPressed = true
        })
    }

    preload() {
        this.load.atlas('items','sprite.png','sprite.json')
        this.load.audio('bg', ['bgsound.mp3'])
    }
    
    create() {
        this.bg = this.sound.add("bg", { loop: true });
        this.anims.create({key:'bomb', frames: this.anims.generateFrameNames('items', { prefix: 'bomb-', suffix:'.png', start:1, end:8 }), repeat:-1,duration: 1000})        
        this.anims.create({key:'coin-gold', frames: this.anims.generateFrameNames('items', { prefix: 'coin-gold-', suffix:'.png', start:1, end:8 }), repeat:-1,duration: 1000, delay: 50})
        this.anims.create({key:'clover', frames: this.anims.generateFrameNames('items', { prefix: 'clover-', suffix:'.png', start:1, end:8 }), repeat:-1,duration: 1000, delay: 250})
        this.anims.create({key:'watermelon', frames: this.anims.generateFrameNames('items', { prefix: 'watermelon-', suffix:'.png', start:1, end:8 }), repeat:-1,duration: 1000, delay: 150})

        this.scoring = this.physics.add.staticGroup();

        this.physics.add.sprite(100,100,'items', `watermelon-1.png`).setScale(0.25)
        this.physics.add.sprite(100,200,'items', `clover-1.png`).setScale(0.25)
        this.physics.add.sprite(100,300,'items', `coin-gold-1.png`).setScale(0.25)
        this.physics.add.sprite(100,400,'items', `bomb-1.png`).setScale(0.25)

        this.add.text(150,15,'SCORING', {fontSize: '32px'})
        this.add.text(200,100,'500 points  -250/miss', {fontSize: '22px'})
        this.add.text(200,200,'250 points  -100/miss', {fontSize: '22px'})
        this.add.text(200,300,'50 points   ', {fontSize: '22px'})
        this.add.text(200,400,'Hit '+BOMBS_TO_HIT_BEFORE_GAME_OVER+' bombs and game over!', {fontSize: '22px'})

        this.add.text(0,500, 'Press SPACE when the bubble crosses the line',{fontSize: '22px'})
        this.add.text(50,550, 'Press ENTER to begin.',{fontSize: '38px'})
    }

    update() {
        if (!this.isPlaying) {
            this.isPlaying = true
            this.bg?.play()
        }
        if (!isPressed) return
        this.scene.stop('Start')
        this.scene.start('Bubbles')
        isPressed= false
    }
}