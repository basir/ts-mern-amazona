# Video-10-Create-Rating-ProductItem-Component

1. Rating.js

   ```js
      function Rating(props: {
      rating: number
      numReviews?: number
      caption?: string
    }) {
      const { rating, numReviews, caption } = props
      return (
        <div className="rating">
          <span>
            <i
              className={
                rating >= 1
                  ? 'fas fa-star'
                  : rating >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 2
                  ? 'fas fa-star'
                  : rating >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 3
                  ? 'fas fa-star'
                  : rating >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 4
                  ? 'fas fa-star'
                  : rating >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 5
                  ? 'fas fa-star'
                  : rating >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          {caption ? (
            <span>{caption}</span>
          ) : numReviews != 0 ? (
            <span>{' ' + numReviews + ' reviews'}</span>
          ) : (
            ''
          )}
        </div>
      )
    }
    export default Rating

   ```

2. ProductItem.js

   ```js
   function ProductItem({ product }: { product: Product }) {
     return (
       <Card>
         <Link to={`/product/${product.slug}`}>
           <img
             src={product.image}
             className="card-img-top"
             alt={product.name}
           />
         </Link>
         <Card.Body>
           <Link to={`/product/${product.slug}`}>
             <Card.Title>{product.name}</Card.Title>
           </Link>
           <Rating rating={product.rating} numReviews={product.numReviews} />
           <Card.Text>${product.price}</Card.Text>
           {product.countInStock === 0 ? (
             <Button variant="light" disabled>
               Out of stock
             </Button>
           ) : (
             <Button>Add to cart</Button>
           )}
         </Card.Body>
       </Card>
     )
   }
   export default ProductItem
   ```

3. HomePage.js

   ```js
   <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
     <ProductItem product={product}></ProductItem>
   </Col>
   ```
