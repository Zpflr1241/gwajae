# server — 상품 관리 API

학습용 백엔드입니다. **Express + TypeScript**, 데이터는 `data.json` 파일에 영속화합니다.
(DB 설치 불필요. 프론트 학습에 집중하기 위해 최대한 단순화했습니다.)

## 실행

```bash
npm install
npm run dev      # http://localhost:4000 (파일 변경 시 자동 재시작)
```

처음 실행 시 `data.json`이 시드(상품 30개)로 생성됩니다. 지우면 다음 실행 때 다시 만들어집니다.

## 학습용 환경변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `PORT` | 4000 | 포트 |
| `LATENCY` | 400 | 모든 응답 지연(ms). 로딩 상태 체험용. `0`이면 끔 |
| `FAIL_RATE` | 0 | GET 요청을 이 확률로 500 실패. 에러 처리 연습용 (예: `0.2`) |

PowerShell 예시:
```powershell
$env:FAIL_RATE=0.2; npm run dev
```

## API

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/products` | 목록 (search, category, status, sort, order, page, pageSize) |
| GET | `/api/products/:id` | 단건 조회 |
| POST | `/api/products` | 생성 |
| PATCH | `/api/products/:id` | 수정 (상태 변경 포함) |
| DELETE | `/api/products/:id` | 삭제 |
| GET | `/api/categories` | 카테고리 목록 |
| GET | `/api/statuses` | 상태 목록(라벨 포함) |
| GET | `/api/health` | 헬스체크 |

### 목록 응답 예
```json
{ "items": [ /* Product[] */ ], "total": 30, "page": 1, "pageSize": 10 }
```

### 검증 실패 응답 예 (400 / 409)
```json
{ "message": "입력값을 확인해 주세요.",
  "errors": [{ "field": "sku", "message": "SKU 형식은 영문 2자-숫자 4자 입니다. 예: EL-1001" }] }
```

## 구조

```
src/
├─ index.ts            Express 앱 + 미들웨어 + 라우트 연결
├─ routes/
│  ├─ products.ts      목록(검색/필터/정렬/페이징) + CRUD
│  └─ categories.ts    카테고리/상태 메타 정보
├─ validation.ts       입력값 검증 (프론트와 규칙 일치)
├─ store.ts            data.json 읽기/쓰기
├─ seed.ts             시드 데이터
└─ types.ts            도메인 타입
```
