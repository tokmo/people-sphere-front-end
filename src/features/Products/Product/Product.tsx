import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  CloseButton,
} from 'reactstrap';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ProductType, useDeleteProductMutation } from '../';
import { CategoryType } from '@/features/Categories';

interface ProductWithCategories extends Omit<ProductType, 'categories'> {
  categories: CategoryType[];
}

interface ProductProps {
  product: ProductWithCategories;
}

const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

const formatDate = (date: string | Date | null, format: string): string => {
  return date ? dayjs(date).format(format) : '-';
};

export const Product: React.FC<ProductProps> = React.memo(({ product }) => {
  const receiptDate = formatDate(product.receiptDate, shortDateFormat);
  const expirationDate = formatDate(product.expirationDate, shortDateFormat);
  const createdAt = formatDate(product.createdAt, longDateFormat);

  const [deleteProductMutation] = useDeleteProductMutation();

  return (
    <Card>
      <CardBody>
        <CardTitle className="d-flex align-items-center justify-content-between">
          <Link to={`/edit/${product.id}`}>{product.name}</Link>
          <CloseButton onClick={() => deleteProductMutation(product.id)} />
        </CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map((category, i) => (
                  <li key={i}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
});
