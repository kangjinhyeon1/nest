import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { SignUpRequestDto } from 'src/dto/request/signup.dto';
import { SignUpResponseDto } from 'src/dto/response/signUp.dto';
import { UserEntity } from 'src/model/user.entity';
import { Repository } from 'typeorm';
// import { hashSync } from 'bcrypt';
// import { RequestDto } from './dto/request.dto';

@Injectable()
export class UserService {
    // 기본 db없이 post요청 보내기
    // async posting(body: RequestDto){
    //     const {name, email, password} = body

    //     const hashed = await hashSync(password, 10)

    //     return{
    //         name,
    //         email,
    //         password: hashed
    //     }
    // }

    constructor (
        @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    ){}

    async signUp(signUpDto: SignUpRequestDto): Promise<SignUpResponseDto>{
        const {email, name, password, birth} = signUpDto

        const isExistEmail = await this.userEntity.findOneBy({email})
        if(!isExistEmail) throw new ConflictException();

        const hashed = hashSync(password, process.env.SALT)

        await this.userEntity.save({
            email,
            name,
            password: hashed,
            birth
        })

        return{
            email,
            name,
            birth
        }
    }
}
