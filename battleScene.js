const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({position: {
  x: 0,
  y: 0
  },
  image: battleBackgroundImage
} )

let charmander 
let zombie 
let renderedSprites
let battleAnimationId
let queue

function initBattle() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()
  charmander = new Monster(monsters.Charmander)
  zombie = new Monster(monsters.Zombie)
  renderedSprites = [charmander, zombie]
  queue = []

  zombie.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)
})
  // our event listerners for our buttons (attack)
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      zombie.attack({
        attack: selectedAttack,
        recipient: charmander,
        renderedSprites
      })

      if (charmander.health <= 0) {
        queue.push(() => {
          charmander.faint()
        })

        queue.push(() => {
          // fade back to black
            gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('#userInterface').style.display = 'none'
              
              gsap.to('#overlappingDiv', {
                opacity: 0
              })
              battle.initiated = false
              audio.Map.play()
              audio.victory.stop()
          }
        })

         })
      }
    // charmander or enemy attacks right here
    const randomAttack = 
    charmander.attacks[Math.floor(Math.random() * charmander.attacks.length)]

    queue.push(() =>{
      charmander.attack({
        attack: randomAttack,
        recipient: zombie,
        renderedSprites
      })

      if (zombie.health <= 0) {
      queue.push(() => {
        zombie.faint()
      })   
    

     queue.push(() => {
          // fade back to black
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('#userInterface').style.display = 'none'

              gsap.to('#overlappingDiv', {
                opacity: 0
              })


              battle.initiated = false
              audio.Map.play()
              audio.victory.stop()
            }
          })
        }) 
      }
    })
  }) 

  button.addEventListener('mouseenter', (e)=>{
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    document.querySelector('#attackType').innerHTML = selectedAttack.type
    document.querySelector('#attackType').style.color = selectedAttack.color
  })   
})

}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
  
  console.log(battleAnimationId)

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animate()
//initBattle()
// animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})