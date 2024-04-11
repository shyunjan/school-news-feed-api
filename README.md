<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1>School News Feed Servce developed using NestJs Project Boiler-Plate V4</h1>
<h3>Use</h3>
<ul>
<li>MongoDB</li>
<li>Mongoose</li>
<li>Fastify</li>
<li>class-validator</li>
<li>swagger</li>
<li>winston</li>
<li>env</li>
<li>rxjs</li>
</ul>

<h3>학교 뉴스 피드 프로젝트</h3>
<p>타 프로젝트의 Start-Up용 템플릿 프로젝트로 사용할 수 있음</p>
<ul>
<li>author : Shin HyunJae</li>
<li>email : snhj3827@naver.com 또는 shyunjan@naver.com </li>
</ul>

---

### 1. 기본 정보

- 소스: **[[Github]](https://github.com/shyunjan/school-news-feed-api 'shyunjan/school-news-feed-api') https://github.com/shyunjan/school-news-feed-api**
- 배포: [[CLOUDTYPE]](https://port-0-school-news-feed-api-2aat2clumwcq8y.sel5.cloudtype.app 'school-news-feed-api') https://port-0-school-news-feed-api-2aat2clumwcq8y.sel5.cloudtype.app

#### 1.1 로컬 실행

```bash
$ npm run local

> school-news-feed-api@0.0.1 local
> dotenv -- npm run start:local

> school-news-feed-api@0.0.1 start:local
> rimraf dist && nest build --webpack --webpackPath webpack-hmr.config.js --watch

 Info  Webpack is building your sources...

webpack 5.82.1 compiled successfully in 485 ms
config.MODE = local
config.MONGO_DB_URL = ${ MongoDB 커넥션 정보 }
[server] info 12:30:07:903 [NestFactory] Starting Nest application...
[server] info 12:30:07:941 [InstanceLoader] MongooseModule dependencies initialized
...
[server] info 12:30:08:325 [NestApplication] Nest application successfully started
[server] info 12:30:08:333 [bootstrap] School News Feed API Server is Running On: http://127.0.0.1:3000
...
```

#### 1.2 로컬 .env 파일

보안 원칙상 현재는 [Github 리포지토리]에 .env 파일을 올리지 않은 상태이기 때문에 .env 파일을 작성하지 않고 로컬에서 실행하면 아래와 같은 오류가 발생할 것이다

```bash
webpack 5.82.1 compiled successfully in 501 ms
config.MODE = undefined
config.MONGO_DB_URL = undefined
info [NestFactory] Starting Nest application...
error [MongooseModule] Unable to connect to the database. Retrying (1)...
info [InstanceLoader] MongooseModule dependencies initialized
info [InstanceLoader] PasswordModule dependencies initialized
info [InstanceLoader] JwtModule dependencies initialized
info [InstanceLoader] AppModule dependencies initialized
info [InstanceLoader] CqrsModule dependencies initialized
error [MongooseModule] Unable to connect to the database. Retrying (2)...
error [MongooseModule] Unable to connect to the database. Retrying (3)...
```

로컬에서 테스트하기 위해서는 .env 파일을 아래와 같이 작성한다.

```js
MODE=local

MONGO_DB_URL=${ MongoDB 커넥션 정보 }

JWT_ACCESS_TOKEN_SECRET=${ 토큰 액세스 시크릿 }
JWT_ACCESS_TOKEN_EXPIRATION_TIME=24h
JWT_REFRESH_TOKEN_SECRET=${ 토큰 리프레쉬 시크릿 }
JWT_REFRESH_TOKEN_EXPIRATION_TIME=365d
```

#### 1.3 로컬 주소 Health Check

http://localhost:3000/welcome

#### 1.4 Swagger (Open Api Specification 3.0)

로컬: http://localhost:3000/api  
클라우드: [[CLOUDTYPE]](https://port-0-school-news-feed-api-2aat2clumwcq8y.sel5.cloudtype.app/api 'school-news-feed-api') https://port-0-school-news-feed-api-2aat2clumwcq8y.sel5.cloudtype.app/api

#### 1.5 클라우드 배포 설정

- Git 저장소: `https://github.com/shyunjan/school-news-feed-api.git`
- 브랜치: `main`
- Environment variables:
  - NODE_ENV: `production`
  - MODE: `production`
  - MONGO_DB_URL: `${ MongoDB 커넥션 정보 }`
  - JWT_ACCESS_TOKEN_SECRET: `${ 토큰 액세스 시크릿 }`
  - JWT_ACCESS_TOKEN_EXPIRATION_TIME: `24h`
  - JWT_REFRESH_TOKEN_SECRET: `{ 토큰 리프레쉬 시크릿 }`
  - JWT_REFRESH_TOKEN_EXPIRATION_TIME: `365d`
- Port: `3000`
- Install command: `npm install`
- Build command: `.`
- Start command: `npm run start:prod`
- Health Check: `/`

보안 관계상 MONGO_DB_URL과 계정 정보는 보이지 않도록 처리했다.
테스트 기관 측에서 별도로 설치하여 테스트하거나 상단 `1. 기본 정보`의 클라우드 배포 서버로 테스트를 진행하기 바란다.

### 2. 테스트 절차 (시나리오)

1. 로컬로 테스트하기 위해서는 보안 관계상 GitHub에 배포되지 않은 .env 파일을 위 `1.4 클라우드 배포 설정`의 `Environment variables:` 에 나와 있는대로 작성해야 한다
2. 로컬 셋팅이 힘들다면 위 `1.4 Swagger`의 [클라우드 서버](https://port-0-school-news-feed-api-2aat2clumwcq8y.sel5.cloudtype.app/api 'school-news-feed-api')를 이용하는 것도 가능하다
3. Swagger example을 그대로 실행하면 데이터베이스에 이미 저장되어 있는 primary key 데이터와 충돌이 일어날 수 있으므로 주의한다
4. 일단 아래 테스트 절차는 로컬 Swagger(http://localhost:3000/api) 기준으로 진행한다

#### 2.1 학교관리자 생성

**`[POST] /auth/register-admin`**

기존에 동일한 아이디로 가입한 유저(일반학생 유저 포함)가 있다면 오류가 발생하므로 주의한다.

- Request URL
  > http://localhost:3000/auth/register-admin
- Request body
  ```bash
  {
    "id": "gabriel",
    "password": "^gb24!"
  }
  ```
- curl

  ```bash
  $ curl -X 'POST' \
      'http://localhost:3000/auth/register-admin' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
            "id": "gabriel",
            "password": "^gb24!"
          }'
  ```

- Response body
  ```bash
  {
    "success": true,
    "data": "66176c4cd5802453a27ae451",
    "timestamp": "2024-04-11 04:51:24"
  }
  ```

참고로 관리자를 생성하면서 다음과 같이 관리할 학교 정보도 같이 입력하여 아래 _`2.2 학교 생성`_ 단계를 생략할 수도 있다.

- Request body
  ```bash
  {
    "id": "gabriel",
    "password": "^gb24!",
    "school": {
      "region": "서울",
      "name": "서울시립대학교"
    }
  }
  ```

#### 2.2 (학교관리자) 로그인

**`[POST] /auth/login`**

로그인은 학교관리자나 일반 유저(학생)나 모두 아래 방식과 동일하다

- Request URL
  > http://localhost:3000/auth/login
- Request body
  ```bash
  {
    "id": "gabriel",
    "password": "^gb24!"
  }
  ```
- curl
  ```bash
  $ curl -X 'POST' \
    'http://localhost:3000/auth/login' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
          "id": "gabriel",
          "password": "^gb24!"
        }'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdhYnJpZWwiLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNzEyODExNzY1LCJleHAiOjE3MTI4MTUzNjV9.fgKLwLjg_BjH9CjxTQhBedhkzh29itzReFO_C2dKwAA",
    "timestamp": "2024-04-11 05:02:45"
  }
  ```

바로 위의 Response body 에서 `"data"` 프로퍼티의 **`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdhYnJpZWwiLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNzEyODExNzY1LCJleHAiOjE3MTI4MTUzNjV9.fgKLwLjg_BjH9CjxTQhBedhkzh29itzReFO_C2dKwAA"`** 값이 **access token**이다. 이후 테스트에 사용되므로 저장해둔다. 유효시간은 24시간이다.

#### 2.3 [관리자 로그인 필요] 학교 생성

**`[POST] /school/register`**

위의 (_`2.1 학교관리자 생성`_)단계에서 학교는 생성하지 않았다면 이 단계에서 학교 기본 정보를 생성한다.  
학교관리자 로그인이 필요하므로 바로 위의 (_`2.2 로그인`_)단계에서 생성된 관리자의 **access token**을 학교 등록 API 바로 옆의 swagger 자물쇠 아이콘을 클릭하고 셋팅한다.  
그리고 학교 생성시에 기존의 동일한 지역과 동일한 학교명이 존재하는지 여부는 아직 확인하지 않으므로 주의한다.  
과제 요구사항에는 없었지만 `전체 학교 리스트 조회` API도 있으므로 확인하고 싶다면 이용할 수 있다.

- Request URL
  > http://localhost:3000/school/register
- Request body
  ```bash
  {
    "region": "서울",
    "name": "서울시립대학교"
  }
  ```
- curl
  ```bash
  $ curl -X 'POST' \
      'http://localhost:3000/school/register' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdhYnJpZWwiLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNzEyODExNzY1LCJleHAiOjE3MTI4MTUzNjV9.fgKLwLjg_BjH9CjxTQhBedhkzh29itzReFO_C2dKwAA' \
      -H 'Content-Type: application/json' \
      -d '{
            "region": "서울",
            "name": "서울시립대학교"
          }'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": {
      "region": "서울",
      "name": "서울시립대학교",
      "_id": "66177192d5802453a27ae458",
      "__v": 0
    },
    "timestamp": "2024-04-11 05:13:54"
  }
  ```

#### 2.4 [관리자 로그인 필요] 뉴스 등록

**`[POST] /news/register`**

이 API도 학교관리자 로그인이 필요하지만 바로 위의 (_`2.3 학교 생성`_)단계에서 관리자의 **access token**을 입력한 상태이기 때문에 swagger의 자물쇠 아이콘이 잠겨있을 것이다.

- Request URL
  > http://localhost:3000/news/register
- Request body
  ```bash
  {
    "title": "서울시립대 첫번째 뉴스",
    "contents": "서울시립대 건립 및 역사 소개 등"
  }
  ```
- curl
  ```bash
  $ curl -X 'POST' \
      'http://localhost:3000/news/register' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdhYnJpZWwiLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNzEyODExNzY1LCJleHAiOjE3MTI4MTUzNjV9.fgKLwLjg_BjH9CjxTQhBedhkzh29itzReFO_C2dKwAA' \
      -H 'Content-Type: application/json' \
      -d '{
            "title": "서울시립대 첫번째 뉴스",
            "contents": "서울시립대 건립 및 역사 소개 등"
          }'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": {
      "_id": "6617752fd5802453a27ae45d",
      "title": "서울시립대 첫번째 뉴스",
      "contents": "서울시립대 건립 및 역사 소개 등",
      "school_id": "66177192d5802453a27ae458",
      "admin_id": "gabriel",
      "create_at": "2024-04-11T05:29:19.597Z",
      "update_at": "2024-04-11T05:29:19.597Z",
      "__v": 0
    },
    "timestamp": "2024-04-11 05:29:19"
  }
  ```

#### 2.5 유저(학생) 가입

**`[POST] /auth/register-user`**

일반 학생용 가입 API. 기존에 동일한 아이디로 가입한 유저(관리자 포함)가 있다면 오류가 발생하므로 주의한다.

- Request URL
  > http://localhost:3000/auth/register-user
- Request body
  ```bash
  {
    "id": "jane",
    "password": "^je24!"
  }
  ```
- curl
  ```bash
  $ curl -X 'POST' \
      'http://localhost:3000/auth/register-user' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
            "id": "jane",
            "password": "^je24!"
          }'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": "661777bdd5802453a27ae460",
    "timestamp": "2024-04-11 05:40:13"
  }
  ```

#### 2.6 (학생) 로그인

**`[POST] /auth/login`**

로그인 API url이나 방식은 위에서 설명한 _`2.2 (학교관리자) 로그인`_ 과 동일하다. 바로 위 _`2.5 유저(학생) 가입`_ 시에 입력했던 `"id"`와 `"password"`로 바꾼다.

- Request URL
  > http://localhost:3000/auth/login
- Request body
  ```bash
  {
    "id": "jane",
    "password": "^je24!"
  }
  ```
- curl
  ```bash
  $ curl -X 'POST' \
      'http://localhost:3000/auth/login' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
            "id": "jane",
            "password": "^je24!"
          }'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImphbmUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjgxNDg5OCwiZXhwIjoxNzEyODE4NDk4fQ.-BfeWgJ2BGW0Ufm8Too_Q9_7lU68h6Ai-eTzIf5x1YQ",
    "timestamp": "2024-04-11 05:54:58"
  }
  ```

_`2.2 (학교관리자) 로그인`_ 과 마찬가지로 위의 Response body 에서 `"data"` 프로퍼티의 **`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImphbmUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjgxNDg5OCwiZXhwIjoxNzEyODE4NDk4fQ.-BfeWgJ2BGW0Ufm8Too_Q9_7lU68h6Ai-eTzIf5x1YQ"`** 값이 일반 유저(학생)용 **access token**이다. 이후 테스트에 사용되므로 관리자와 별도로 저장해둔다.

#### 2.7 [로그인 필요] 구독 정보(학교) 등록

**`[POST] /subscription/register`**

API 바로 옆의 swagger 자물쇠 아이콘이 관리자 access token이 입력되어 있는 상태이므로 잠겨있을 것이다. 자물쇠를 클릭하고 `[Logout]` 버튼을 누른 다음 바로 위의 _`2.6 (학생) 로그인`_ 에서 생성했던 일반 유저(학생)용 **access token**을 입력하여 자물쇠를 다시 잠근다.  
여기서는 구독할 학교 번호를 **`school_id`** 자리에 입력해야 한다. 위의 _`2.3 [관리자 로그인 필요] 학교 생성`_ 단계에서 생성했던 학교의 번호(`"_id"` 프로퍼티의 `"66177192d5802453a27ae458"`)를 입력한다. 혹은 `전체 학교 리스트 조회` API를 통해서도 동일하게 확인할 수 있다.

- Request URL
  > http://localhost:3000/subscription/register?school_id=66177192d5802453a27ae458
- Request body  
  없음
- curl
  ```bash
  $ curl -X 'POST' \
      'http://localhost:3000/subscription/register?school_id=66177192d5802453a27ae458' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImphbmUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjgxNDg5OCwiZXhwIjoxNzEyODE4NDk4fQ.-BfeWgJ2BGW0Ufm8Too_Q9_7lU68h6Ai-eTzIf5x1YQ' \
      -d
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": {
      "create_at": "2024-04-11T04:24:04.750Z",
      "update_at": "2024-04-11T04:24:04.750Z",
      "school_id": "66177192d5802453a27ae458",
      "subscriber_id": "jane",
      "_id": "66177eddd5802453a27ae467",
      "__v": 0
    },
    "timestamp": "2024-04-11 06:10:37"
  }
  ```

#### 2.8 [관리자 로그인 필요] 뉴스 등록

**`[POST] /news/register`**

테스트를 위해서 해당 학교의 뉴스를 한번 더 등록한다. 구독 이전의 뉴스가 구독 뉴스 리스트에서 빠지는 지와 구독 이후 생성된 뉴스의 포함 여부를 확인하기 위함이다.  
마찬가지로 swagger 자물쇠 아이콘을 클릭하고 `[logout]`하고 다시 관리자용 **access token**을 입력하고 자물쇠를 잠근다.

- Request URL
  > http://localhost:3000/news/register
- Request body
  ```bash
  {
    "title": "서울시립대 두번째 뉴스",
    "contents": "서울시립대 교수 및 임직원 소개 등"
  }
  ```

뉴스 등록 API는 위에서 설명했으므로 자세한 curl과 Response body 부분은 생략한다.

#### 2.9 [로그인 필요] 학교별 구독 뉴스 리스트 조회

**`[GET] /subscription/news/query-list`**

다시 `[logout]`하고 일반 학생 사용자로 로그인한다 (학생용 **access token** 입력).  
위의 _`2.7 [로그인 필요] 구독 정보(학교) 등록`_ API와 마찬가지로 **`school_id`** 자리에 해당 학교의 번호(`"66177192d5802453a27ae458"`)를 입력한다.
만약 **`school_id`** 입력을 생략하면 구독 중인 모든 학교의 뉴스를 볼 수 있다.

- Request URL
  > http://localhost:3000/subscription/news/query-list
- Request body
  없음
- curl
  ```bash
  $ curl -X 'GET' \
      'http://localhost:3000/subscription/news/query-list?school_id=66177192d5802453a27ae458' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImphbmUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjgxNzczOSwiZXhwIjoxNzEyOTA0MTM5fQ.bUxhSYWp2VY7pHYtjJGuEAo8z5zA7qFs5k3NvaTgKko'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": [
      {
        "_id": "6617833850b1fdfe6da55526",
        "news_id": "6617833850b1fdfe6da55523",
        "is_read": false,
        "title": "서울시립대 두번째 뉴스",
        "admin_id": "gabriel",
        "create_at": "2024-04-11T06:29:12.650Z",
        "update_at": "2024-04-11T06:29:12.650Z"
      }
    ],
    "timestamp": "2024-04-11 06:42:52"
  }
  ```

위와 같이 구독하기 이전의 뉴스는 포함되지 않고 구독 이후의 뉴스만 목록에 포함되는 것을 볼 수 있다.

#### 2.10 [로그인 필요] 구독 취소

**`[DELETE] /subscription/cancel`**

마찬가지로 구독 취소할 학교 번호를 **`school_id`** 자리에 입력한다.

- Request URL
  > http://localhost:3000/subscription/cancel
- Request body
  없음
- curl
  ```bash
  $ curl -X 'DELETE' \
      'http://localhost:3000/subscription/cancel?school_id=66177192d5802453a27ae458' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImphbmUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjgxNzczOSwiZXhwIjoxNzEyOTA0MTM5fQ.bUxhSYWp2VY7pHYtjJGuEAo8z5zA7qFs5k3NvaTgKko'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": {
      "_id": "66177eddd5802453a27ae467",
      "create_at": "2024-04-11T04:24:04.750Z",
      "update_at": "2024-04-11T04:24:04.750Z",
      "school_id": "66177192d5802453a27ae458",
      "subscriber_id": "jane",
      "__v": 0,
      "delete_at": "2024-04-11T06:54:57.294Z"
    },
    "timestamp": "2024-04-11 06:54:57"
  }
  ```

Response body를 자세히 보면 `"delete_at"`이 생긴 걸 볼 수 있다.

#### 2.11 [관리자 로그인 필요] 뉴스 등록

**`[POST] /news/register`**

테스트를 위해서 해당 학교의 뉴스를 다시 등록한다. 구독 취소 이전의 뉴스의 포함 여부와 구독 취소 이후 뉴스가 리스트에서 빠지는 지를 테스트한다.
다시 학교 관리자로 로그인하자.

- Request URL
  > http://localhost:3000/news/register
- Request body
  ```bash
  {
    "title": "서울시립대 세번째 뉴스",
    "contents": "서울시립대 교칙 및 규정 안내"
  }
  ```

#### 2.12 [로그인 필요] 학교별 구독 뉴스 리스트 조회

**`[GET] /subscription/news/query-list`**

다시 일반 학생 사용자로 로그인하고 **`school_id`** 자리에 해당 학교의 번호(`"66177192d5802453a27ae458"`)를 입력한다.

- Request URL
  > http://localhost:3000/subscription/news/query-list
- Request body
  없음
- curl
  ```bash
  $ curl -X 'GET' \
      'http://localhost:3000/subscription/news/query-list?school_id=66177192d5802453a27ae458' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImphbmUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjgxNzczOSwiZXhwIjoxNzEyOTA0MTM5fQ.bUxhSYWp2VY7pHYtjJGuEAo8z5zA7qFs5k3NvaTgKko'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": [
      {
        "_id": "6617833850b1fdfe6da55526",
        "news_id": "6617833850b1fdfe6da55523",
        "is_read": false,
        "title": "서울시립대 두번째 뉴스",
        "admin_id": "gabriel",
        "create_at": "2024-04-11T06:29:12.650Z",
        "update_at": "2024-04-11T06:29:12.650Z"
      }
    ],
    "timestamp": "2024-04-11 07:06:27"
  }
  ```

위와 같이 구독 취소 이후에 등록된 세번째 뉴스는 포함되지 않았다.

#### 2.13 [로그인 필요] 구독 정보(학교) 등록

**`[POST] /subscription/register`**

다시 해당 학교를 구독한다. 위의 `2.7 [로그인 필요] 구독 정보(학교) 등록` 단계에서 설명했으니 자세한 언급은 생략한다.

- Request URL
  > http://localhost:3000/subscription/register?school_id=66177192d5802453a27ae458
- Response body
  ```bash
  {
    "success": true,
    "data": {
      "create_at": "2024-04-11T06:53:42.151Z",
      "update_at": "2024-04-11T06:53:42.151Z",
      "school_id": "66177192d5802453a27ae458",
      "subscriber_id": "jane",
      "_id": "66178d430069def19b19c44a",
      "__v": 0
    },
    "timestamp": "2024-04-11 07:12:03"
  }
  ```

#### 2.14 [관리자 로그인 필요] 뉴스 등록

**`[POST] /news/register`**

테스트를 위해서 해당 학교의 뉴스를 다시 등록한다. 재구독 이후 등록된 뉴스의 리스트 포함 여부를 테스트한다.
다시 학교 관리자로 로그인하자.

- Request URL
  > http://localhost:3000/news/register
- Request body
  ```bash
  {
    "title": "서울시립대 네번째 뉴스",
    "contents": "서울시립대 2024년 학사 일정"
  }
  ```

#### 2.15 [로그인 필요] 학교별 구독 뉴스 리스트 조회

**`[GET] /subscription/news/query-list`**

다시 일반 학생 사용자로 로그인하고 **`school_id`** 자리에 해당 학교의 번호(`"66177192d5802453a27ae458"`)를 입력한다.

- Request URL
  > http://localhost:3000/subscription/news/query-list
- Response body
  ```bash
  {
    "success": true,
    "data": [
      {
        "_id": "66178e1b0069def19b19c451",
        "news_id": "66178e1b0069def19b19c44e",
        "is_read": false,
        "title": "서울시립대 네번째 뉴스",
        "admin_id": "gabriel",
        "create_at": "2024-04-11T07:15:39.493Z",
        "update_at": "2024-04-11T07:15:39.493Z"
      },
      {
        "_id": "6617833850b1fdfe6da55526",
        "news_id": "6617833850b1fdfe6da55523",
        "is_read": false,
        "title": "서울시립대 두번째 뉴스",
        "admin_id": "gabriel",
        "create_at": "2024-04-11T06:29:12.650Z",
        "update_at": "2024-04-11T06:29:12.650Z"
      }
    ],
    "timestamp": "2024-04-11 07:17:38"
  }
  ```

위와 같이 재구독 이후에 등록된 네번째 뉴스가 정상적으로 포함되었다. 두번째 뉴스는 구독 취소, 재구독 과정을 거쳤지만 첫번째 구독 이후 받은 뉴스이기 때문에 계속 구독함에 남아있는 것을 볼 수 있다.

#### 2.16 [관리자 로그인 필요] 뉴스 수정

**`[POST] /news/modify`**

다시 학교 관리자로 로그인한다.  
특정 뉴스를 수정하기 위한 API이므로 두번째 뉴스의 뉴스번호를 **`news_id`** 자리에 입력한다. 바로 위의 _`2.15 [로그인 필요] 학교별 구독 뉴스 리스트 조회`_ 단계의 Response body를 보면 **`"news_id"`** 프로퍼티의 **`"6617833850b1fdfe6da55523"`** 가 뉴스번호이다.

- Request URL
  > http://localhost:3000/news/modify
- Request body
  ```bash
  {
    "title": "[오류수정] 서울시립대 두번째 뉴스",
    "contents": "일부 임직원 누락이 있었고, 퇴사 임직원을 제외합니다. 혼란을 드려서 죄송합니다."
  }
  ```
- curl
  ```bash
  $ curl -X 'PUT' \
      'http://localhost:3000/news/modify?news_id=6617833850b1fdfe6da55523' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdhYnJpZWwiLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNzEyODE4OTMzLCJleHAiOjE3MTI5MDUzMzN9.wpTXgqz2df2PZZUSP82qgjkXDEFbxzyjfFbfklunzvM' \
      -H 'Content-Type: application/json' \
      -d '{
            "title": "[오류수정] 서울시립대 두번째 뉴스",
            "contents": "일부 임직원 누락이 있었고, 퇴사 임직원을 제외합니다. 혼란을 드려서 죄송합니다."
          }'
  ```
- Response body
  ```bash
  {
  "success": true,
  "data": {
      "_id": "6617833850b1fdfe6da55523",
      "title": "[오류수정] 서울시립대 두번째 뉴스",
      "contents": "일부 임직원 누락이 있었고, 퇴사 임직원을 제외합니다. 혼란을 드려서 죄송합니다.",
      "school_id": "66177192d5802453a27ae458",
      "admin_id": "gabriel",
      "create_at": "2024-04-11T06:29:12.650Z",
      "update_at": "2024-04-11T07:28:11.747Z",
      "__v": 0
    },
    "timestamp": "2024-04-11 07:28:11"
  }
  ```

바로 위의 Response body를 보면 수정일자(`"update_at"`)이 바뀐 것을 볼 수 있다.

#### 2.17 [로그인 필요] 학교별 구독 뉴스 리스트 조회

**`[GET] /subscription/news/query-list`**

다시 일반 학생 사용자로 로그인하고 **`school_id`** 에 학교번호(`"66177192d5802453a27ae458"`)를 입력하고 조회.

- Request URL
  > http://localhost:3000/subscription/news/query-list
- Response body
  ```bash
  {
    "success": true,
    "data": [
        {
          "_id": "6617833850b1fdfe6da55526",
          "news_id": "6617833850b1fdfe6da55523",
          "is_read": false,
          "title": "[오류수정] 서울시립대 두번째 뉴스",
          "admin_id": "gabriel",
          "create_at": "2024-04-11T06:29:12.650Z",
          "update_at": "2024-04-11T07:28:11.747Z"
        },
        {
          "_id": "66178e1b0069def19b19c451",
          "news_id": "66178e1b0069def19b19c44e",
          "is_read": false,
          "title": "서울시립대 네번째 뉴스",
          "admin_id": "gabriel",
          "create_at": "2024-04-11T07:15:39.493Z",
          "update_at": "2024-04-11T07:15:39.493Z"
        }
      ],
      "timestamp": "2024-04-11 07:34:00"
    }
  ```

방금 수정된 두번째 뉴스가 리스트 최상단으로 올라간 것을 확인할 수 있다.

#### 2.18 [관리자 로그인 필요] 뉴스 삭제

**`[DELETE] /news/delete`**

다시 학교 관리자로 로그인한다.  
뉴스 수정 API와 마찬가지로 뉴스번호를 **`news_id`** 자리에 입력한다. 두번째 뉴스를 입력해보자. 바로 위의 _`2.17 [로그인 필요] 학교별 구독 뉴스 리스트 조회`_ 의 Response body를 보면 두번째 뉴스의 뉴스번호가 **`"6617833850b1fdfe6da55523"`** 인 것을 알 수 있다.

- Request URL
  > http://localhost:3000/news/delete
- Request body
  없음
- curl
  ```bash
  $ curl -X 'PUT' \
      'http://localhost:3000/news/delete?news_id=6617833850b1fdfe6da55523' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdhYnJpZWwiLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNzEyODE4OTMzLCJleHAiOjE3MTI5MDUzMzN9.wpTXgqz2df2PZZUSP82qgjkXDEFbxzyjfFbfklunzvM' \
      -H 'Content-Type: application/json' \
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": {
      "_id": "6617833850b1fdfe6da55523",
      "title": "[오류수정] 서울시립대 두번째 뉴스",
      "contents": "일부 임직원 누락이 있었고, 퇴사 임직원을 제외합니다. 혼란을 드려서 죄송합니다.",
      "school_id": "66177192d5802453a27ae458",
      "admin_id": "gabriel",
      "create_at": "2024-04-11T06:29:12.650Z",
      "update_at": "2024-04-11T07:28:11.747Z",
      "delete_at": "2024-04-11T07:40:28.654Z",
      "__v": 0
    },
    "timestamp": "2024-04-11 07:40:28"
  }
  ```

바로 위의 Response body를 보면 삭제일자(`"delete_at"`)가 새로 생긴 것을 볼 수 있다.

#### 2.19 [로그인 필요] 학교별 구독 뉴스 리스트 조회

**`[GET] /subscription/news/query-list`**

다시 일반 학생 사용자로 로그인하고 조회.

- Request URL
  > http://localhost:3000/subscription/news/query-list
- Response body
  ```bash
  {
    "success": true,
    "data": [
      {
        "_id": "66178e1b0069def19b19c451",
        "news_id": "66178e1b0069def19b19c44e",
        "is_read": false,
        "title": "서울시립대 네번째 뉴스",
        "admin_id": "gabriel",
        "create_at": "2024-04-11T07:15:39.493Z",
        "update_at": "2024-04-11T07:15:39.493Z"
      }
    ],
    "timestamp": "2024-04-11 07:45:12"
  }
  ```

두번째 뉴스가 삭제되어 리스트에서도 없어진 것을 볼 수 있다.

#### 2.20 [로그인 필요] 구독 뉴스 열람

**`[GET] /subscription/news/read`**

구독함-뉴스번호를 **`subscription_news_id`** 자리에 입력한다. 위의 두번째 뉴스를 입력해보자. 바로 위의 _`2.19 [로그인 필요] 학교별 구독 뉴스 리스트 조회`_ 의 Response body를 보면 **`"_id"`** 프로퍼티의 값 **`"66178e1b0069def19b19c451"`** 이 구독함-뉴스번호다.  
이 API는 요구 사항에는 없었지만 위의 구독 뉴스 리스트에서 특정 뉴스를 클릭하여 내용을 열람하기 위한 API이다. 아래 **`"contents"`** 가 위의 뉴스 목록 API에는 없었지만 여기서는 나타난다.

- Request URL
  > http://localhost:3000/subscription/news/read
- Request body
  없음
- curl
  ```bash
  $ curl -X 'GET' \
      'http://localhost:3000/subscription/news/read?subscription_news_id=66178e1b0069def19b19c451' \
      -H 'accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImphbmUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjgxNzczOSwiZXhwIjoxNzEyOTA0MTM5fQ.bUxhSYWp2VY7pHYtjJGuEAo8z5zA7qFs5k3NvaTgKko'
  ```
- Response body
  ```bash
  {
    "success": true,
    "data": {
      "_id": "66178e1b0069def19b19c451",
      "subscription_id": "66178d430069def19b19c44a",
      "news_id": "66178e1b0069def19b19c44e",
      "is_read": true,
      "subscriber_id": "jane",
      "title": "서울시립대 네번째 뉴스",
      "contents": "서울시립대 2024년 학사 일정",
      "create_at": "2024-04-11T07:15:39.493Z",
      "update_at": "2024-04-11T07:15:39.493Z",
      "admin_id": "gabriel"
    },
    "timestamp": "2024-04-11 07:52:08"
  }
  ```

열람 여부 속성(**`"is_read"`**)값이 true로 바뀐 것을 볼 수 있다. 나중에 학교관리자가 해당 뉴스를 다시 수정하면 이 값이 다시 false로 바뀐다.

### 3. Jest + supertest e2e 테스트

시간 관계상 모든 API를 담을 수는 없었다. 단계적으로 추가할 예정.  
아래는 학생 로그인과 학생 로그인이 필요한 뉴스 목록 조회 API를 테스트하여 정상 통과하는 것을 볼 수 있다.

```bash
$ npm run test:e2e

> school-news-feed-api@0.0.1 test:e2e
> dotenv -- npm run test:e2e:local


> school-news-feed-api@0.0.1 test:e2e:local
> jest --detectOpenHandles --config test/jest.e2e.js

 PASS  test/app.e2e-spec.ts
  app: NestFastifyApplication
    √ 1. Health check >> / (GET) (49 ms)
    √ 2. Login >> /auth/login (POST) (283 ms)
    √ 3. Query subscription-news list (GET) (43 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        5.025 s, estimated 7 s
Ran all test suites.
```
