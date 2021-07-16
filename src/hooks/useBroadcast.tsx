import { BroadcastChannel } from 'broadcast-channel';
import { useEffect, useState } from 'react';

const options = {
  webWorkerSupport: false,
};

const useBroadcast = (name: string) => {
  const [message, setMessage] = useState();
  const [channel] = useState(new BroadcastChannel(name, options));

  useEffect(() => {
    channel.onmessage = (message) => {
      setMessage(message);
    };
  }, []);

  const emit = (value) => {
    channel.postMessage(value);
  };

  return [message, emit];
};

export default useBroadcast;
