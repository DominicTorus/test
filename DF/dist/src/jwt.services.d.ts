import { JwtService } from '@nestjs/jwt';
export declare class JwtServices {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    decodeToken(token: string): any;
}
