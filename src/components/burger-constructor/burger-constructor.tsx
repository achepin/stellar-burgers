import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  clearCurrentOrder
} from '../../services/slices/ordersSlice';
import {
  clearConstructor,
  removeIngredient,
  moveIngredient
} from '../../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.constructor);
  const { currentOrder, loading: orderRequest } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.user);

  const constructorItems = {
    bun,
    ingredients: ingredients || []
  };

  const orderModalData = currentOrder;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || !user) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...(constructorItems.ingredients || []).map(
        (ingredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
  };

  const handleRemoveIngredient = (id: string) => {
    dispatch(removeIngredient(id));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      dispatch(moveIngredient({ from: index, to: index - 1 }));
    }
  };

  const handleMoveDown = (index: number) => {
    if (ingredients && index < ingredients.length - 1) {
      dispatch(moveIngredient({ from: index, to: index + 1 }));
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients || []).reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleRemoveIngredient}
    />
  );
};
