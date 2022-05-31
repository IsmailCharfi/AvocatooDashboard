import ReactPaginate from "react-paginate"

const CustomPagination = ({page, limit, dataCount, handlePagination}) => {
  
  const count = Math.ceil(dataCount / limit)

  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      breakLabel="..."
      pageCount={Math.ceil(count) || 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      activeClassName="active"
      forcePage={page !== 0 ? page - 1 : 0}
      onPageChange={(page) => handlePagination(page)}
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName={
        "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      }
    />
  )
}

export default CustomPagination