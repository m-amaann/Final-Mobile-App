import { Text, View } from "react-native";
import styled from "styled-components";



export const Navbar = styled(View)`
  height: 55px;
  background-color: #f2f2f2;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 20px;

`;

export const NavbarItem = styled(Text)`
  font-size: 16px;
`;