/* eslint-disable object-curly-newline */
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  src: string;
  width: number;
  height: number;
  content: string;
}

const Card = (props: IProps) => {
  const { src, width, height, content } = props;
  return (
    <div className="relative">
      <Image
        className="rounded-lg"
        src={src}
        alt="carousel"
        width={width}
        height={height}
      />
      <div className="absolute bottom-4 left-2 text-gray-100 bg-gray-500 bg-opacity-20 px-4 py-1 rounded-lg font-poppins hover:underline">
        <Link href="/">{content}</Link>
      </div>
    </div>
  );
};

export default Card;
