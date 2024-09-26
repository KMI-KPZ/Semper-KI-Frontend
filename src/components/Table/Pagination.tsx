import React from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  handlePageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { handlePageChange, totalPages } = props;
  const { t } = useTranslation();

  const handlePageChangeExtern = ({ selected }: { selected: number }) => {
    handlePageChange(selected + 1);
  };

  return totalPages > 1 ? (
    <ReactPaginate
      className="flex w-fit flex-row items-center justify-center gap-3 rounded-xl border-2 p-3 "
      breakLabel="..."
      nextLabel={t("components.Pagination.next") + "  >"}
      nextClassName=" flex items-center justify-center  grow"
      nextLinkClassName="hover:bg-gray-200 p-3 rounded-full border-2 bg-gray-100"
      onPageChange={handlePageChangeExtern}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      activeClassName=""
      activeLinkClassName=" bg-ultramarinblau text-white hover:bg-gray-200 hover:text-black"
      pageClassName="flex items-center justify-center grow"
      pageLinkClassName="hover:bg-gray-200 p-3 px-5 rounded-full border-2"
      previousLabel={"<  " + t("components.Pagination.previous")}
      previousClassName=" flex items-center justify-center grow"
      previousLinkClassName="hover:bg-gray-200 p-3 rounded-full border-2 bg-gray-100"
      renderOnZeroPageCount={null}
    />
  ) : null;
};

export default Pagination;
