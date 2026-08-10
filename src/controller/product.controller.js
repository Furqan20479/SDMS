import productService from "../service/product.service.js";

class ProductController {
  addProduct = async (req, res) => {
    try {
      const product = await productService.addProduct(req.body);
      res.status(201).json({ msg: "Product Created", data:product });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Addition Error",
      });
    }
  };

  getProduct = async(req,res)=>{
    try {
        const products = await productService.getProducts();
        res.status(200).json({
            msg:"Products Found", data:products
        });
    } catch (error) {
        res.status(400).json({
        message: error.message || "Addition Error",
      });
    }

  };
  getProductById = async(req,res)=>{

    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json({
            msg:"Product Found", data:product
        });
    } catch (error) {
          res.status(400).json({
        message: error.message || "Addition Error",
      });
    }
  };
  updateProduct = async(req,res)=>{
    try {
        const updated = await productService.updateProduct(req.params.id, req.body);
        if(!updated) return res.status(400).json({msg:"updation failed"});
        res.status(201).json({msg:"Successfully updated", data:updated});
        
    } catch (error) {
         res.status(400).json({
        message: error.message || "Addition Error",
      });
    }
  };
  deleteProduct = async(req,res)=>{
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if(!deleted) return res.status(400).json({msg:"delete failed"});
        res.status(200).json({ message: "Product deleted successfully", data:deleted });
    } catch (error) {
          res.status(400).json({
        message: error.message || "Addition Error",
      });
    }
  };
}

export default new ProductController();


