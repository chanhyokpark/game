//스케마 파일을 여기에 붙여넣기
export const rawGameData = `
$schema: './schema.yaml'

nodes:
  _after_branch:
    dest:
      - id: _prev
  _begin:
    dest:
      - id: game_start
        set:
          player_wins: 0
          hp: 40
          computer_wins: 0
          draws: 0
          _prev_idx: -1
  game_start:
    text: '가위바위보 게임을 시작합니다! 무엇을 내시겠습니까?'
    branch:
      - id: computer_choice
        text: '바위'
        set:
          player_choice: 0
      - id: computer_choice
        text: '가위'
        set:
          player_choice: 1
      - id: computer_choice
        text: '보'
        set:
          player_choice: 2

  computer_choice:
    random: true
    dest:
      - id: compare_choices
        weight: 1
        set:
          computer_choice: 0
      - id: compare_choices
        weight: 1
        set:
          computer_choice: 1
      - id: compare_choices
        weight: 1
        set:
          computer_choice: 2

  compare_choices:
    dest:
      - cond:
          player_choice: '{{computer_choice}}'
        id: result
        set:
          player_won: 2
          draws: '+=1'
      - cond:
          player_choice: 0
          computer_choice: 1
        id: result
        set:
          player_won: 1
          player_wins: '+=1'
      - cond:
          player_choice: 1
          computer_choice: 2
        id: result
        set:
          player_won: 1
          player_wins: '+=1'
      - cond:
          player_choice: 2
          computer_choice: 0
        id: result
        set:
          player_won: 1
          player_wins: '+=1'
      - id: result
        set:
          player_won: 0
          computer_wins: '+=1'

  result:
    text: $result_text
    next:
      id: game_start
      text: '다시 하기'

texts:
  result_text:
    - text: '당신은 {$player_choice_text}를 냈고, 컴퓨터는 {$computer_choice_text}를 냈습니다. {$winner_text}'

  winner_text:
    - cond:
        player_won: 2
      text: '비겼습니다!'
    - cond:
        player_won: 1
      text: '당신이 이겼습니다!'
    - cond:
        player_won: 0
      text: '컴퓨터가 이겼습니다!'

  player_choice_text:
    - cond:
        player_choice: 0
      text: '바위'
    - cond:
        player_choice: 1
      text: '가위'
    - cond:
        player_choice: 2
      text: '보'

  computer_choice_text:
    - cond:
        computer_choice: 0
      text: '바위'
    - cond:
        computer_choice: 1
      text: '가위'
    - cond:
        computer_choice: 2
      text: '보'

items:
  player_choice:
    hide: true
  computer_choice:
    hide: true
  player_won:
    hide: true
  player_wins:
    name: '승리'
    description: '플레이어의 승리 횟수'
  computer_wins:
    name: '패배'
    description: '컴퓨터의 승리 횟수'
  draws:
    name: '무승부'
    description: '무승부 횟수'
`