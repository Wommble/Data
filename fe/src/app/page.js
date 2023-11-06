"use client";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Link href={"/OtherPage"}>View info</Link>
    </div>
  );
}
