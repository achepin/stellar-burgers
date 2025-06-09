// Утилитные функции для работы с заказами
import { TOrder, TIngredient } from '@utils-types';

/**
 * Подсчитывает общую стоимость заказа на основе ингредиентов
 * @param ingredients - объект с информацией об ингредиентах заказа
 * @returns общая стоимость заказа
 */
export const calculateOrderTotal = (ingredients: {
  [key: string]: TIngredient & { count: number };
}): number =>
  Object.values(ingredients).reduce(
    (total, ingredient) => total + ingredient.price * ingredient.count,
    0
  );

/**
 * Группирует ингредиенты заказа по ID с подсчетом количества
 * @param orderIngredients - массив ID ингредиентов заказа
 * @param allIngredients - все доступные ингредиенты
 * @returns объект с сгруппированными ингредиентами
 */
export const groupOrderIngredients = (
  orderIngredients: string[],
  allIngredients: TIngredient[]
): { [key: string]: TIngredient & { count: number } } => {
  const ingredientsInfo: { [key: string]: TIngredient & { count: number } } =
    {};

  orderIngredients.forEach((ingredientId) => {
    const ingredient = allIngredients.find((ing) => ing._id === ingredientId);
    if (ingredient) {
      if (!ingredientsInfo[ingredientId]) {
        ingredientsInfo[ingredientId] = { ...ingredient, count: 0 };
      }
      ingredientsInfo[ingredientId].count++;
    }
  });

  return ingredientsInfo;
};

/**
 * Форматирует дату заказа в читаемый вид
 * @param date - дата заказа
 * @returns отформатированная дата
 */
export const formatOrderDate = (date: Date): string => {
  const today = new Date();
  const orderDate = new Date(date);

  const diffTime = today.getTime() - orderDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Сегодня';
  } else if (diffDays === 1) {
    return 'Вчера';
  } else {
    return `${diffDays} дней назад`;
  }
};
