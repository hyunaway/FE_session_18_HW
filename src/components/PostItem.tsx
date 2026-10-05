// src/components/PostItem.tsx
import styled from "styled-components";
import Button from "./Button";
import type { Post } from "../types";

interface PostItemProps {
  post: Post; // 아까 만든 Post 타입을 그대로!
  onSelect: (post: Post) => void;
  onToggleFavorite: (post: Post) => void;
  isFavorite: boolean;
}

function PostItem({ post, onSelect, onToggleFavorite, isFavorite }: PostItemProps) {
  return (
    <Card $active={isFavorite}>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <Author>by {post.author}</Author>
      <Button label="선택" onClick={() => onSelect(post)} />
      <FavoriteButton $active={isFavorite} onClick={() => onToggleFavorite(post)}>
        {isFavorite ? "담김" : "관심"}
      </FavoriteButton>
    </Card>
  );
}

const Card = styled.div<{ $active: boolean }>`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: ${({ $active }) => ($active ? "#f8d7d7" : "#ffffff")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333333;
`;

const Content = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666666;
`;

const Author = styled.small`
  font-size: 12px;
  color: #999999;
`;

const FavoriteButton = styled.button<{ $active: boolean }>`
  margin-left: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid #f4bf42;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#f4bf42" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#f4bf42")};
`;

export default PostItem;
