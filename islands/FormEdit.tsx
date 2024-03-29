import { useEffect, useState } from 'preact/hooks';
import { Post } from './FormPost.tsx';

type FormEdit = {
  id: string;
};

const FormEdit = (props: FormEdit) => {
  const [post, setPost] = useState<Post>({
    id: '',
    title: '',
  });
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const postsFromLocalStorage = JSON.parse(
      localStorage.getItem(`posts`) ?? '[]'
    );
    setPosts(postsFromLocalStorage);
  }, []);

  useEffect(() => {
    const post = posts.find((p) => p.id === props.id);
    setPost({
      id: post?.id ?? '',
      title: post?.title ?? '',
    });
  }, [posts]);

  const editPost = (id: string) => {
    const updatedPosts = posts.map((p) => {
      if (p.id !== id) return p;

      return {
        ...p,
        title: post.title,
      };
    });

    localStorage.setItem(`posts`, JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    location.href = `/`;
  };

  // update the post title
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    editPost(post.id);
  };
  return (
    <section class={`p-4 mx-auto max-w-screen-md`}>
      <h1>Edit Post:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postName">Post Name:</label>
        <input
          type="text"
          id="postName"
          name="postName"
          class={`border py-1 px-2 rounded block`}
          autoComplete="off"
          value={post.title}
          onInput={(e) =>
            setPost({
              ...post,
              title: e.currentTarget.value,
            })
          }
        />
        <button
          class={`px-2 py-1 border(gray-100 1) hover:bg-green-300 block my-2`}
        >
          Editar
        </button>
      </form>
    </section>
  );
};
export default FormEdit;
