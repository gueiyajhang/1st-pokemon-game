# 1st-pokemon-game

#### Video Demo:  <https://youtu.be/tvwTLzRrv3A>
#### Description:
![pokemon game img](./img/pokemongame.png)
<img src="./img/instruction.png" alt="instruction img" width="400"/>

- Main task:
Pokemon style RPG game include battle field, audio, pokemon, avatar

prerequisite: map, battle filed background img, main avatar img set (includes 4 directions), 2 pokemon img set, attacks animate img set, audio files

progrgram language: javascript, CSS, html

#### TODO
###### step I - main island map
1. build a World map via Tiled
  - use png img dataset drawing the island which your main avatar will travel
  ![island img](./img/Pellettown.png)
2. reference the map at html
  - build canvas element to create an rectangle area where the game will display under budy section at index.html and rectangle information and method are writen under index.js
  note: use onload methods so the map loading will not too slow to show
  
3. import the avatar
  - use onload methods insert avatar before map
  - move the avatar into the center of the map

4. move avatar through map
 - addEventListener assign specific keydown of each move: WASD
 - add animation loop, cropping image at each move
 - class Sprite add constructor method inside to reference propertity of the avatar: position, velocity, image
 - add background.draw()
 - const keys reference pressed on WASD is False at the beginning, while is True at pressed down (keyup should be False)

5. boundary restrict avatar moves at the island
 - reference the boundaries by x, y and with value of 1025
 - draw boundaries with same offset as to background
 - set movables for background and boundaries 
 - define if avatar X position + avatar width >= biundaries then colliding
 - under class, use onload finction define avatar image equals to this.image then onload this.width = this.image / this.frames.max
 - same as the other side, add && in if condition: X position <= biundaries + avatar width then colliding
 - add && statement to y direction
 - change if statement to rectangularCollision function and defeine rectangular1 to avatar, rectangular2 to collision map
 - at movables add ... before boundaries means all the items under boundaries plays with movables
 - under function animate, looping boundary in boundaries.forEach so that avatar collides when toching all the boundaries
 - set if loop to detect whether the avatar is overlaping with boundaries
 - copy loop to all directions 

6. foreground layer setup
 - export forground image as img
 - copy same reference const background to forground img
 - reference foreground img 
 - add foreground img object into movables const

7. avatar movement animation
 - place sprite and boundary class into class.js to make the code clean
 - making avatar move over time, cropping avatar img into 4: assign frames value {...frames, val:0}
 - use if looping val 0 -> 1 -> 2 -> 3 -> 0
```
    if (this.frame.val < this.frame.max - 1) this.frame.val++
      else this.frame.val = 0
```
 - slow down animation: add elapsed {...frames, val:0, elapsed: 0}
```
   if (this.frame.max > 1) {
    this.frame.elapsed++
   }
```
  - add if condition elapsed % 10 === 0 then move the cropping image
  - set defailt moving = False & once key down is True
  - if (moving) {} changes to  if (!moving) return to make the code clean
  - under key pressed condition, set moving = True for all direction
  - add sprites under class Sprite and assign sprites
  - under const player assign 4 directions of img and reference each img
  - swape avatar direction by key down: under key down condition assign player.image = player.sprites.up (or other direction)
  
###### step II - battle field scene
8. build battle field scene
 - import battleZones.js
 - copy const collisionsMap and modify into const battleZonesMap 
 - copy const boundary for each symbols as 1025 is set as battlezones
 - under animate function, draw battlezones so that the battlezone area shows
 - set battlezones into movables so that the battlezones will not move with avatar
 - trigger battles while moving in the battlezone area: same as collision with touching at boundaries
 - copy if colliding condition when pressing key down, detect player and battlezone
 - add
```
if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
  for (let i = 0; i < battleZones.length; i++) {
  const battleZone = battleZones[i]
  if (
    rectanglualCollision({
      rectangle1: player,
      rectangle2: battleZone
    })
  ) {
    break
    }
  }
}
```
 - add if touching area interception is greater than 1/4 of the avatar area, the avatar can activate a battle
```
const overlappingArea = 
  (Math.min(player.position.x + player.width, battleZone.posiiton.x + battleZone.width) - Math.max(player.position.x,   battleZone.position.x)) * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y))

overlappingArea > (player.width * player.height) / 2
```
 - add random let battle happens by chance
```
Math.random() < 0.1
```
9. transit from island to battle field
 - add before if pressed down condition: if (battle.initiated) return and in the if condition battle.initiated is true while battle triggers
 - set const battle
