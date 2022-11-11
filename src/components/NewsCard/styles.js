import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  margin: 10px auto;
  width: 90%;
  background: #eaf2ff;
  border-radius: 16px;
`;
export const Tag = styled.View`
  padding: 4px 16px;
  background: #006ffd;
  border-radius: 20px;
`;
export const Label = styled.Text`
  color: #ffffff;
  font-weight: 600;
`;
export const Text = styled.View`
  padding: 16px 0 0 0;
`;
export const Title = styled.Text`
  color: #1f2024;
  font-size: 18px;
  font-weight: 800;
`;
export const Description = styled.Text`
  color: #494a50;
  font-size: 16px;
  font-weight: 400;
  margin: 5px 0;
`;
