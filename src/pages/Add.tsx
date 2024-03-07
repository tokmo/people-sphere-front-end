import { Page } from '@/components';
import { ProductForm } from '@/features/Products';
import { Link } from 'react-router-dom';

export const Add = () => {
  return (
    <Page title="Add Product">
      <Link to="/">Home</Link>
      <ProductForm />
    </Page>
  );
};
