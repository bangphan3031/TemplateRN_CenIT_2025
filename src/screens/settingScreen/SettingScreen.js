import { View, Text } from 'react-native';
import DefaultText from '../../components/texts/DefaultText';
import DefaultButton from '../../components/buttons/DefaultButton';
import DefaultToast from '../../components/toasts/DefaultToast';
import DefaultDataTable from '../../components/dataTables/DefaultDataTable';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const source = {
  html: `
<p style='text-align:center; color: red'>
  Hello World!
</p>`,
};

const SettingScreen = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const items = [
    {
      item1: 1,
      item2: 2,
      item3: 3,
    },
    {
      item1: 1,
      item2: 2,
      item3: 3,
    },
    {
      item1: 1,
      item2: 2,
      item3: 3,
    },
    {
      item1: 1,
      item2: 2,
      item3: 3,
    },
  ];

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = newItemsPerPage => {
    setItemsPerPage(newItemsPerPage);
    setPage(0); // Reset page when changing items per page
  };

  const paginationProps = {
    from: page * itemsPerPage,
    to: (page + 1) * itemsPerPage,
    page,
    itemsPerPage,
    items,
    onPageChange: handlePageChange,
    onItemsPerPageChange: handleItemsPerPageChange,
  };

  const columns = ['Dessert', 'Calories', 'Fat']; // Example column names

  const showToast = () => {
    setToastVisible(true);
  };

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
  }, [toastVisible]);

  const { width } = useWindowDimensions();

  return (
    <View>
      <RenderHtml contentWidth={width} source={source} />
      <DefaultText text={'Setting Screen'}></DefaultText>
      <DefaultButton title="Show toast" onPress={showToast} />
      {toastVisible && (
        <DefaultToast
          type="success"
          text1="Hello"
          text2="This is something 👋"
        />
      )}
      <DefaultDataTable
        title="My Table"
        data={items}
        columns={columns}
        paginationProps={paginationProps}
        style={{ marginBottom: 20 }} // Example custom style
      />
    </View>
  );
};

export default SettingScreen;
