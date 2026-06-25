import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.js';
import { metaRouter } from './routes/categories.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// --- 미들웨어 ---
app.use(cors()); // 프론트(5173)에서 호출할 수 있게 CORS 허용
app.use(express.json()); // JSON 요청 본문 파싱

// 학습용: 모든 응답을 의도적으로 살짝 지연시켜 "로딩 상태"를 체감하게 한다.
// 환경변수 LATENCY=0 으로 끌 수 있다.
const LATENCY = Number(process.env.LATENCY ?? 400);
if (LATENCY > 0) {
  app.use((_req, _res, next) => setTimeout(next, LATENCY));
}

// 학습용: FAIL_RATE=0.2 처럼 주면 그 확률로 500 을 던져 에러 처리를 연습할 수 있다.
const FAIL_RATE = Number(process.env.FAIL_RATE ?? 0);
if (FAIL_RATE > 0) {
  app.use((req, res, next) => {
    // 조회(GET)만 가끔 실패시켜 무한 재시도 사고를 막는다.
    if (req.method === 'GET' && Math.random() < FAIL_RATE) {
      return res.status(500).json({ message: '서버 오류가 발생했습니다. (학습용 강제 실패)' });
    }
    next();
  });
}

// --- 라우트 ---
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', metaRouter);
app.use('/api/products', productsRouter);

// 404
app.use((_req, res) => res.status(404).json({ message: '존재하지 않는 경로입니다.' }));

app.listen(PORT, () => {
  console.log(`\n  상품 관리 API 서버 실행 중 → http://localhost:${PORT}`);
  console.log(`  - 지연(LATENCY): ${LATENCY}ms, 강제 실패율(FAIL_RATE): ${FAIL_RATE}`);
  console.log(`  - 헬스체크: http://localhost:${PORT}/api/health\n`);
});
