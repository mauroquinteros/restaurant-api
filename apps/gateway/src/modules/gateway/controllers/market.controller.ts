import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('market')
export class MarketController {
  constructor(@Inject('MARKET_SERVICE') private client: ClientProxy) {}

  @Get('purchases')
  async getPurchases() {
    const purchases = await lastValueFrom(
      this.client.send({ cmd: 'get_purchases' }, {}),
    );
    return purchases;
  }
}
