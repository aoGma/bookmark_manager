export interface Response<T> {
  path?: string;
  code: number;
  timestamp?: number;
  success: boolean;
  // 接口success不为true的时候，message给错误提示
  message?: string;
  result?: T;
}