```
set const battle = {
  initiated: false
}
```
 - change the moving sonst before if pressed down condition so that avatar will not moving after battle triggers
 - create a div under html for a large black area for the transit into battle field
 - import gsap library to use animation for new scene
```
// after battle initiated, start animation
gsap.to('#overlappingDiv', {
  opacity: 1,
  repeat: 3,
  yoyo: true,
  duration: 0.4,
  onComplete() {
    gsap.to('#overlappinfDiv', {
      opacity: 1,
      duration: 0.4
    })
    // activte a new animation
    animateBattle()
    // deactivate current animation
  }
})
```
 - set animationId to count each frame over time
 - replace cancelAnimationFrame(animationId) right after activate battle
 - create new function 
 ```
 animateBattle() {
  window.requestAnimationFrame(animateBattle)
 }
 ```
  - reference battleBackgroundImage.png
  - draw battleBackgroundImage
  - replace animateBattle function right after onComplete gsap animation
```
// after battle initiated, start animation
battle.imitiated = true
gsap.to('#overlappingDiv', {
  opacity: 1,
  repeat: 3,
  yoyo: true,
  duration: 0.4,
  onComplete() {
    gsap.to('#overlappinfDiv', {
      opacity: 1,
      duration: 0.4,
      onComplete() {
        animateBattle()
        gsap.to('#overlappingDiv', {
          opacity: 1,
          duration: 0.4
        })
      }
    })
  }
})
```
10. add battle spprites
 - under index.js create new 2 sprite and reference them with position, frames
 - under function animateBattle draw 2 sprites
 - change moving to animate and set default = false, meaning if animate = false then moving
 - same code add another sprite
11. add attack bar
 - under html div create a rectangle with bottom position: 0
 - add div set attack name as botton
 - add div as attack type
 - add h1 with margin: 0
 - adjust position and add border by adding style property
 - seperate section of attack buttons by adding property under html div 
 ```
 style="display: grid-template-columns: repeat(2, 1fr);"
 ```
  - under style hover attack botton and change background color: #aaa ~ #000 (color range: white --> dark)
  - google fonts: fonts.google.com --> select press start --> copy the code and place it at body before style tag
  - add property of font to all the tags: * {font-family: 'Press Srart 2P'}
12. add health bar
  - draw 2 rectangle to each sprite under html by adding new div
  - create new div to add a new rectangle under rectangle div to create a health bar in the rectangle
  - create a same rectangle on top of the small rectangle and set color to green to show the health
  - set green health bar absolute position and top = 0, big rectangle relative position
  - add left:0, right:0 for green health bar, remove margin-top property let the green bar on top of the health bar
  - copy same code for another sprite
13. attacks effect
##### tackle effect
  - change attack name under html
  - add window.eventListener under animateBattle() on click on pecific botton
```
document.querySelectorAll('botton').forEach(button => {
  button.addEventListener('click', () => {
    //attack data add here
  })
})
```
  - add argument of the sprite:
```
sprite1.attack({
  attack: {
    name: 'Tackle',
    damage: 10,
    type: 'Normal'
    }
  recipient: sprite2
```
  - under classes.js create a attack method with attack and recipient argument
  - add animate when recipient recive attack, use gsap.to(this.position, {x: this.position.x - 20})
  - create a timeline oject makes attack and recipient moves abck and forth then back to original position
```
attack({ attack, recipient }) {
  const tl = gsap.timeline()
  this.health -= attack.damage
  tl.to(this.position, {
  this.position.x - 20})
  .to(this.position, {
    x:this.position.x + 40, 
    duration: 0.1, 
    onComplete() => {
      // Enemy actually gets hit
      gsap.to('enemyHealthBar', {
        width: this.health - attack.damage + '%'
      })
      gsap.to(recipient.position, {
        x; recipient.position.x + 10, 
        yoyo: true, 
        repeat: 5, 
        duration: 0.08
      })
      gsap.to(recipient, {
        opacity: 0,
        repeat: 5,
        yoyo: true,
        duration: 0.08
      })
   }
}).to(this.position, {this.position.x }))
}
```
  - makes recipient fades out at the end:
    under classes.js at sprite property add opacity property as 1 by default, then after draw() add c.save() & c.globalAlpha = this.opacity
  - decrease green health bar after attack:
    under div section add id="enemyHealthBar" , this.health = 100
  - create let MovementDistance = 20
  - if (this.isEnemy) movmentDistance = -20
  - add isEnemy property under class Sprite and replace 20 in this.position to movementDistance
  - add isEnemy property under enemy sprite property
  - at div add playerHealthBar id and animate playerHealthBar as well
