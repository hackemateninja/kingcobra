import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch } from 'react-redux';

// Slices
import { setButtonClick } from '@/redux/slices/thankyou';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

const RedirectFas: React.FC<IPlainObject> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    router.replace(`/fas/${props.make}/${props.model}/${props.zip}?rd=true`);
    dispatch(setButtonClick(false));
  }, []);
  return (
    <Head>
      <title>Redirecting...</title>
    </Head>
  );
};

export default RedirectFas;
