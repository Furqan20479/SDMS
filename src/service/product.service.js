
import BaseService from "./base.services.js";
import Product from "../model/product.schema.js";

class ProductService extends BaseService {

    constructor() {
        super(Product);
    }

    // Create Product
    addProduct = async (data) => {

        const { name, flavour, gram } = data;

        const existingProduct = await this.service.findOne({
            name,
            flavour,
            gram
        });

        if (existingProduct) {
            throw new Error(
                "Product with same name, flavour and gram already exists"
            );
        }

        return await this.add(data);
    };


    // Get All Products
    getProducts = async (filter = {}) => {
        return await this.get(filter);
    };


    // Get Single Product
    getProductById = async (id) => {

        const product = await this.service.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    };


    // Update Product
    updateProduct = async (id, data) => {

        const product = await this.getProductById(id);

        if (data.name || data.flavour || data.gram) {

            const name = data.name ?? product.name;
            const flavour = data.flavour ?? product.flavour;
            const gram = data.gram ?? product.gram;

            const duplicate = await this.service.findOne({
                name,
                flavour,
                gram,
                _id: { $ne: id }
            });

            if (duplicate) {
                throw new Error(
                    "Another product with same name, flavour and gram already exists"
                );
            }
        }

        return await this.update(id, data);
    };


    // Delete Product
    deleteProduct = async (id) => {

        await this.getProductById(id);

        return await this.delete(id);
    };


    // Search Products
    searchProducts = async (search) => {

        if (!search) {
            return await this.get();
        }

        const filter = {
            $or: [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    flavour: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        };

        return await this.get(filter);
    };
}

export default new ProductService();