#### fireball effect
  - change botton name to Fireball
  - separate attacks to add different attack animate effect: under animateBattle() add button.addEventListener
```
animateBattle()
document.querySelectorAll('bitton').forEach((button) => {
  button.addEventListen('click', (e) => {
      const selectedAttack = attacks(e.currentTarget.innerHTML)
    }
  })
})
```
  - create new file: attacks.js, place const attacks data into and at index.html references attacks.js
```
const attacks = {
  Tackle: {
    name: 'Tackle',
    damage: 10,
    type: 'Normal'
  },
  Fireball: {
    name: 'Fireball',
    damage: 20,
    type: 'Fire'
  } 
}
```
  - at classes.js under attack argument add switch method
```
switch(attack.name) {
  case 'Fireball':
    const fireball = new Sprite({
    fireballImage.src = './img/Fireball.png'
      position: {
        x: this.position.x,
        y: this.position.y,
      }
    })
  // paste all the animation here
  break
  case 'Tackle':
  // paste all the animation here
  break
}
```
  - add const renderSprites =[] before animateBattle finction then add renderSprite into argument
  - under attack add argument renderSprite then add under switch add renderSprite.push(Fireball)
  - add animation of Fireball:
```
  image: fireballImage,
  Frames: {
  max: 4,
  hold: 10},
  animate: true
```
  - make fireball move:
 ```
 gsap.to(fireball.position, {
  x: recipient.position.x,
  y: recipient.position.y,
  onCopmlete: () => {
    // copy and add loop where recipient gets hit 
   
 }
 })
 ```
   - render Sprites
   - add rotation of fireball
```
  - make fireball before enemy
```
renderSprites.splice(1, 0, fireball)
```

c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
c.rotate(this.rotation)
```
  - under attack
```
let attack = 1
if (this.isEnemy) rotation = -1
```
14. queue dialogue
  - create a div section under the container of attacks to build a new container for dialog
  - add style = "position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: white;" to make dialog overlap with attack botton
  - under attack add document set default block 
```
document.querySelector('#dialogueBox').style.display = 'block'
```
  - class Sprite add name so that im the dialogue name can be referenced
```
document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name
```
  - at index.js find const Sprite1 & Sprite2 add name argument so that this.name can be defined
  - add queue to set random attack and close dialogue when queue is empty
```
const queue = []
botton.addEventLinstener('click', (e) => {

queue.push(() => {
  Sprite2.attack({
    attack: attacks.Sptites2,
    recipient: Sprite1,
    renderedSprites
  })
})
})
```
  - call queue function & when queue is empty close the dialog when quit
```
document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})
```
15. populating attacks
  - add id='attacksBox' and delete attack bottons, then at battleScene.js add 
```
const botton = document.createElement('botton')
botton.innerHTML'Fireball'
doocument.querySelector('#attacksBox').append(botton)
```
  - create monsters.js put Sprites and reference into
  - reference monsters.js after attacks.js at index.html
  - add class Monster extend Sprite{} include the whole attacks method
```
class Monster extend Sprite{
 constructor({
  position,
  velocity,
  image,
  frames: { max:1, hold:10 },
  sprites,
  animate: false,
  rotation: 0,
  isEnemy: false,
  name,
  attacks
 }) {
  super({
    position,
    velocity,
    image,
    frames,
    sprites,
    animate,
    rotation
  })
  this.health = 100
  this.isEnemy = isEnemy
  this.name = name
  this.attacks = attacks
 }
}
```
  - at classes.js change class Sprites to  class Monster and adding attacks property 
  - at battleScene.js populating attacks by adding:
```
Sprite1.attacks.forEach(attack => {
  // paste button function
  const button = document.createElement('button')
  button.innetHTML = attack.name
  document.querySelector('#attacksBox').append(button)
})
```
16. randomized attacks from enemy
  - at battleScene.js before queue method add Sprites2.attacks[] array and use Math.floor to round decimal down sprite2.attacks.length as integer
```
const randomAttack = sprites2.attacks[Math.floor(Math.random() * sprites2.attacks.length)]

queue.push(() => {
  draggle.attack({
    attack: randomAttack,
    recipient: sprite1,
    renderedSprites
  })
})
```
  - at monsters.js at Sprites2 attacks add attacks.Fireball
17. display attack type
  - at battleScene under queue method looping over button function
```
button.addEventListener('mouseenter', (e) => {
  const  selectedAttack = attacks[e.currentTarget.innerHTML]
})
```
  - at index.html in Attack Type add id="attackType"
  - at battleScene add document assign attacktype from attacks.type
