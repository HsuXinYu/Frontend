import Link from "next/link";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>這是首頁</h1>
        <Link href="/newPage">新的頁面</Link>
        <br />
        <Link href="/posts/edit-post">編輯POST</Link>
      </div>
    </Layout>
  );
}
