/* eslint-disable no-unneeded-ternary */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useWindowSize from '../hooks/useWindowSize';

const Pagination = ({
  perPage,
  pageTotal,
}: {
  perPage: number;
  pageTotal: number;
}) => {
  const router = useRouter();
  const { page }: any = router.query;
  const pages = [];
  const { width } = useWindowSize();

  const [currPage, setCurrPage] = useState<number>(
    page ? parseInt(page, 10) : 1,
  );

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(pageTotal / perPage); i += 1) {
    pages.push(i);
  }

  useEffect(() => {
    if (width! <= 480) {
      setPageNumberLimit(3);
      setMaxPageNumberLimit(3);
    } else {
      setPageNumberLimit(5);
      setMaxPageNumberLimit(5);
    }
  }, [width]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { value } = e.target as HTMLButtonElement;
    setCurrPage(Number(value));
    router.push(`/dashboard?page=${value}`);
  };

  const nextHandler = () => {
    setCurrPage(currPage + 1);
    router.push(`/dashboard?page=${currPage + 1}`);

    if (currPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const prevHandler = () => {
    setCurrPage(currPage - 1);
    router.push(`/dashboard?page=${currPage - 1}`);

    if ((currPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button
        type="button"
        onClick={nextHandler}
        className="px-4 py-2 border-2 bg-white"
      >
        &hellip;
      </button>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <button
        type="button"
        onClick={prevHandler}
        className="px-4 py-2 border-2 bg-white"
      >
        &hellip;
      </button>
    );
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          type="button"
          key={number}
          value={number.toString()}
          className={
            currPage === number
              ? 'bg-blue-700 text-white px-4 py-2 border-2 cursor-pointer'
              : 'px-4 py-2 border-2 cursor-pointer hover:bg-gray-50'
          }
          onClick={handleClick}
        >
          {number}
        </button>
      );
    }
    return null;
  });

  return (
    <div className="flex list-none bg-white rounded-full mb-32 text-sm">
      <button
        type="button"
        className="px-4 py-2 border-2 bg-white hover:bg-gray-50"
        onClick={prevHandler}
        disabled={currPage === pages[0] ? true : false}
      >
        Prev
      </button>
      {pageDecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}
      <button
        type="button"
        className="px-4 py-2 border-2 bg-white hover:bg-gray-50"
        onClick={nextHandler}
        disabled={currPage === pages[pages.length - 1] ? true : false}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
