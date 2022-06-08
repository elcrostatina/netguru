import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class HttpHelper {
  public async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    return (await response.json()) as T;
  }
}
