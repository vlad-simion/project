import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    // Retrieve products list
    @Get('products')
    async getAllProduct(@Res() res) {
        const products = await this.productService.getAllProduct();
        return res.status(HttpStatus.OK).json(products);
    }

    // Fetch a particular product using ID
    @Get('product/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json(product);

    }

    // add a product
    @Post('/create')
    async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.addProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: "Product has been created successfully",
            product
        })
    }

    // Update a product's details
    @Put('/update')
    async updateProduct(@Res() res, @Query('productID') productID, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.updateProduct(productID, createProductDTO);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product has been successfully updated',
            product
        });
    }

    // Delete a product
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const product = await this.productService.deleteProduct(productID);
        if (!product) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product has been deleted',
            product
        })
    }
}
