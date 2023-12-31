/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kIyrTHqgrEx
 */
import { Login } from "./Login";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 flex h-14 w-full items-center justify-between bg-[#F3F4F6] px-4">
        <div />
        <Login />
      </header>

      <header className="top-0 flex h-14 w-full"></header>
    </>
  );
}
