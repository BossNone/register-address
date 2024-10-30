import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DupeAddressDocument = HydratedDocument<DupeAddress>;

@Schema({
    versionKey: false,
    collection: 'DupeAddress',
})
export class DupeAddress {

    @Prop()
    location_code: number

    @Prop({ index: true })
    province_th: string

    @Prop({ index: true })
    province_en: string

    @Prop()
    name: string

    @Prop({ index: true })
    district_th: string

    @Prop({ index: true })
    district_en: string

    @Prop({ index: true })
    sub_district_th: string

    @Prop({ index: true })
    sub_district_en: string

    @Prop({ index: true })
    postal_code: number

    @Prop()
    remark: string

    @Prop()
    dup_postal_code: boolean

}

export const DupeAddressSchema = SchemaFactory.createForClass(DupeAddress);