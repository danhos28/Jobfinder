/* eslint-disable object-curly-newline */
import Link from 'next/link';

interface IProps {
  src: string;
  content: string;
}

const Card = (props: IProps) => {
  const { src, content } = props;
  return (
    <div className="relative">
      <img
        className="rounded-lg w-[450px] h-[200px] sm:h-[300px]"
        src={src}
        alt="carousel"
      />
      <div className="absolute bottom-4 left-2 text-gray-100 bg-gray-500 bg-opacity-20 px-4 py-1 rounded-lg font-poppins hover:underline">
        <Link href="/">{content}</Link>
      </div>
    </div>
  );
};

export default Card;
