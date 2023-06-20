<a href="https://ibb.co/HdhPZ0Q"><img src="https://i.ibb.co/jRJwtdF/image.png" alt="image" border="0"></a>

## 팀구성

<a href="https://ibb.co/10bR0hp"><img src="https://i.ibb.co/BfwTfd7/image.png" alt="image" border="0"></a>

## 서비스설명

**ssf는 인터넷으로 연결된 IOT기기를 통해 씨앗과 식물을 공유하는 카뮤니티 플랫폼 입니다.**

## 사용기술스택

**FRONT-END**

- TypeScript
- React.js
- Redux Toolkit
- Styled-Component
- Vite

**DEVICE**

- ESP32
- MQTT


**BACK-END**

- Node.js
- MySql
- Knex.js
- Express
- Javascript
- Mqtt.js
- Swagger

## 서비스 소개

**회원가입,로그인**

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGRhMjRmNGYyM2UyMDdjZDFhZjk3MjJmY2EyZjdhODM1N2NhYjhiNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/DpuKBI25U9wrQnddmh/giphy.gif)

**유저 mbti별 꽃 추천 및 작물의 상태에 따른 유저 미니홈피**

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjVkYmExMmJjMzhhNTYyYjExYmYxYjI5ZDMzODBmNjEzNGM0Y2I4NiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/anWJgZq8cxpetCYz02/giphy.gif)

**디바이스 연결 유저 액츄에이터 제어및 유저간 커뮤니티**

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDAwNzY3MTQyODhkYTE2Y2VhNjNjODJhYWZiMDNkNTNiZWE0NmE4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/gYF0BFYm651npxgm2A/giphy-downsized-large.gif)

**각각의 status에 따른 액츄에이터 반응**

- 온도

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjIwNDc2Y2M0YzE0MThiNDEyM2E1ZTg1YzVlNTY0MmMzNzhlOTI5MSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/ODyoryMJfZx7nkFMsU/giphy-downsized-large.gif)

- 토양수분

![](https://media.giphy.com/media/5szO2ueVFJMs51lHC9/giphy-downsized-large.gif)

- 조도

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTNkNWFiNzQ1YjNlN2I1MDllY2M0OTA3ZGZlMjI4ZTI2ZTkzMjY2NiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/24qpNeZUTCX7T12QbR/giphy-downsized-large.gif)


- 습도 

![](https://media.giphy.com/media/IrwilFkK9cB6gkwJhQ/giphy-downsized-large.gif)


## 주요기능

**모든 페이지는 유저전용 서비스 입니다**
테스트 계정:user@example.com
비밀번호:password123

- 로그인, 회원가입
- 메인페이지: 작물의 4단계 상태에 따른 삼삼팜 유저간 미니홈피 기능
- 커뮤니티: 최신 게시물 캐릭터 스와이퍼 및 게시판 조회수, 페이지네이션, 글작성 기능
- 마이페이지: 유저 정보 확인 및 액츄에이터 제어, 실시간 데이터 그래프
- mbti 페이지: 유저 mbti별 꽃 추천 및 꽃 부여
- 그외기능: bgm, 카카오톡 공유하기,반응형 모바일버전

## 배포사이트링크

http://reactjs.wo.tc/

## 깃 커밋 컨벤션

- feature : 새로운 기능 추가

- fix : 버그 수정

- docs : 문서 수정

- test : 테스트 코드 추가

- refactor : 코드 리팩토링

- style : 코드 의미에 영향을 주지 않는 변경사항

- chore : 빌드 부분 혹은 패키지 매니저 수정사항


# 백엔드 상세 설명
## 백엔드 요구사항

- Mosquitto와 연동하여 센서 데이터를 읽어와서 MySQL에 저장

- 센서 데이터를 프론트엔드로 전송하는 API 구현

- 디바이스 목록 조회 API 구현

- 디바이스 제어 명령 API 구현 (POST 메시지 처리)

- 디바이스 제어 명령 Mosquitto로 전달

## 요구사항에 따른 기술 스택

- Node 18.13.0

- Express 4.18.2

- Mysql 8버전

- Knex.js: 모든 팀원들이 Mysql에 익숙하지 않아서 쿼리 빌더를 채택

- Mqtt.js : 디바이스와 서버의 통신을 위한 라이브러리

## 설치 및 실행 방법

1. 깃랩에서 레포지토리를 가져온다

```
git clone https://kdt-gitlab.elice.io/iot_track/class_01/iot_project/team3/back-end.git

```

2. BACK-END 디렉토리로 이동합니다.

```
cd back-end
```

3. 종속성 패키지들을 설치합니다

```
npm install
```
4. .env 파일을 생성하고 .env.example파일을 참조하여 작성합니다.

5. 
```
npm run start
```
프로젝트를 실행합니다

## 기능 설명

### auth
회원가입, 로그인

### user
정보조회, 수정, 삭제

### device
생성, 조회, id에 따른 상세조회

### actuator
엑츄에이터 제어, 실시간 센서 데이터 조회

### plant
생성, 조회, id에 따른 상세조회

### guestbook
생성, 조회

### article&comment

게시물 조회, 생성, id에 따른 상세조회, 삭제, 수정

댓글 생성, 삭제

# API 문서 링크

http://reactjs.wo.tc/api-docs/


