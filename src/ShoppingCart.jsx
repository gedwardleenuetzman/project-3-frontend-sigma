import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

function ShoppingCart({ name, price }) {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);

  const handleAddToCart = () => {
    // Add item to cart
    console.log(`Added ${quantity} ${name}(s) to cart for $${total}`);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotal(newQuantity * price);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ${price}
        </Typography>
        <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
        <Typography variant="h6" color="text.secondary">
          Total: ${total}
        </Typography>
        <Button variant="contained" onClick={handleAddToCart}>Add to cart</Button>
      </CardContent>
    </Card>
  );
}
