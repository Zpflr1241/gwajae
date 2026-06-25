// axios 인스턴스(baseURL: '/api') + 에러메시지 변환 헬퍼
import axios from 'axios'

export const api = axios.create({
    baseURL: '/api',
    timeout: 10_000
});

// 서버 코드를 보고 어떤 에러가 오는지 보는게 좋음

export function getErrorMessage(error: unknown): string { // 에러메시지 반환 헬퍼
    if(axios.isAxiosError(error)){
        if(error.response){
            // data 타입을 명시하여 컴파일 단에서 거를 수 있음.
            // data는 any 타입이므로 data의 타입을 { message?: string } | undefined 로 변환한다.
            // ?? fallback을 까먹어도 컴파일러가 거부하므로 더 안전하다.
            return error.response.data?.message ?? "요청 처리 중 에러 발생";
        }
        else {
            if(error.code === "ECONNABORTED")
                return "타임아웃";
            if(error.code === "ERR_NETWORK")
                return "네트워크 문제";
        }
        return error.message ?? "알 수 없는 에러";
    }
    return "알 수 없는 에러";
}

// 400/409 응답의 errors 배열을 { 필드명: 메시지 } 맵으로 변환한다.
// 폼에서 각 입력칸 밑에 에러 문구를 띄울 때 사용.
export function getFieldErrors(error: unknown): Record<string, string> {
    const result: Record<string, string> = {};
    if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors as
            | Array<{ field?: string; message?: string }>
            | undefined;
        if (Array.isArray(errors)) {
            for (const e of errors) {
                if (e.field && e.message) result[e.field] = e.message;
            }
        }
    }
    return result;
}