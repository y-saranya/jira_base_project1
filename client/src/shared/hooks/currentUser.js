import { get } from 'lodash';

import useApi from 'shared/hooks/api';

const useCurrentUser = ({ cachePolicy = 'cache-only' } = {}, from = false) => {
  const [{ data }] = useApi.get('/currentUser', {}, { cachePolicy });
  if (from) {
    console.log(data, "data")
  }
  return {
    currentUser: get(data, 'currentUser'),
    currentUserId: get(data, 'currentUser._id'),
  };
};

export default useCurrentUser;
