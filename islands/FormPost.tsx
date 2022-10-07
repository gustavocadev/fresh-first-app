import { IS_BROWSER } from '$fresh/runtime.ts';
import { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export type Post = {
  id: string;
  title: string;
};

export default function FormPost() {
  const [posts, setPosts] = useState([] as Post[]);
  const [post, setPost] = useState({
    title: '',
    id: '',
  });

  const { title } = post;

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    createAPost();
  };

  useEffect(() => {
    const postsFromLocalStorage =
      JSON.parse(localStorage.getItem('posts')!) ?? [];
    setPosts(postsFromLocalStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // actions
  const createAPost = () => {
    setPosts((previousPosts) => [
      ...previousPosts,
      {
        title,
        id: crypto.randomUUID(),
      },
    ]);

    // reset form
    setPost({
      title: '',
      id: '',
    });
  };

  const handleDelete = (id: string) => {
    setPosts((previousPosts) => previousPosts.filter((post) => post.id !== id));
  };

  return (
    // forms by default do a GET request
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="postName"
          class={`border  py-1 px-2 rounded`}
          autoComplete="off"
          value={title}
          onInput={({ currentTarget }) =>
            setPost({
              ...post,
              title: currentTarget.value,
            })
          }
          autoFocus
        />
        <span>{title}</span>
        <button
          type="submit"
          class={`px-2 py-1 border(gray-100 1) hover:bg-gray-200 block my-2`}
        >
          Crear Post 🧪
        </button>
      </form>
      <section class={`my-2`}>
        {posts.map((post, idx) => (
          <section class={`flex items-center gap-2`}>
            <h1>
              <span>{idx + 1}- </span>
              {post.title}
            </h1>
            <button
              class={`px-2 py-1 border(gray-100 1) hover:bg-red-300 block my-2`}
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
            <a
              class={`px-2 py-1 border(gray-100 1) hover:bg-purple-300 block my-2`}
              href={`/posts/${post.id}`}
            >
              Editar
            </a>
          </section>
        ))}
      </section>
    </section>
  );
}
