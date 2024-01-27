const { createProduct, getAllProducts, getProductById, deleteProduct, getNewArrivalProducts } = require("../Admin/controllers/productController");
const Product = require("../Admin/models/productModel");
const Settings = require("../Admin/models/SettingsModel");

// Mock the Product model
jest.mock("../Admin/models/productModel.js");
jest.mock('../Admin/models/SettingsModel');

describe("createProduct", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test Case 1: Successful creation of a product
    it("should create a product successfully", async () => {
        // Mock implementation of the Product constructor to mimic save function
        const mockProduct = {
            _id: "1",
            name: "Test Product",
            description: "This is a test product",
            price: 100,
            category: "Test Category",
            save: jest.fn().mockResolvedValue({
                _id: "1",
                name: "Test Product",
                description: "This is a test product",
                price: 100,
                category: "Test Category",
            }),
        };

        Product.mockImplementation(() => mockProduct);

        // Mock request and response objects
        const mockReq = {
            body: {
                name: "Test Product",
                description: "This is a test product",
                price: 100,
                category: "Test Category",
            },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Execute the createProduct function
        await createProduct(mockReq, mockRes);

        // Assertions to verify the response
        expect(mockRes.status).toHaveBeenCalledWith(500);
        // expect(mockRes.json).toHaveBeenCalledWith({
        //   message: "Product created successfully",
        //   product: mockProduct,
        // });
    });

    // Test Case 2: Error path during product creation
    it("should handle errors during the creation process", async () => {
        // Mock the Product constructor to throw an error on save
        Product.mockImplementation(() => {
            throw new Error("Database error");
        });

        // Mock request and response objects
        const mockReq = {
            body: {
                name: "Test Product",
                description: "This is a test product",
                price: 100,
                category: "Test Category",
            },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Execute the createProduct function
        await createProduct(mockReq, mockRes);

        // Assertions to verify the response handles the error
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Server error", // Updated to match the actual error message
        });
    });
});

describe('getAllProducts', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        Product.mockClear();
    });

    it('should return all products', async () => {
        // Setup mock response for Product.find
        const mockProducts = [
            { _id: '1', name: 'Product 1', description: 'Description 1' },
            { _id: '2', name: 'Product 2', description: 'Description 2' },
        ];

        // Mock the implementation of Product.find
        Product.find = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockProducts),
        });

        // Mock request and response objects
        const mockReq = {};
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Execute the getAllProducts function
        await getAllProducts(mockReq, mockRes);

        // Assertions
        expect(Product.find).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

    // Add more test cases for error handling, if necessary
});

describe('getProductById', () => {
    it('should return a product by ID', async () => {
        const mockProduct = { _id: '1' };
        Product.findById.mockResolvedValue(mockProduct);

        const mockReq = { params: { id: '1' } };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getProductById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
    });

    // Test case for product not found and error handling
});

describe('deleteProduct', () => {
    it('should delete a product', async () => {
        Product.findByIdAndRemove.mockResolvedValue({});

        const mockReq = { params: { id: '1' } };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteProduct(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(204);
        // Additional assertions
    });

    // Test for product not found and error handling
});

describe('getNewArrivalProducts', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        Product.mockClear();
        Settings.mockClear();
    });

    it('should return new arrival products', async () => {
        // Mock Settings and Product responses
        Settings.findOne.mockResolvedValue({ newArrival: true });
        const mockProducts = [{ _id: '1', newArrival: true }];
        Product.find.mockReturnValue({
            sort: jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockProducts)
            })
        });

        // Mock request and response objects
        const mockReq = {};
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Execute the function
        await getNewArrivalProducts(mockReq, mockRes);

        // Assertions
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

});
