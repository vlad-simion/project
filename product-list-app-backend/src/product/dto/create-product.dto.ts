export class CreateProductDTO {
    readonly name: string;
    readonly code: string;
    readonly weight: number;
    readonly price: number;
    readonly color: string;
    readonly isDeleted: boolean;
}