'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withSuperAdminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithSuperAdminAuth = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //   const session = localStorage.getItem('superadmin_session');
    //   if (!session) {
    //     router.replace('/auth/sign-in');
    //   } else {
    //     setIsLoading(false);
    //   }
    // }, [router]);

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithSuperAdminAuth;
};

export default withSuperAdminAuth;
