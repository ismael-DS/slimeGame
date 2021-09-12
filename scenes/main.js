
const MOVE_SPEED = 120
const JUMP_FORCE = 300

layers(['obj', 'ui'], 'obj')

const map = [
  '                                                                  ',
  '                                                                  ',
  '                                                                  ',
  '                                                                  ',
  '        --                                                        ',
  '                                                       --         ',
  '             --          $                                        ',
  '            --                                     --             ',
  '                               @                                  ',
  '----------------    ---------------------------                   ',
]

const LevelCfg = {
  width: 20,
  height: 20,
  '-' : [sprite('ground'), scale(0.5), solid()],
  '@' : [sprite('enemy'), scale(0.5), solid()],
  '$' : [sprite('LitSlime'), solid()],
}

addLevel(map, LevelCfg)

const scoreLabel = add([
  text('0'),
  pos(3,6),
  layer('ui'),
  {
    value: '0'
  }
])

add([text('level ' + ' 0'), pos(40,6)])

const player = add([sprite('player'),
pos(30,0),
body()
])

keyDown('a',  () => {
  player.move(-MOVE_SPEED,0)
})

keyDown('d', () => {
  player.move(MOVE_SPEED,0)
})

keyPress('w', () => {
  if(player.grounded())
  player.jump(JUMP_FORCE)
})
