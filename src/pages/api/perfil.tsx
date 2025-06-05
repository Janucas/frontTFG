import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // o redirige a /login si tienes una página de login personalizada
    }
  }, [status, router]);

  if (status === 'loading') return <p>Cargando...</p>;

  return (
    <div>
      <h1>Perfil privado</h1>
      <p>Bienvenido, {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
