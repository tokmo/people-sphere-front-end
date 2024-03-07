import { Page } from '@/components';
import { ProductForm, useGetProductQuery } from '@/features/Products';
import { Link, useParams } from 'react-router-dom';

export const Update = () => {
  const { id } = useParams();
  const { data: product } = useGetProductQuery(Number(id));

  return (
    <Page title="Update Product">
      <Link to="/">Home</Link>
      <ProductForm product={product} />
    </Page>
  );
};
