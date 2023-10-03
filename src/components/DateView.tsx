export default function DateView({ dateString }: { dateString: string }) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return (
    <time className="post-date" dateTime={dateString}>
      {year}-{month}-{day}
    </time>
  );
}
