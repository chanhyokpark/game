//스케마 파일을 여기에 붙여넣기
export const rawGameData = `
$schema: './schema.yaml'

nodes:
  _after_branch:
    dest:
      - id: _prev
  _begin:
    dest:
      - id: scene1_1
        set:
          hp: 1
          _prev_idx: -1
  death:
    dest:
      - id: _prev
        set:
          dead: true # 죽음, 프론트엔드에서 적절히 처리하기

  scene1_1:
    text: '당신은 학교 건물을 뒤로 하고 집을 향해 발걸음을 재촉하고 있습니다. 한여름의 뜨거운 햇빛에 달궈진 모래가 튀어 종아리를 때리지만 여느 때와 같이 당신에게는 집에 가고 싶다는 일념 뿐입니다. 늘 교문 근처에서 전단지를 나눠주고 있던 사람마저도 오늘은 마음에 들지 않네요.'
    image: '배경이미지1'
    branch:
      - text: '전단지 살펴보기'
        id: scene1_1_1
      - text: '다음'
        id: scene1_2

  scene1_1_1:
    text: '전단지는 빨간색과 검은색의 조합으로 되어있네요. 오픈 1주년 기념 배양육 100% 무한리필이 단돈 14,000원으로 할인! .. 알 바가 아닙니다'
    image: '전단지'
    next:
      id: scene1_2

  scene1_2:
    text: '막 정문을 지나는데 벌써 조금씩 땀이 나는 것이 느껴집니다. 정문을 마주보고 있는 전봇대에 걸린 현수막이 눈에 들어옵니다. "구원받고 싶다면 믿으라." 현수막 상단에는 당신의 학교, 탐진 신학교의 로고가 박혀 있습니다. 지난번 현수막이 떨어진지 얼마나 됐다고, 벌써 무슨 일이 났나 봅니다. 누군가가 반역을 실패한 것 같네요, 아마.'
    image: '배경이미지1'
    next:
      id: scene1_3

  scene1_3:
    text: '언뜻 저 멀리에 다급하게 뛰어가는 한 사람이 보입니다. 탐진신학교의 교복을 입고 있네요. 키가 작은 걸 보니 당신의 후배인듯 합니다.'
    image: '배경이미지1'
    next:
      id: scene1_4

  scene1_4:
    text: '자세히 보니 왠지 그 실루엣이 익숙합니다. 단발이라기엔 조금 긴 머리, 작은 키에 어울리지 않게 빠른 걸음. 아, 당신의 동생 휘인 것 같습니다.'
    image: '배경이미지1'
    next:
      id: scene1_5

  scene1_5:
    text: '휘가 저렇게 뛰어가는 모습은 본 적이 없는데요. 성격도 급하지 않고 친구도 많은 휘가 당신보다 먼저 가는 일도 흔한 일은 아닙니다. 무슨 일이 있는 게 분명합니다. 휘에게 무슨 일이 있다면, 당신과도 관련되어 있을 확률이 높겠죠.'
    image: '배경이미지1'
    branch:
      - text: '휘를 따라간다'
        id: scene2_1
      - text: '휘는 무시하고 가던 길을 간다'
        id: random_encounter
        set:
          achievement_pioneer: true

  random_encounter:
    random: true
    dest:
      - id: death
        weight: 1
      - id: scene2_1
        weight: 1

  scene2_1:
    text: '당신은 휘를 뒤쫓아 열심히 뛰었지만 학교 육상부인 휘를 따라가기에는 역부족이었습니다. 하필 이렇게 더운 날에... 당신은 턱 끝까지 차오른 숨을 몰아쉬며 집으로 걸어갑니다.'
    image: '배경이미지1'
    next:
      id: scene2_2

  scene2_2:
    text: '열심히 뛰어온 것이 무색하게 집 앞은 평소와 다름없이 조용합니다. 당신은 허탈한 심정으로 공동현관문을 엽니다.'
    image: '배경이미지1'
    branch:
      - text: '엘리베이터 버튼을 누르고 기다린다'
        id: scene2_2_1
      - text: '계단으로 걸어 올라간다'
        id: scene2_3
      - text: '다시 밖으로 나간다'
        id: random_encounter

  scene2_2_1:
    text: '당신은 엘리베이터 버튼을 누르고 기다립니다. 평소에 내려오던 속도보다 느린 것이 왠지 모르게 불안합니다.'
    image: '배경이미지1'
    next:
      id: scene2_2_2

  scene2_2_2:
    text: '이런, 내려오던 엘리베이터가 멈췄나 봅니다. 표시되는 숫자가 3에서 멈춰서 줄어들지를 않네요. 어쩔 수 없이 걸어가야겠습니다. 힘들어 죽겠는데.'
    image: '배경이미지1'
    next:
      id: scene2_3

  scene2_3:
    text: '계단을 올라가는 일이 이렇게 힘든 일이었던가요. 오늘따라 4층이 너무 높게 느껴집니다. 당신은 중간 중간 쉬어가면서 기다시피 계단을 올라 현관문 앞까지 도착합니다.'
    image: '배경이미지1'
    next:
      id: scene2_4

  scene2_4:
    text: '당신은 현관문에 기대어 도어락을 누르려다 문이 살짝 움직이는 것을 느끼고 멈칫합니다. 이런! 문이 열려 있었군요! 역시 무슨 일이 있었던 것이 분명합니다. 안 그래도 빨리 뛰던 심장이 주체할 수 없을 정도로 박동하기 시작합니다.'
    image: '배경이미지1'
    next:
      id: scene2_5

  scene2_5:
    text: '오른손을 왼쪽 가슴팍에 올려둔 채 조심스레 문을 열어봅니다. 온갖 물건이 바닥에 나뒹구는 거실의 모습이 마음 속에 안일하게 남아 있던 한 줄기 희망마저 지워버리네요. 대체 누가 집에 들어왔길래 집안이 이 정도로 난장판이 된 것일까요? 거실에 여러 물체가 나뒹구는게 보이네요.'
    image: '배경이미지1'
    branch:
      - text: '수첩과 볼펜을 확인한다'
        id: scene2_5_1
      - text: '주머니칼을 확인한다'
        id: scene2_5_2

  scene2_5_1:
    text: '거실 바닥에 떨어져 있는 수첩과 검정 볼펜. 무언가를 메모할 때 쓸 수 있을 것 같다.'
    set : 
      수첩 : true
    image: '수첩'
    next:
      id: scene2_6

  scene2_5_2:
    text: '어딘가 유용하게 쓸 수 있을 것 같은 주머니칼이다.'
    image: '주머니칼'
    set: 
      주머니칼 : true
    next:
      id: scene2_5

  scene2_6:
    text: '당신은 이 사태가 아버지와 관련된 것임을 본능적으로 직감하였습니다. 휘와 당신을 위험에 노출시킬 수는 없다며 집을 나간 지 어언 2년이 다 되어가는 아버지이지만, 그것 만으로 모든 위험에서 벗어나는 것은 아버지 청상준의 명성에 걸맞지 않죠.'
    image: '배경이미지1'
    next:
      id: scene3_1
`