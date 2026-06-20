interface IProps {
  imageURL: string;
  alt: string;
  calssName: string;
}

const Image = ({ imageURL, alt, calssName }: IProps) => {
  return <img src={imageURL} alt={alt} className={calssName} />;
};

export default Image;
