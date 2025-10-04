import { redirect } from 'next/navigation';

// This page renders when a route is requested that doesn't exist.
// Since we're using internationalized routing, we redirect to the default locale.
export default function RootNotFound() {
  redirect('/zh');
}