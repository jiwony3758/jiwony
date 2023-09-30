export interface IRequestOption {
  readonly method: string;
  readonly url: string;
  readonly headers?: any;
  readonly body?: any;
  readonly next?: NextFetchRequestConfig;
  readonly cache?: RequestCache;
}

export interface IHttp {
  request(requestOption: IRequestOption): Promise<any>;
}

interface IHttpError {
  statusCode: number;
  message: string;
}

interface IHttpErrorParam {
  statusCode: number;
  message: string;
}

export class HttpError implements IHttpError{
  readonly statusCode: number;
  readonly message: string;
  constructor({statusCode, message}: IHttpErrorParam){
    this.statusCode = statusCode;
    this.message = message;
  }
}

class Http implements IHttp {
  async request(requestOption: IRequestOption): Promise<any> {
      const option: RequestInit = {method: requestOption.method};
      if (requestOption?.headers)
          option.headers = new Headers(requestOption.headers);
      if (requestOption?.body)
          option.body = JSON.stringify(requestOption.body);

      try {
          const res = await fetch(requestOption.url, requestOption);
          if(res.ok){
            return await res.json();
          }
          throw new HttpError({
            statusCode: res?.status ?? 500,
            message: res?.statusText ?? "알 수 없는 에러입니다."
          });
      } catch (e) {
          return e;
      }
  }
}

export const http = new Http();
