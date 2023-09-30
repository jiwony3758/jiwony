import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main>
      <div style={{
        margin: 'auto',
        width: 'fit-content'
      }}>
      <h2>Not Found</h2>
      <p>찾을 수 없는 페이지입니다.</p>
      <Link href="/"
        style={{
          backgroundColor: "var(--text-primary)"
        }}
      >홈으로 돌아가기</Link>
      </div>
    </main>
  );
}
