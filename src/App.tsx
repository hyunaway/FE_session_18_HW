import { useState } from "react";
import styled from "styled-components";
import PostList from "./components/PostList";
import Button from "./components/Button";
import type { NewPost, Post, PostListState } from "./types";

const DUMMY: Post[] = [
  { id: 1, title: "첫 글", content: "반갑습니다", author: "동건" },
  { id: 2, title: "두번째 글", content: "TS 재밌다", author: "선우" },
  { id: 3, title: "삼", content: "멋사야호", author: "근우" },
];

function App() {
  const [posts, setPosts] = useState<Post[]>(DUMMY);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Todo1 : App에 상태 추가
  const [favorites, setFavorites] = useState<Post[]>([]);

  // Todo2 : toggleFavorite 함수
  const toggleFavorite = (post: Post) => {
    const exception = favorites.some((f) => f.id === post.id);
    if (exception) setFavorites(favorites.filter((f) => f.id !== post.id)); // 빼기
    else setFavorites([...favorites, post]);                             // 끝에 추가
  };


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
  };

  const handleAddPost = () => {
    const newPost: NewPost = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    };

    if (!newPost.title || !newPost.content || !newPost.author) return;

    setPosts([...posts, { ...newPost, id: Date.now() }]);
    setTitle("");
    setContent("");
    setAuthor("");
  };

  const postListState: PostListState =
    posts.length === 0
      ? { status: "empty" }
      : { status: "success", data: posts };

  return (
    <>
      <Title>🐘 TS 미니 게시판</Title>

      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="내용을 입력하세요"
      />
      <input
        value={author}
        onChange={handleAuthorChange}
        placeholder="작성자를 입력하세요"
      />
      <Button label="추가" onClick={handleAddPost} />

      <PostList
        state={postListState}
        onSelect={handleSelectPost}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        />

      {selectedPost === null ? (
        <p>게시글을 선택해주세요.</p>
      ) : (
        <Detail>
          <p>#{selectedPost.id}</p>
          <h3>{selectedPost.title}</h3>
          <p>{selectedPost.content}</p>
          <small>by {selectedPost.author}</small>
        </Detail>
      )}
    </>
  );
}

const Title = styled.h1`
  color: #2f6feb;
  font-size: 28px;
`;

const Detail = styled.div`
  padding: 16px;
  border-radius: 12px;
  background-color: #f5f7ff;
`;

export default App;
