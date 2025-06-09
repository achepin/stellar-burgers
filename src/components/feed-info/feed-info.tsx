import { FC } from 'react';
import { useSelector } from 'react-redux';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { RootState } from '../../services/store';

const MAX_ORDERS_TO_SHOW = 20;

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, MAX_ORDERS_TO_SHOW);

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector(
    (state: RootState) => state.orders
  );

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
