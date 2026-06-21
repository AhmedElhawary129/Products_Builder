import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { formInputList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

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
  const renderFormInputList = formInputList.map((input, index) => (
    <div className="flex flex-col">
      <label htmlFor={input.id} className="md-[2px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input
        autoFocus={index === 0}
        type={input.type}
        id={input.id}
        name={input.name}
      />
    </div>
  ));
  return (
    <main className="container mx-auto sm:p-8 lg:p-16 xl:p-20 2xl:p-28">
      <Button
        className="bg-indigo-700 hover:bg-indigo-800"
        width="w-fit"
        onClick={open}
      >
        Add
      </Button>
      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Model isOpen={isOpen} close={close} title="ADD A NEW PRODUCT">
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
          </div>
        </form>
      </Model>
    </main>
  );
};

export default App;
