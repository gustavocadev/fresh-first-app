/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import type { Handlers, PageProps } from '$fresh/server.ts';
import FormEdit from '../../islands/FormEdit.tsx';

// export const handler: Handlers<Data> = {
//   GET(req, ctx) {
//     console.log('hello form!');
//     const url = new URL(req.url);
//     const newPost = url.searchParams.get('postName') ?? '';
//     return ctx.render({ newPost });
//   },
// };

export default function Post(props: PageProps) {
  const { params } = props;
  return <FormEdit id={params.id} />;
}
