import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DupeAddress, DupeAddressSchema } from 'src/schema/address.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: DupeAddress.name, schema: DupeAddressSchema }
  ], 'CommonDB')
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule { }
