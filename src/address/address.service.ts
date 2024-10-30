import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AllListQuery } from 'src/query/getAllListQuery';
import { DupeAddress, DupeAddressDocument } from 'src/schema/address.schema';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(DupeAddress.name, 'CommonDB') private addressModel: Model<DupeAddressDocument>
    ) { }

    async getAllList(options: AllListQuery) {

        let aggregate: any = [];
        let match: any;
        let provinceListTH = [];
        let provinceListEN = [];
        let districtListTH = [];
        let districtListEN = [];
        let subdistrictListTH = [];
        let subdistrictListEN = [];

        match = {
            $match: {
                'postal_code': Number(options.postalCode)
            }
        }

        aggregate.push(match)

        if (!options.province && !options.district && !options.subdistrict) {
            const data = await this.addressModel.aggregate(aggregate);
            console.log(data)
            this.populateLists(data, provinceListTH, provinceListEN, districtListTH, districtListEN, subdistrictListTH, subdistrictListEN);

            return {
                message: 'success',
                results: {
                    province_th: provinceListTH,
                    district_th: districtListTH,
                    sub_district_th: subdistrictListTH,
                    province_en: provinceListEN,
                    district_en: districtListEN,
                    sub_district_en: subdistrictListEN
                }
            }
        } else {

            if (options.province) {
                match = {
                    $match: {
                        $or: [
                            { 'province_th': options.province },
                            { 'province_en': options.province }
                        ]
                    }
                }
                aggregate.push(match)
            }
            if (options.district) {
                match = {
                    $match: {
                        $or: [
                            { 'district_th': options.district },
                            { 'district_en': options.district }
                        ]

                    }
                }
                aggregate.push(match)
            }
            if (options.subdistrict) {
                match = {
                    $match: {
                        $or: [
                            { 'sub_district_th': options.subdistrict },
                            { 'sub_district_en': options.subdistrict }
                        ]

                    }
                }
                aggregate.push(match)
            }

            const data = await this.addressModel.aggregate(aggregate)
            this.populateLists(data, provinceListTH, provinceListEN, districtListTH, districtListEN, subdistrictListTH, subdistrictListEN);
            return {
                message: 'success',
                results: {
                    province_th: provinceListTH,
                    district_th: districtListTH,
                    sub_district_th: subdistrictListTH,
                    province_en: provinceListEN,
                    district_en: districtListEN,
                    sub_district_en: subdistrictListEN
                }
            }
        }
    }

    populateLists(data, provinceListTH, provinceListEN, districtListTH, districtListEN, subdistrictListTH, subdistrictListEN) {
        for (const items of data) {
            if (!provinceListTH.includes(items.province_th)) {
                provinceListTH.push(items.province_th);
            }
            if (!provinceListEN.includes(items.province_en)) {
                provinceListEN.push(items.province_en);
            }
            if (!districtListTH.includes(items.district_th)) {
                districtListTH.push(items.district_th);
            }
            if (!districtListEN.includes(items.district_en)) {
                districtListEN.push(items.district_en);
            }
            if (!subdistrictListTH.includes(items.sub_district_th)) {
                subdistrictListTH.push(items.sub_district_th);
            }
            if (!subdistrictListEN.includes(items.sub_district_en)) {
                subdistrictListEN.push(items.sub_district_en);
            }
        }
    }
}
