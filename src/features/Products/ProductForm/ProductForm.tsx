import { repeat } from '@/utils';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
//zod schema
import { ProductType, productSchema, useAddProductMutation, useUpdateProductMutation } from '..';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCategoriesQuery } from '@/features/Categories';
import { useNavigate } from 'react-router-dom';

interface ProductFormProps {
  product?: ProductType;
}

type FormValues = z.infer<typeof productSchema>;

export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    values: {
      name: product?.name || '',
      brand: product?.brand || '',
      rating: product?.rating || undefined,
      categories: product?.categories || [],
      itemsInStock: product?.itemsInStock || undefined,
      expirationDate: product?.expirationDate ? new Date(product.expirationDate) : undefined,
      receiptDate: product?.receiptDate ? new Date(product.receiptDate) : undefined,
      featured: product?.featured || false,
    },
    resolver: zodResolver(productSchema),
  });

  const { data: categories } = useGetCategoriesQuery();

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const onSubmit = async (data: FormValues) => {
    if (product) {
      await updateProduct({ id: product.id, ...data });
      navigate('/');
      return;
    }
    await addProduct(data);
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" placeholder="Name" id="name" invalid={!!errors.name} {...field} />
            {errors.name && (
              <FormFeedback>Name is required, the length must not be greater than 200</FormFeedback>
            )}
          </FormGroup>
        )}
      />
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <Label for="brand">Brand</Label>
            <Input type="text" id="brand" placeholder="Brand" {...field} />
          </FormGroup>
        )}
      />
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input
              type="select"
              id="rating"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              {repeat(11).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Input>
          </FormGroup>
        )}
      />
      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange } }) => (
          <FormGroup>
            <Label for="categories">Categories</Label>
            <Input
              type="select"
              id="categories"
              multiple
              invalid={!!errors.categories}
              onChange={(e) => {
                const selectElement = e.currentTarget as unknown as HTMLSelectElement;
                const selectedOptions = Array.from(selectElement.selectedOptions).map((option) =>
                  Number(option.value),
                );
                onChange(selectedOptions);
              }}
            >
              {categories?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
            <FormFeedback>A product must have from 1 to 5 categories</FormFeedback>
          </FormGroup>
        )}
      />
      <Controller
        name="itemsInStock"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <Label for="itemsInStock">Items In Stock</Label>
            <Input type="number" id="itemsInStock" {...field} />
          </FormGroup>
        )}
      />
      <Controller
        name="expirationDate"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <Label for="expirationDate">Expiration date</Label>
            <Input
              type="date"
              id="expirationDate"
              invalid={!!errors.expirationDate}
              {...field}
              value={field.value ? field.value.toISOString().split('T')[0] : ''}
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
            <FormFeedback>
              If a product has an expiration date it must expire not less than 30 days since now
            </FormFeedback>
          </FormGroup>
        )}
      />
      <Controller
        name="receiptDate"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <Label for="receiptDate">Receipt date</Label>
            <Input
              type="date"
              id="receiptDate"
              {...field}
              value={field.value ? field.value.toISOString().split('T')[0] : ''}
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          </FormGroup>
        )}
      />

      <Controller
        name="featured"
        control={control}
        render={({ field }) => (
          <FormGroup check>
            <Label check>
              <Input type="checkbox" {...field} value={field.value ? field.value.toString() : ''} />
              Featured
            </Label>
          </FormGroup>
        )}
      />

      <Button>Submit</Button>
    </Form>
  );
};
