import LoginForm from '@/components/forms/LoginForm';
import Loader from '@/components/Loader';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]';


export default async function Home() {
  const session = await getServerSession(authOptions);

  // if (status === "loading") {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  if (!session) {
    return (
      <main className="min-h-screen w-screen flex items-center justify-center">
        <LoginForm />
      </main>
    );
  }


  return (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-bold">Welcome to HopInMorris</h1>
      <p className="text-xl">
        Find your next ride or share your journey with others.
      </p>
      <div
        className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 
    gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      >
        <h1>Hello world!</h1>
      </div>
    </div>
  );
}
