//스케마 파일을 여기에 붙여넣기
export const rawGameData = `
nodes:
  death:
    dest:
      - id: _prev
        set:
          dead: true

  _begin:
    dest:
      - id: node_1
        set: # 기본값 설정
          hp: 5
          _prev_idx: -1


  _after_branch:
    random: true
    dest:
      - cond:
          hp: '<=0'
        id: death
        weight: 1000000000
      - cond:
          item5: 2
        id: special_1
        weight: 100
      - cond:
          item6: true
        id: special_2
        weight: 1
      - id: _prev

  select_1:
    random: true #  조건 맞는 거중 랜덤
    dest:
      - cond:
          item1: '>3'
          item2: true
        id: node_1
        weight: 3
      - cond:
          item1: 2
        id: node_2
        weight: 5
      - id: node_3 # 기본값
        weight: 0.01

  select_2: # 조건 맞는 것중 최상위
    dest:
      - cond:
          item1: '!2'
          item3: false
        id: node_4
      - id: node_5

  node_1:
    text: '당신은 갈림길에 도달합니다. 표지판 하나는 ~라고 써져 있고, (...)'
    image: node_1
    next: # 바로 다음으로 넘어가기
      id: node_2

  node_2:
    text: '어디로 갈까요?'
    branch:
      - cond:
          item1: 2
          item2: true
          visited_node_2_1: false
        hide: true # 조건 충족시키지 못하면 숨기기
        set:
          item1: '-=2' # 2만큼 빼기
          item3: true
          hp: 3 # 3으로 맞추기
        text: '주변을 분석한다'
        id: node_2_1
      - text: '왼쪽 갈림길'
        set:
          hp: '-=$hp_delta'
        id: node_2_2
      - text: '오른쪽 갈림길'
        id: node_3

  node_2_1:
    text: '당신은 왼쪽 갈림길에 함정이 있는 것을 발견합니다!'
    next:
      id: node_2
      set:
        visited_node_2_1: true
      text: '다행이다'

  node_2_2:
    text: '당신은 함정에 빠집니다!'
    next:
      id: node_3
      text: '아야'

  node_3:
    dest:
      - id: hub

  hub:
    text: $hub_text
    branch: # 허브에서 갈 수 있는 지역들/퀘스트 표시
      - id: node_1
        text: '마을로 이동'

  _prev:
    text: placeholder


texts:
  hub_text:
    - cond:
        item1: 0
      text: '텍스트 1'
    - cond:
        item2: 1
      text: '텍스트 2'
    - text: 'hp: {{hp}}, hp delta: {$hp_delta}'
  hp_delta:
    - cond:
        hp: '>4'
      text: '2'
    - cond:
        hp: '>2'
      text: '1'
    - text: '999'
`