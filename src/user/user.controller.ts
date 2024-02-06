import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from 'src/dto/request/signup.dto';
import { RequestDto } from './dto/request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post()
    // async posting(@Body() body: RequestDto){
    //     const data = await this.userService.posting(body)

    //     return{
    //         data,
    //         statusCode: 201,
    //         statusMassgee: "성공!"
    //     }
    // }
    async signUp(signUpDto: SignUpRequestDto){
        const data = await this.userService.signUp(signUpDto)

        return{
            data,
            statusCode: 201,
            statusMassgee: "성공!"
        }
    }
}
