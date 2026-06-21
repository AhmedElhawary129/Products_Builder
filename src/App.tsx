import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { productList } from "./data";
import Button from "./components/ui/Button";

const App = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);

  // Handler
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  // Renders
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto sm:p-8 lg:p-16 xl:p-20 2xl:p-28">
      <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-fit" onClick={open}>Add</Button>
      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Model isOpen={isOpen} close={close} title="ADD A NEW PRODUCT">
        <div className="flex items-center space-x-3">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-300 hover:bg-gray-400">Cancel</Button>
        </div>
      </Model>
    </main>
  );
};

export default App;
