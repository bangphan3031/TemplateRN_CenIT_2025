import React, {useState} from 'react';
import {DataTable} from 'react-native-paper';

const DefaultDataTable = ({
  title,
  data,
  columns,
  paginationProps,
  ...restProps
}) => {
  const {
    from,
    to,
    page,
    itemsPerPage,
    items,
    onPageChange,
    onItemsPerPageChange,
  } = paginationProps || {};

  const [numberOfItemsPerPageList] = useState([2, 5, 10]);

  return (
    <DataTable {...restProps}>
      <DataTable.Header>
        {columns.map((column, index) => (
          <DataTable.Title key={index}>{column}</DataTable.Title>
        ))}
      </DataTable.Header>

      {data.slice(from, to).map((item, index) => (
        <DataTable.Row key={index}>
          {Object.values(item).map((value, index) => (
            <DataTable.Cell key={index}>{value}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}

      {paginationProps && (
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={onPageChange}
          label={`${from + 1}-${to > items.length ? items.length : to} trên ${
            items.length
          }`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Số dòng trên trang'}
        />
      )}
    </DataTable>
  );
};

export default DefaultDataTable;
