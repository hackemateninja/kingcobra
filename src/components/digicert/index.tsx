/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Packages
import { useLayoutEffect } from 'react';
import { DigicertDiv } from './style';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// For Digicert Script
declare const window: any;

const certDivId = 'DigiCertClickID_3shh8DtJ';

const Digicert: React.FC<IPlainObject> = (props) => {
  useLayoutEffect(() => {
    window.__dcid = (function (__dcid, d) {
      __dcid.push([certDivId, '3', 'm', 'black', '3shh8DtJ']);
      const cid = d.createElement('script');
      cid.async = true;
      cid.defer = true;
      cid.src = '//seal.digicert.com/seals/cascade/seal.min.js';
      const s = d.getElementsByTagName('script');
      const ls = s[s.length - 1];
      ls.parentNode!.insertBefore(cid, ls.nextSibling);
      return __dcid;
    })(window.__dcid || [], document);
  }, []);

  return (
    <DigicertDiv data-language="en" id={certDivId}>
      <a href="https://www.digicert.com/wildcard-ssl-certificates.htm">Wildcard SSL Certificate</a>
    </DigicertDiv>
  );
};

export default Digicert;
