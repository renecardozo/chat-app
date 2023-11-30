import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class WinnersService {
  private readonly logger = new Logger(WinnersService.name);
  constructor(private readonly httpService: HttpService) {}


  async findAll(): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(
        catchError((error: AxiosError) => {;
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
