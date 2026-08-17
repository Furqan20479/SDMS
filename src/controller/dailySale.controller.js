import dailySaleServices from "../service/dailySale.services.js";

class DailySaleController {

    addSale = async (req, res) => {
        try {
            const sale = await dailySaleServices.addSale(req.body);

            return res.status(201).json({
                msg: "Sale Added",
                data: sale
            });

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    };

    getSale = async (req, res) => {
        try {
            const sale = await dailySaleServices.getSale(req.body);

            return res.status(200).json({
                msg: "Sales Found",
                data: sale
            });

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    };

    getById = async (req, res) => {
        try {
            const sale = await dailySaleServices.getById(req.params.id);

            return res.status(200).json({
                msg: "Sale Found",
                data: sale
            });

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    };

    updateSale = async (req, res) => {
        try {
            const updatedSale = await dailySaleServices.updateSale(
                req.params.id,
                req.body
            );

            return res.status(200).json({
                msg: "Sale Updated",
                data: updatedSale
            });

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    };

    deleteSale = async (req, res) => {
        try {
            const deletedSale = await dailySaleServices.deleteSale(
                req.params.id
            );

            return res.status(200).json({
                msg: "Sale Deleted",
                data: deletedSale
            });

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    };
}

export default new DailySaleController();