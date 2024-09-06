export interface Response<T> {
    path?: string;
    code: number;
    timestamp?: number;
    success: boolean;
    message?: string;
    result?: T;
}
