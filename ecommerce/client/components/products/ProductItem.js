import Image from "next/image";
import Link from "next/link";

function cutOutFirst100Words(text) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 100);
  return cutWords.join(" ");
}

const ProductItem = ({ product }) => {
  return (
    <li className="mt-12 mb-20 px-8 flex flex-row items-center justify-evenly bg-slate-500">
      <section className="w-1/3">
        <Image
          alt="Product image"
          src={product.imagePath}
          width={700}
          height={700}
        />
      </section>
      <section className="w-2/5 ">
        <h2 className="text-6xl mb-20 text-black-900 ">{product.name}</h2>
        <p className="mb-12 text-xl">{cutOutFirst100Words(product.description)}</p>

        <section className="flex items-center justify-between">
          <span className="p-3 rounded-md font-semibold text-white text-2xl bg-gray-900">
            $ {product.price}
          </span>
          <Link
            className="bg-slate-900 text-white font-semibold p-5 rounded hover:bg-stone-700 hover:text-slate-700-800 hover:font-bold hover:shadow hover:shadow-slate-700-400"
            href={`/products/${product._id}`}
          >
            View Product &#8594;
          </Link>
        </section>
      </section>
    </li>
  );
};

export default ProductItem;
