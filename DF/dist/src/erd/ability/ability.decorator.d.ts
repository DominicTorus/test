export interface RequiredRule {
    action: String;
    subject: String;
}
export declare const CHECK_ABILITY = "check-ability";
export declare const CheckAbilities: (...requirements: RequiredRule[]) => import("@nestjs/common").CustomDecorator<string>;
