interface IProps {
  src: string;
  quotes: string;
  name: string;
  position: string;
}

const Quotes = (props: IProps) => {
  // eslint-disable-next-line object-curly-newline
  const { src, quotes, name, position } = props;
  return (
    <div
      className="flex flex-col bg-gradient-to-t from-gray-50 to-blue-100 lg:flex-row px-8 items-center rounded-lg shadow-xl justify-evenly lg:h-auto lg:p-12 w-80 sm:w-3/4
    lg:max-w-screen-lg mt-16 mb-16 sm:mt-28mbg-white text-center font-poppins font-bold hover:rotate-3 hover:shadow-2xl transform transition-all ease-in-out duration-200"
    >
      <img
        src={src}
        alt="quotes"
        className="rounded-full h-20 w-20 lg:h-40 lg:w-40 my-4"
      />
      <div className="flex flex-col lg:pl-8 lg:text-left text-sm sm:text-base">
        <p>{quotes}</p>
        <div className="mt-8 lg:mt-4 lg:text-left">
          <p className="text-blue-900 font-bold">{name}</p>
          <div className="flex flex-col justify-center lg:items-start items-center">
            <p className="text-gray-500 font-normal text-sm">{position}</p>
            <img
              src="/images/amazon_logo.png"
              alt="company"
              className="h-6 w-6 ml-2 mt-2 mb-8 lg:mb-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
