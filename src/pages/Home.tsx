import { Page } from '@/components';
import { ProductsList } from '@/features/Products';

export const Home = () => {
  return (
    <Page title="Products">
      <ProductsList />
    </Page>
  );
};
