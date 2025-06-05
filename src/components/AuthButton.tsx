import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Bienvenido, {session.user?.name}</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    );
  }

  return <button onClick={() => signIn('google')}>Iniciar sesión con Google</button>;
}
