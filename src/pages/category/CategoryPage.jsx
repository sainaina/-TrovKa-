import Categorytype from "../../components/category/CategoryType";
import Line from "../../components/category/Line";
import { Metadata } from "../../lib/Metadata";

export const Categories = () => {
  return (
    <>
      <div>
      <Metadata
          title="Category | TrovKa"
          description="Explore detailed service categories on TrovKa to find exactly what you need."
          author="SainaIna"
          keywords="services, TrovKa, categories"
          thumbnail="https://i.ibb.co/s6D2gFC/trovka-icon.png"
        />

      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="my-6">
          <Line className="border-t-2 border-gray-300" />
        </div>
        <div className="my-6">
          <Categorytype />
        </div>
      </div>
    </>
  );
};
