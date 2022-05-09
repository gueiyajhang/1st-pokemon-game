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
 - 

6. foreground layer setup

7. avatar movement animation

###### step II - battle field scene
8. build battle field scene
9. transit from island to battle field
10. add battle spprites
11. add attack bar
12. add health bar
13. attacks effect
14. queue dialogue
15. randomized attacks
16. display attack type
17. battle end
18. transit back to island

###### step III = sound effect
19. music and sound effect
