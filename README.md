# 상품/재고 관리 어드민

상품 목록 조회·검색·필터·정렬·페이지네이션과 등록/수정/삭제(CRUD)를 제공하는 관리자 화면.
백엔드(Express API)는 과제로 제공되었고, 프론트엔드(React)를 구현했다.

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프론트엔드 | React 19, TypeScript, Vite |
| 서버 상태 | TanStack Query (React Query) v5 |
| HTTP | axios |
| 백엔드 (제공됨) | Node.js, Express, TypeScript (tsx) |

## 프로젝트 구조

```
prj/
├── client/                     # 프론트엔드 (React + Vite)
│   ├── index.html
│   ├── vite.config.ts          # /api → http://localhost:4000 프록시 설정
│   └── src/
│       ├── main.tsx            # 진입점 + React Query Provider 설정
│       ├── App.tsx             # 관리자 화면 (목록/필터/폼/페이지네이션)
│       ├── index.css           # 스타일
│       ├── api/
│       │   ├── client.ts       # axios 인스턴스 + 에러 변환 헬퍼
│       │   ├── meta.ts         # 카테고리/상태 목록 조회
│       │   └── products.ts     # 상품 CRUD 호출 래퍼
│       └── types/
│           └── product.ts      # 공유 도메인 타입
│
└── server/                     # 백엔드 API (제공됨)
    └── src/
        ├── index.ts            # Express 앱 + 미들웨어(지연/강제실패 학습장치)
        ├── routes/
        │   ├── products.ts     # /api/products CRUD
        │   └── categories.ts   # /api/categories, /api/statuses
        ├── store.ts            # data.json 기반 파일 저장소
        ├── validation.ts       # 입력값 검증
        ├── seed.ts             # 초기 시드 데이터 (상품 30개)
        └── types.ts            # 서버 도메인 타입
```

## 실행 방법

> 백엔드와 프론트엔드를 각각 다른 터미널에서 실행한다.

```bash
# 1) 백엔드 (포트 4000)
cd server
npm install
npm run dev

# 2) 프론트엔드 (포트 5173)
cd client
npm install
npm run dev
```

브라우저에서 http://localhost:5173 접속. 프론트의 `/api/*` 요청은 Vite 프록시가 `http://localhost:4000` 으로 전달한다.

### 학습용 옵션 (백엔드)

서버는 환경변수로 로딩/에러 상태를 연습할 수 있다.

```bash
LATENCY=0 npm run dev          # 응답 지연 끄기 (기본 400ms)
FAIL_RATE=0.3 npm run dev      # GET 요청을 30% 확률로 500 실패시킴
```

## API 개요

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/products` | 목록 (검색·필터·정렬·페이지네이션 쿼리 지원) |
| GET | `/api/products/:id` | 단일 조회 |
| POST | `/api/products` | 생성 |
| PATCH | `/api/products/:id` | 수정 |
| DELETE | `/api/products/:id` | 삭제 |
| GET | `/api/categories` | 카테고리 목록 |
| GET | `/api/statuses` | 판매 상태 목록 |

## 주요 기능

- 상품명/SKU 검색, 카테고리·상태 필터, 정렬(등록일/가격/재고/이름), 페이지네이션
- 상품 등록/수정 모달 — 서버 검증 에러(400/409, SKU 중복 등)를 입력칸별로 표시
- 삭제(확인 후) 및 변경 시 목록 자동 갱신
- 로딩/에러 상태 처리 및 재시도
