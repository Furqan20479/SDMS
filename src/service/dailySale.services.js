import BaseService from "./base.services.js";
import DailySale from "../model/dailySale.schema.js";

class DailySaleServices extends BaseService{
    constructor(){
        super(DailySale);
    }

    addSale = async(data)=>{
        return await this.add(data);
    };
  getSale = async (filter = {}) => {
    return await this.service.find(filter).populate("product");
};

getById = async (id) => {
    return await this.service.findById(id).populate("product");
};
    updateSale = async(id,data)=>{
        const updatedSale = await this.update(id,data);
        if(!updatedSale){
            console.log("Updation Failed");
        }
        return updatedSale;
    };
    deleteSale = async(id)=>{
        const deletedSale = await this.delete(id);
        if(!deletedSale){
            console.log("Deletion Failed");
        }
        return deletedSale;
            
    }
}

export default new DailySaleServices();
