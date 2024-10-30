import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class AllListQuery {

    @ApiProperty({ required: true, minLength: 5, maxLength: 5, description: 'Thailand Postal Code 5 digits', example: '10100'})
    @IsString()
    @IsNotEmpty()
    postalCode: string

    @ApiProperty({ required: false, description: 'Thailand Province(Please use value from list that API provide)', example: 'กรุงเทพมหานคร'})
    @IsString()
    @IsOptional()
    province: string

    @ApiProperty({ required: false, description: 'Thailand District(Please use value from list that API provide)\n prefix for province "กรุงเทพมหานคร" is "เขต" || prefix for others province is "อำเภอ"', example: 'เขตป้อมปราบศัตรูพ่าย'})
    @IsString()
    @IsOptional()
    district: string

    @ApiProperty({ required: false, description: 'Thailand Subdistrict(Please use value from list that API provide)', example: 'ป้อมปราบ'})
    @IsString()
    @IsOptional()
    subdistrict: string
}