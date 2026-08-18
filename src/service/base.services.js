class BaseService {

    constructor(service) {
        this.service = service;
    }

    add = async (data) => {
        const result = await this.service.create(data);
        return result;
    };

    get = async (filter = {}) => {
        const data = await this.service.find(filter);
        return data;
    };
    getById = async (id) => {
    const data = await this.service.findById(id);
    return data;
};

    update = async (id, data) => {
        const updatedData = await this.service.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!updatedData) {
            console.log("Update Fail");
        }

        return updatedData;
    };

    delete = async (id) => {
        const deletedData = await this.service.findByIdAndDelete(id);

        if (!deletedData) {
            console.log("Delete Fail");
        }

        return deletedData;
    };
}

export default BaseService;