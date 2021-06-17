import Redirect from '@/comp/redirect';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ErrorPage: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState(null);
  const [checkPath, setcheckPath] = useState(null);

  useEffect(() => {
    const paths = router.asPath.split('/');
    const asPath = router.asPath.split('?');
    setQuery(asPath.length > 1 ? '?' + asPath[1] : '');
    if (paths.length > 2) {
      router.replace('/' + paths[1] + (asPath.length > 1 ? '?' + asPath[1] : ''));
    } else {
      setcheckPath('');
    }
  }, []);

  return <>{query !== null && checkPath !== null && <Redirect parameters={query} />}</>;
};

export default ErrorPage;
