import PostItem from "./PostItem";
import type { Post, PostListState } from "../types";

interface PostListProps {
  state: PostListState;
  onSelect: (post: Post) => void;
  favorites: Post[];
  onToggleFavorite: (post: Post) => void;
}

function PostList({ state, onSelect, favorites, onToggleFavorite }: PostListProps) {
  if (state.status === "loading") {
    return <p>게시글을 불러오는 중입니다.</p>;
  }

  if (state.status === "error") {
    return <p>게시글을 불러오지 못했습니다: {state.message}</p>;
  }

  if (state.status === "empty") {
    return <p>아직 게시글이 없습니다.</p>;
  }

  return (
    <>
      {state.data.map((post) => (
        <PostItem 
          key={post.id}
          post={post} 
          onSelect={onSelect}
          isFavorite={favorites.some((f) => f.id === post.id)}
          onToggleFavorite={onToggleFavorite}
          />
      ))}
    </>
  );
}

export default PostList;
