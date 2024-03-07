import { http, HttpResponse } from 'msw';
import dayjs from 'dayjs';
import { products as productsData } from './data/products';
import { categories as categoriesDate } from './data/categories';
import { ProductType } from '@/features/Products';

const API_URL = import.meta.env.VITE_API_URL;

const products: ProductType[] = [...productsData];
const categories = [...categoriesDate];

export const handlers = [
  //Products
  http.get(`${API_URL}/products`, () => HttpResponse.json(products)),
  http.get(`${API_URL}/product/:id`, (info) => {
    const { id } = info.params;
    const matchingProduct = products.find((product) => product.id === Number(id));

    if (!matchingProduct) {
      return HttpResponse.error();
    }

    return HttpResponse.json(matchingProduct);
  }),
  http.post(`${API_URL}/products`, async (info) => {
    const requestData = await info.request.json();
    if (typeof requestData !== 'object' || requestData === null) {
      return HttpResponse.error();
    }

    const receiptDate = requestData.receiptDate
      ? dayjs(requestData.receiptDate).format('YYYY-MM-DD')
      : null;
    const expirationDate = requestData.expirationDate
      ? dayjs(requestData.expirationDate).format('YYYY-MM-DD')
      : null;

    const responseData = {
      id: products[products.length - 1].id + 1,
      name: '',
      categories: [0],
      ...requestData,
      createdAt: new Date().toISOString(),
      receiptDate,
      expirationDate,
      featured: Number(requestData.rating) > 8 || Boolean(requestData.featured) || false,
    };
    products.push(responseData);

    return HttpResponse.json();
  }),
  http.patch(`${API_URL}/products`, async (info) => {
    const requestData = await info.request.json();

    if (typeof requestData !== 'object' || requestData === null) {
      return HttpResponse.error();
    }

    const index = products.findIndex((product) => product.id === Number(requestData.id));

    products[index] = {
      ...products[index],
      ...requestData,
    };

    return HttpResponse.json({ index });
  }),
  http.delete(`${API_URL}/products/:id`, (info) => {
    const { id } = info.params;
    const index = products.findIndex((product) => product.id === Number(id));
    if (index === -1) {
      return HttpResponse.json();
    }
    products.splice(index, 1);
    return HttpResponse.json({
      success: true,
    });
  }),
  //Categories
  http.get(`${API_URL}/categories`, () => HttpResponse.json(categories)),
];
