import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { colors, formInputList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // State
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Handler
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    console.log("Cancel");
    setProduct(defaultProductObj);
    close();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    // Check if any property has a value of "" && Check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
  };

  // Renders
  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputList = formInputList.map((input, index) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="md-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        autoFocus={index === 0}
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
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
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex items-center flex-wrap space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
    </main>
  );
};

export default App;
