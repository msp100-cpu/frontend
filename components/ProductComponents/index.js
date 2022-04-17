// import CakeImage from "../../assets/images/cakes_category.jpg";
import Link from "next/link";

const Categories = ({ categories }) => {
  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Fresh Flowers & Perfect Gifts for all Occasions
            </h2>
            <p className="text-xl text-gray-500">
              5 Hour Delivery & Free Shipping in India. 68,914 Gift Ideas for
              your Beloved
            </p>
          </div>
          <ul className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-7xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-5">
            {categories.map((category, k) => (
              <Link key={k} href={"category/" + category.categoryLink}>
                <a className="transition cursor-pointer duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-red-500">
                  <img
                    className="mx-auto h-32 w-32 rounded-full lg:w-24 lg:h-24"
                    src={category.categoryImage}
                    alt=""
                  />
                  <div className="space-y-2">
                    <div className="text-xs font-bold lg:text-lg">
                      <h3>{category.categoryName}</h3>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Categories;
