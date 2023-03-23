import React, { useEffect } from "react";

interface Props {
  openBlog(): void;
}

const Blog: React.FC<Props> = (props) => {
  const { openBlog } = props;
  useEffect(() => {
    openBlog();
  }, []);
  return (
    <iframe
      className="absolute top-0 left-0 h-screen w-screen"
      src="https://infai.4imedia.com/"
    />
  );
};

export default Blog;
