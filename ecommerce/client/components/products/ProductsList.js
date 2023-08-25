import ProductItem from "./ProductItem";
const ProductsList = ({ products }) => {
  return (
    <ul className=" p-8 bg-stone-400" >
      {products.map((p) => {
        return <ProductItem key={p._id} product={p} />;
      })}
    </ul>
  );
};

export default ProductsList;
