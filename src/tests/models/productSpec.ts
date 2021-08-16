import { Product, ProductModel } from '../../models/product';

const productModel = new ProductModel();

const book: Product = {
    id: 1,
    name: 'Book',
    price: 9.99,
    category: 'Readings',
    description: 'You can read it!',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};

const headphone: Product = {
    id: 2,
    name: 'Headphones',
    price: 249.99,
    category: 'Mobile Accessories',
    description: 'Listen to stuff!',
    url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};

const backpack: Product = {
    id: 3,
    name: 'Backpack',
    price: 79.99,
    category: 'Travel',
    description: 'Carry things around town!',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};

describe('Testing Product Model', () => {
    describe('create method', () => {
        it('should successfully add the product to database and return the added product', async () => {
            let result = await productModel.create(book);
            expect(result).toEqual(book);

            result = await productModel.create(headphone);
            expect(result).toEqual(headphone);

            result = await productModel.create(backpack);
            expect(result).toEqual(backpack);
        });
    });

    describe('index method', () => {
        it('should return all availale products', async () => {
            const result = await productModel.index();

            expect(result.length).toEqual(3);
            expect(result).toEqual([book, headphone, backpack]);
        });
    });

    describe('show method', () => {
        it('should return the product details based on the given id', async () => {
            let result = await productModel.show(1);
            expect(result).toEqual(book);

            result = await productModel.show(2);
            expect(result).toEqual(headphone);
        });

        it('should return nothing if invalid product is passed', async () => {
            let result = await productModel.show(12);
            expect(result).toBeUndefined;
        });
    });

    describe('delete method', () => {
        it('should successfully delete the product from db', async () => {
            const result = await productModel.delete(1);
            expect(result).toEqual(1);

            const result1 = await productModel.index();
            expect(result1.length).toEqual(2);
        });

        it('should return 0 as row count if invalid product id passed', async () => {
            const result = await productModel.delete(10);
            expect(result).toEqual(0);
        });
    });

    describe('productsByCategory', () => {
        it('should return the products for given category', async () => {
            const result = await productModel.productsByCategory('Travel');
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(backpack);
        });
    });
});
