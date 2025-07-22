import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/products');
      console.log('products fetched. Full list:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/products/${id}`);
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      console.log('🗑 Deleted product with ID:', id);
    } catch (error) {
      console.error('error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Grid container spacing={2} justifyContent="center">
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDelete(product.id)}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    left: 4
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight={900}>{product.name}</Typography>
                <Typography variant="subtitle1" color="text.primary">
                  ${product.price}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
