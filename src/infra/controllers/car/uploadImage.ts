import {
  Controller,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'

import { domain } from '@/domain/common/ioc'
import { UploadCarImageUsecase } from '@/domain/usecases'
import { FileInterceptor } from '@nestjs/platform-express'
import { uploadCarImageDto } from '@/infra/dto'

@Controller('car')
export class UploadCarImageController {
  constructor(
    @Inject(domain.usecases.car.uploadFile)
    private readonly uploadCarImageUsecase: UploadCarImageUsecase
  ) {}

  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg'
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    return await this.uploadCarImageUsecase.execute(
      uploadCarImageDto.parse(file)
    )
  }
}
