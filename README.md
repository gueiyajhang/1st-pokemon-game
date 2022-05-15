# 1st-pokemon-game

#### Video Demo:  <https://youtu.be/tvwTLzRrv3A>
#### Description:
![pokemon game img](./img/pokemongame.png)
<img src="./img/instruction.png" alt="instruction img" width="400"/>

#### Main task:
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
# after battle initiated, start animation
gsap.to('#overlappingDiv', {
  opacity: 1,
  repeat: 3,
  yoyo: true,
  duration: 0.4
})
```
10. add battle spprites

11. add attack bar

12. add health bar

13. attacks effect

14. queue dialogue

15. randomized attacks

16. display attack type

17 battle end

18 transit back to island

###### step III = sound effect
19. music and sound effect
