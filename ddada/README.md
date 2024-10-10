# 따다 프론트

<img src="docs/images/logo.png" alt="따다" width="350" />

## 📅 **프로젝트 기간**

- 2024.08.19 ~ 2024.10.11

## 🙇🏻‍♂️ **팀원소개**

<div align="center">
  
| [전태호](https://github.com/Taehororo) | [최홍석](https://github.com/k-redstone) | [박상우](https://github.com/coolfin) |
| :-----------------------------------: | :-----------------------------------: | :----------------------------------: | 
|<img src="docs/images/profile/taeho.png" width="100">|<img src="docs/images/profile/hongseok.png" width="100">|<img src="docs/images/profile/sangwoo.png" width="100">|
|                  FE                  |              FE, INFRA              |          FE, DESIGN          |

</div>

## 🧑🏻‍💻 개발 관련 기술

### 👩🏻‍🔧 **기술 스택**

#### **Front-end**

<div align=left>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typeScript&amp;logoColor=white" height="35"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&amp;logo=react&amp;logoColor=black" height="35">
  <img src="https://img.shields.io/badge/zustand-FFFFFF?style=for-the-badge&amp;logo=zustand&amp;" height="35"> 
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&amp;logo=axios&amp;logoColor=white" height="35">
  <br/>
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&amp;logo=eslint&amp;logoColor=white" height="35">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white" height="35"> 
  <img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&amp;logo=tailwindcss&amp;logoColor=white" height="35"> 
</div>

### 프로젝트 구조

```
📦src
┣ 📂api
┣ 📂app
┃ ┣ 📂(auth)
┃ ┃ ┣ 📂login
┃ ┃ ┣ 📂reset-password
┃ ┃ ┗ 📂signup
┃ ┣ 📂(main)
┃ ┃ ┣ 📂court-reservation
┃ ┃ ┣ 📂manager-recruit
┃ ┃ ┣ 📂match-reservation
┃ ┃ ┃ ┣ 📂detail
┃ ┃ ┃ ┃ ┗ 📂[matchId]
┃ ┃ ┣ 📂mypage
┃ ┃ ┃ ┣ 📂mymatch
┃ ┃ ┃ ┃ ┣ 📂[matchId]
┃ ┃ ┃ ┣ 📂password-change
┃ ┃ ┃ ┣ 📂playstyle
┃ ┃ ┃ ┣ 📂profile-edit
┃ ┃ ┣ 📂ranking
┃ ┣ 📂(manager)
┃ ┃ ┣ 📂manager
┃ ┃ ┃ ┣ 📂detail
┃ ┃ ┃ ┃ ┗ 📂[gameId]
┃ ┃ ┃ ┣ 📂done
┃ ┃ ┃ ┃ ┗ 📂[gameId]
┃ ┃ ┃ ┣ 📂match
┃ ┃ ┃ ┃ ┗ 📂[gameId]
┃ ┣ 📂dashboard
┃ ┣ 📂racket
┃ ┃ ┣ 📂recommend
┣ 📂components
┃ ┣ 📂CommonModal
┃ ┣ 📂landing
┃ ┣ 📂MainFooter
┃ ┣ 📂MainHeader
┃ ┣ 📂MatchCourtInfo
┃ ┣ 📂MatchRule
┃ ┣ 📂MatchTypeTag
┃ ┗ 📂UserTierWithIcon
┣ 📂constants
┃ ┣ 📂day
┣ 📂features
┃ ┣ 📂auth
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┗ 📂types
┃ ┣ 📂court-reservation
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂constants
┃ ┃ ┗ 📂types
┃ ┣ 📂gym
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂providers
┃ ┃ ┗ 📂types
┃ ┣ 📂landing
┃ ┃ ┗ 📂components
┃ ┣ 📂manager
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂constants
┃ ┃ ┣ 📂hooks
┃ ┃ ┣ 📂stores
┃ ┃ ┣ 📂types
┃ ┃ ┗ 📂utils
┃ ┣ 📂match-reservation
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂constants
┃ ┃ ┗ 📂types
┃ ┣ 📂mypage
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂constants
┃ ┃ ┣ 📂hooks
┃ ┃ ┗ 📂types
┃ ┣ 📂racketRecommend
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂dummy
┃ ┃ ┣ 📂stores
┃ ┃ ┗ 📂types
┃ ┣ 📂ranking
┃ ┃ ┣ 📂api
┃ ┃ ┗ 📂components
┃ ┗ 📂reservationDetail
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂hooks
┃ ┃ ┣ 📂providers
┃ ┃ ┗ 📂utils
┣ 📂hooks
┣ 📂providers
┣ 📂static
┃ ┣ 📂fonts
┃ ┗ 📂imgs
┗ 📂types
┃ ┗ 📂user
```

## ⚒️ **기능 시연**

### 1. Auth

<details>
<summary>로그인 화면</summary>  
<img src="docs/images/auth/login.png" height="300" width="200">
</details>
<details>
<summary>회원가입</summary>  
<img src="docs/images/auth/signup.gif" height="300" width="200">
</details>

### 2. 메인

<details>
<summary>랜딩 페이지</summary>
<img src="docs/images/main/landing.gif" width="500">
</details>

### 3. 플립북

<details>
<summary>플립북 기능 시연</summary>
플립북 기능에 관련된 화면들입니다:
- **01 안내문 모달**  
  플립북의 안내문 모달 화면입니다.  
  <img src="docs/images/project/flipbook01.png" width="500">
- **02 친구 초대**  
  친구를 초대하는 화면입니다.  
  <img src="docs/images/project/flipbook02.png" width="500">
- **03 배경 선택**  
  플립북의 배경을 선택하는 화면입니다.  
  <img src="docs/images/project/flipbook_background.png" width="500">
- **04 플립북 제작**  
  플립북을 제작하는 화면입니다.  
  <img src="docs/images/project/flipbook_make.png" width="500">
</details>

### 4. 마이페이지

<details>
<summary>마이페이지</summary>
마이페이지의 디자인을 보여줍니다.  
<img src="docs/images/project/mypage.png" width="500">
</details>
