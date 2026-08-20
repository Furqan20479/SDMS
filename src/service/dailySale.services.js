import BaseService from "./base.services.js";
import DailySale from "../model/dailySale.schema.js";
import Product from "../model/product.schema.js";

class DailySaleServices extends BaseService {

    constructor() {
        super(DailySale);
    }

    addSale = async (data) => {

        if (!data.products || data.products.length === 0) {
            throw new Error("At least one product is required");
        }

        // Same product duplicate check
        const productIds = data.products.map(item =>
            item.product.toString()
        );

        const uniqueProducts = new Set(productIds);

        if (uniqueProducts.size !== productIds.length) {
            throw new Error("Same product cannot be added twice");
        }

        // Get products from database
        const products = await Product.find({
            _id: { $in: productIds }
        });

        if (products.length !== productIds.length) {
            throw new Error("One or more products not found");
        }

        // Calculate total pieces and amount
        let totalPieces = 0;
        let amount = 0;

        data.products.forEach(item => {

            const product = products.find(
                p => p._id.toString() === item.product.toString()
            );

            const pieces = Number(item.pieces);

            if (pieces < 1) {
                throw new Error("Pieces must be greater than 0");
            }

            totalPieces += pieces;

            amount += product.price * pieces;
        });

        const saleData = {
            ...data,
            totalPieces,
            amount
        };

        return await this.add(saleData);
    };


    getSale = async (filter = {}) => {

        return await this.service
            .find(filter)
            .populate("products.product");
    };


    getById = async (id) => {

        return await this.service
            .findById(id)
            .populate("products.product");
    };


    updateSale = async (id, data) => {

        if (!data.products || data.products.length === 0) {
            throw new Error("At least one product is required");
        }

        const productIds = data.products.map(item =>
            item.product.toString()
        );

        const uniqueProducts = new Set(productIds);

        if (uniqueProducts.size !== productIds.length) {
            throw new Error("Same product cannot be added twice");
        }

        const products = await Product.find({
            _id: { $in: productIds }
        });

        if (products.length !== productIds.length) {
            throw new Error("One or more products not found");
        }

        let totalPieces = 0;
        let amount = 0;

        data.products.forEach(item => {

            const product = products.find(
                p => p._id.toString() === item.product.toString()
            );

            const pieces = Number(item.pieces);

            if (pieces < 1) {
                throw new Error("Pieces must be greater than 0");
            }

            totalPieces += pieces;

            amount += product.price * pieces;
        });

        const updatedData = {
            ...data,
            totalPieces,
            amount
        };

        return await this.update(id, updatedData);
    };


    deleteSale = async (id) => {

        return await this.delete(id);
    };
}

export default new DailySaleServices();