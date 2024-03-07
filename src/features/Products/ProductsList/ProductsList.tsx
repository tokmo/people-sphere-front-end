import { Container, Row, Col } from 'reactstrap';
import { Product, ProductType, useGetProductsQuery } from '..';
import { chunk } from '@/utils';
import { CategoryType, useGetCategoriesQuery } from '@/features/Categories';

export const ProductsList: React.FC = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetProductsQuery();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategoriesQuery();

  if (isLoadingProducts || isLoadingCategories) return <div>Loading...</div>;
  if (isErrorProducts || !products || isErrorCategories || !categories) return <div>Error</div>;

  const getProductsWithCategories = (products: ProductType[], categories: CategoryType[]) =>
    products.map((product) => ({
      ...product,
      categories: product.categories.map((categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category || { id: 0, name: '' };
      }),
    }));

  const productsWithCategories = getProductsWithCategories(products, categories);

  return (
    <Container>
      {chunk(productsWithCategories, 3).map((productsGroup, index) => (
        <Row key={index} className="mb-5">
          {productsGroup.map((product) => (
            <Col sm="4" key={product.id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
