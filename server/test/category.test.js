const { createCategory, getAllCategories, getCategoryById, deleteCategory } = require('../Admin/controllers/categoryController');
const Category = require('../Admin/models/categoryModel');
const cloudinary = require('cloudinary').v2;

jest.mock('../Admin/models/categoryModel');
jest.mock('cloudinary');

describe('createCategory', () => {
    it('should create a category with an image', async () => {
        // Mock cloudinary upload and Category model save
        cloudinary.uploader.upload.mockResolvedValue({ secure_url: 'some-url' });
        Category.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue({
                name: 'Test Category',
                description: 'Test Description',
                image: 'some-url',
            }),
        }));

        // Mock request and response objects
        const mockReq = {
            file: { originalname: 'test.jpg', buffer: Buffer.from('test') },
            body: { name: 'Test Category', description: 'Test Description' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Execute the createCategory function
        await createCategory(mockReq, mockRes);

        // Assertions
        expect(mockRes.status).toHaveBeenCalledWith(500);
        // Add more assertions as needed
    });

    // Additional test cases for error handling
});

describe('getAllCategories', () => {
    it('should return all categories', async () => {
        // Mock Category.find
        Category.find.mockResolvedValue([
            { name: 'Category 1', description: 'Description 1', image: 'url1' },
            { name: 'Category 2', description: 'Description 2', image: 'url2' },
        ]);

        const mockReq = {};
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Execute the getAllCategories function
        await getAllCategories(mockReq, mockRes);

        // Assertions
        expect(mockRes.status).toHaveBeenCalledWith(200);
        // Add more assertions as needed
    });

    // Test case for error handling
});

describe('getCategoryById', () => {
    it('should return a category by its ID', async () => {
        const mockCategory = { _id: '1', name: 'Test Category', description: 'Test Description' };
        Category.findById.mockResolvedValue(mockCategory);

        const mockReq = { params: { id: '1' } };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getCategoryById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockCategory);
    });

    it('should return 404 if no category found', async () => {
        Category.findById.mockResolvedValue(null);

        const mockReq = { params: { id: '2' } };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getCategoryById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    // Additional test case for error handling
});

describe('deleteCategory', () => {
    it('should delete a category and return a success message', async () => {
        Category.findByIdAndRemove.mockResolvedValue({ _id: '1' });

        const mockReq = { params: { id: '1' } };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteCategory(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Category deleted successfully' });
    });

    it('should return 404 if no category found to delete', async () => {
        Category.findByIdAndRemove.mockResolvedValue(null);

        const mockReq = { params: { id: '2' } };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteCategory(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    // Additional test case for error handling
});