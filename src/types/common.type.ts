export interface ResponseBodyType {
  code: number; // 서비스 정의 코드
  statusCode: number; // HTTP 상태 코드
  timestamp: string;
  message?: string; // 상세 에러 메시지
  error?: string; // Error 클래스 메시지
}
