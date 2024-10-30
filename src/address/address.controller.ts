import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { AllListQuery } from 'src/query/getAllListQuery';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Get('all-list')
  async getAllList(@Query() options: AllListQuery) {
    return await this.addressService.getAllList(options);
  }
}
