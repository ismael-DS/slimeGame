const MOVE_SPEED = 120
const JUMP_FORCE = 300
const ENEMY_SPEED = 20
const FALL_DEATH = 600

layers(['obj', 'ui'], 'obj')

//configurations of the map game and the global settings of maps
const map1 = [
  '                                                                  ',
  '                                                                  ',
  '                                                                  ',
  '                                                                  ',
  '        --                                                        ',
  '              @                                        --         ',
  '             --          $                                        ',
  '            --                                     --             ',
  '                               x                                  ',
  '----------------    ---------------------------                   ',
]

const LevelCfg = {
  width: 20,
  height: 20,
  '-' : [sprite('ground'), scale(0.5), solid()],
  'x' : [sprite('enemy'), 'danger', scale(0.5), solid(), body()],
  '$' : [sprite('LitSlime'), 'LitSlime'],
  '@' : [sprite('portal'), 'portal', scale(0.8)]

}

addLevel(map1, LevelCfg)

//Score
const scoreLabel = add([
text('0'),
pos(3,6),
layer('ui'),
{
  value: '0'
}
])

add([text('level ' + ' 0'), pos(40,6)])

//principal player
const player = add([sprite('player'),
pos(30,0),
body()
])

//movimentation
keyDown('a',  () => {
  player.move(-MOVE_SPEED,0),
  player.frame = 1
})

keyDown('d', () => {
  player.move(MOVE_SPEED,0),
  player.frame = 0
})

keyPress('w', () => {
  if(player.grounded())
  player.jump(JUMP_FORCE)
  player.frame = 2
})

//seting cam
player.action(() => {
  camPos(player.pos)
  if (player.pos.y >= FALL_DEATH) {
    go('GameOver', { score: scoreLabel.value })
  }
})

//player get coin of game
player.collides('LitSlime', (s) => {
  scoreLabel.value++
  scoreLabel.text = scoreLabel.value
  destroy(s)
})

//enemys
action('danger', (d) => {
  d.move(ENEMY_SPEED, 0)
})

//Game Over
player.collides('danger', (d) => {
  go('GameOver', { score: scoreLabel.value}) 
})

//Next Level
