import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders, loading, error } = useSelector((state) => state.orders);
  const { user, isAuthChecked } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthChecked && user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isAuthChecked, user]);

  return <ProfileOrdersUI orders={userOrders} />;
};
