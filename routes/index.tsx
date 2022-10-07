import Counter from '../islands/Counter.tsx';
import FormPost from '../islands/FormPost.tsx';
import { PageProps } from '$fresh/server.ts';

export interface Data {
  newPost: string;
}

export default function Home(props: PageProps<Data>) {
  return (
    <main class={`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={`my-6`}>
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
      <FormPost />
    </main>
  );
}
