import { get } from 'lodash';

import useApi from 'shared/hooks/api';

const useCurrentUser = ({ cachePolicy = 'cache-only' } = {}) => {
  const [{ data }] = useApi.get('/currentUser', {}, { cachePolicy });

  return {
    currentUser: get(data, 'currentUser'),
    currentUserId: get(data, 'currentUser._id'),
  };
};

export default useCurrentUser;
