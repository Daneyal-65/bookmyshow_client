export default function Loading({ loading = false }) {
  return <>{loading && <span>Loading. . . !</span>}</>;
}
