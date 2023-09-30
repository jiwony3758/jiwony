export default function DateView({ dateString }: { dateString: string }) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <time className="post-date" dateTime={dateString}>
      {year}-{month}-{day}
    </time>
  );
}