```
button.addEventListener('mouseenter', (e) => {
  const  selectedAttack = attacks[e.currentTarget.innerHTML]
  document.querySelector('#attackType').innerHTML = selectedAttack.type
})
```
  - at attacks.js add font property on attack type by adding color: 'black' or 'red'
```
button.addEventListener('mouseenter', (e) => {
  const  selectedAttack = attacks[e.currentTarget.innerHTML]
  document.querySelector('#attackType').innerHTML = selectedAttack.type
  document.querySelector('#attackType').style.color = selectedAttack.color
})
```
18. battle end
  - at battleScene.js add if statement
```
if (sprites2.health <= 0) {
  queue.push(() => {
  sprite.faint()
  })
  return
}
```
  - add faint() method to classes.js
```
faint() {
  document.quertSelector('#dialogueBox').innerHTML = 
  this.name + ' fainted!'
  gsap.to(this.position, {
    y: this,position.y + 20
  })
  gsap.to(this.position, {
    opacity: 0
  })
}
```
  - change this.health to recipient.health to reference recipient health once reference health equals 0 then recipient is fainted
  - at battleScene.js under queue.push add if statement after sprite2.attack
```
queue.push(() => {
  sprtie2.attack({
    attack: randomAttack,
    recipient: sprite1,
    renderedSprites
  })
  if (sprite1.health <= 0) {
    queue.push(() => {
      sprite1.faint()
    })
  }
})
```
19. transit back to island
  - at battleScene.js under if health<=0 statement beneath faint()
 ```
 if (sprite.health <= 0 {
  queue.push(() => {
    sprite2.faint()
  })
  queue.push(() => {
    // fade back to black
    gsap.to('#overlappingDiv', {
      opacity: 1
    })
  })
 })
 ```
  - at index.html in #overlappinDiv add style property z-index: 10
  - cancel battleScene then go back to map

```
// before animantionBattle function
let battleAnimationId

function animationBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
}
```
```
 if (sprite.health <= 0 {
  queue.push(() => {
    sprite2.faint()
  })
  queue.push(() => {
    // fade back to black
    gsap.to('#overlappingDiv', {
      opacity: 1,
      onComplete: () => {
        cancelAnimationFrame(battleAnimationId)
        animate()
        document.querySelector('#userInterface').style.display = none
        
        gsap.to('#overlappingDiv', {
          opacity: 0
        })
      }
    })
  })
 })
```
  - at index.html add new Div with id="userinterface" then include all the rectangles at the battle scene
  - re-initialized battle scene, above animateBattle function add function initBattle()
```
// change const into let
let sprite2
let sprite1 
let renderedSprites
let queue

function initBattle() {
  sprite2 = new Monster(monsters.sprtie2)
  sprite1 =new Monster(monsters.sprtie1)
  renderedSprites = [sprite2, sprite1]
  queue = []
  // copy and paste the whole attacks
}
```
  - before animateBattle() add initBattle()
  - at battleScene.js under initBattle function add
```
document.querySelector('#userInterface').style.display = 'block'
document.querySelector('#dialogueBox').style.display = 'none'
document.querySelector('#enemyHealthBar').style.width = '100%'
document.querySelector('#playerHealthBar').style.width = '100%'
document.querySelector('#attacksBos').replaceChildren()
```
  - at classes.js under class Sprite add this.image.src = this.image.src
```
class Sprite {
  constructor({
  
  }) {
  this.position = position
  this.image = new Image()
  this.frames = { ...frames, val:0, elapsed: 0}
  this.image.onload = () => {
    this.width = this.image.width / this.frames.max
    this.height = this.image.height
  }
  this.image.src = image.src
  this.animate = animate
  this.sprites = sprites
  this.opacity = 1
  this.rotation = rotation
}
```
  - at monsters.js set const monsters image as an object
```
const monsters = {
  Sprite1: {
    image: {
      src: './img/sprite1.png'  
    }
  },
  Sprite2: {
    image: {
      src: './img/sprite2.png'
    }
  }
}
```
  - at battleScene.js copy queue.push right after faint()
  - add battle.initiated = false under gasp.to('#overlappingDiv')
###### step III = sound effect
20. music and sound effect
  - import audio file under audio forder and at index.html reference audio.js at first
  - reference CDN of Holwe js CDN 2.2.3
  - at audio.js reference audio
  - at the end of index.js  let clicked = false then add eventListener play music when not click and clicked = true
  - after cancel animationframe stop playing audio by audio.Map.stop() then audio.initBattle.play() & audio.battle.play()
  - assign each audio under each pecific action
