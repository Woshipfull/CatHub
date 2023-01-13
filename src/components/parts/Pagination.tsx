/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import Media from 'react-media';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type Props = {
  getPage: number;
  setPage: (arg: number) => void;
  maxPage: number;
  contentRef: React.MutableRefObject<HTMLDivElement>;
};

// eslint-disable-next-line object-curly-newline
const Pagination: FC<Props> = ({ getPage, setPage, maxPage, contentRef }) => {
  const handleChangePage = (numb: number) => () => {
    contentRef.current.scrollTo(0, 0);
    setPage(numb);
  };

  const btnClass = (numb: number) =>
    numb !== getPage
      ? 'btn btn-primary sm-btn'
      : 'btn btn-primary sm-btn active';

  const prevNextClass = (numb: number) =>
    getPage === numb ? 'btn sm-btn btn-dark disabled' : 'btn sm-btn btn-dark';

  const renderBtns = (array: number[]) =>
    array.map((numb) => (
      <button
        type="button"
        key={`pag_btn_${numb}`}
        className={btnClass(numb)}
        onClick={handleChangePage(numb)}
      >
        <span>{numb}</span>
      </button>
    ));

  const renderLargePagination = () => {
    const pageNumbers: number[][] = [];
    if (maxPage <= 9) {
      const temp = [];
      for (let i = 1; i <= maxPage; i += 1) {
        temp.push(i);
      }
      pageNumbers.push(temp);
    } else if (maxPage > 9 && getPage <= 6) {
      const startingNumbers = [];
      for (let i = 1; i <= 6; i += 1) {
        startingNumbers.push(i);
      }
      pageNumbers.push(startingNumbers);

      const latestNumbers = [maxPage - 1, maxPage];
      pageNumbers.push(latestNumbers);
    } else if (maxPage > 9 && getPage >= maxPage - 6 && getPage > maxPage / 2) {
      const startingNumbers = [1, 2];
      pageNumbers.push(startingNumbers);

      const latestNumbers = [];
      const startPoint = maxPage - 6;
      for (let i = 1; i <= 6; i += 1) {
        latestNumbers.push(startPoint + i);
      }
      pageNumbers.push(latestNumbers);
    } else {
      const startingNumbers = [1, 2];
      const middleNumbers = [];
      const endPoint = getPage + 1;
      for (let i = -1; getPage + i <= endPoint; i += 1) {
        middleNumbers.push(getPage + i);
      }
      const latestNumbers = [maxPage - 1, maxPage];

      pageNumbers.push(startingNumbers);
      pageNumbers.push(middleNumbers);
      pageNumbers.push(latestNumbers);
    }

    const result: Array<JSX.Element[] | JSX.Element> = [];
    pageNumbers.forEach((numbers, index) => {
      const temp = renderBtns(numbers);
      result.push(temp);
      if (index < pageNumbers.length - 1) {
        const key = `pag_ellipse_${index}`;
        const ellipsis = (
          <div className="btn btn-primary sm-btn disabled" key={key}>
            <span>...</span>
          </div>
        );
        result.push(ellipsis);
      }
    });

    return <>{result.flat()}</>;
  };

  const renderSmallPagination = () => {
    const pageNumbers: number[] = [];
    if (maxPage <= 5 && getPage < 4) {
      for (let i = 1; i <= maxPage; i += 1) {
        pageNumbers.push(i);
      }
    } else if (maxPage > 5 && getPage <= maxPage - 2) {
      const endPoint = getPage + 2;
      for (let i = -2; getPage + i <= endPoint; i += 1) {
        pageNumbers.push(getPage + i);
      }
    } else {
      const startPoint = maxPage - 5;
      for (let i = 1; i <= 5; i += 1) {
        pageNumbers.push(startPoint + i);
      }
    }

    return <>{renderBtns(pageNumbers)}</>;
  };

  return (
    <div className="pagination">
      <Media
        queries={{
          sm: '(min-width: 315px)',
          md: '(min-width: 550px)',
        }}
      >
        {(matches) => (
          <>
            {matches.sm && (
              <button
                className={prevNextClass(1)}
                type="button"
                onClick={handleChangePage(getPage - 1)}
              >
                <span>
                  <IoChevronBack />
                </span>
              </button>
            )}

            {matches.md ? renderLargePagination() : renderSmallPagination()}

            {matches.sm && (
              <button
                className={prevNextClass(maxPage)}
                type="button"
                onClick={handleChangePage(getPage + 1)}
              >
                <span>
                  <IoChevronForward />
                </span>
              </button>
            )}
          </>
        )}
      </Media>
    </div>
  );
};

export default Pagination;
