import {
  Container,
  Description,
  Label,
  Tag,
  Text,
  Title,
} from "./styles";

export default function NewsCard({ tag, title, description }) {
  return (
    <Container>
      <Tag>
        <Label>{tag}</Label>
      </Tag>
      <Text>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Text>
    </Container>
  );
}
