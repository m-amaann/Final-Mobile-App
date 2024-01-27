import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #fff;
  gap: 14px;
`;

export const RootView = styled.View`
  padding-horizontal: 14px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-vertical: 2px;
`;

export const BakingGoodsEssentialsText = styled.Text`
  color: #2f2f2f;
  font-family: Lexend;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  text-transform: capitalize;
`;

export const LetsOrderText = styled.Text`
  color: #2f2f2f;
  font-family: Lexend-Medium;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

export const DiscoverText = styled.Text`
  font-family: Poppins-ExtraBold;
  color: #323232;
  font-size: 24px;
`;

export const SearchButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 50px;
  border-radius: 50px;
  border-width: 1px;
  border-color: #e4e3e3;
  align-items: center;
  padding-horizontal: 18px;
  flex-direction: row;
  gap: 12px;
`;

export const SearchIcon = styled(Icon).attrs(() => ({
  name: 'search-outline',
  size: 24,
  color: '#CCCCCC',
}))``;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 16px;
  color: #000000;
`;

export const SearchText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: #cccccc;
  font-family: Poppins-Regular;
`;

export const OptionsButton = styled.TouchableOpacity`
  width: 52px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: #efefef;
`;

export const OptionsIcon = styled(Icon).attrs(() => ({
  name: 'options-outline',
  size: 24,
  color: '#d84445',
}))``;


export const ProductCartWrapper = styled.View`
  padding-horizontal: 20px;
`;



// --------------- TOP ARRIVALS PRODUCTS ----------------- //

export const NewCollectionsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

`;

export const NewCollectionsText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Bold';
`;

export const SeeAllButton = styled.TouchableOpacity`
  
`;

export const SeeAllText = styled.Text`
    font-family: 'Poppins-Regular';
    color: rgba(40, 102, 176, 1);
    font-size: 12px;

`;


// --------------- TOP SALES PRODUCTS ----------------- //


export const TopSaleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const TopSaleText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Bold';
`;



// --------------- POPULAR PRODUCTS ----------------- //

export const PopularWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
`;

export const PopularText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Bold';
`;


// --------------- ALL PRODUCTS ----------------- //

export const MainWrapper = styled.View`
  padding-horizontal: 10px;
  align-items: center;
`;
// ----------------

export const AllProductWrapper = styled.View`
    justify-content: space-between;
    margin-top: 18px;
`;

export const AllProductText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Bold';
  margin-bottom: 10px;
  margin-left: 5px;
  color: #070f18;
`;


export const BrowseButton = styled.TouchableOpacity`
    width: 200px;   
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export const BrowseButtonText = styled.Text`
    font-size: 14px;
    color: #444444;
    font-family: 'Poppins-Medium';

`;