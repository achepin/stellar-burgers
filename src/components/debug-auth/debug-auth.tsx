import React from 'react';
import { useSelector } from '../../services/store';

export const DebugAuth: React.FC = () => {
  const { user, isAuthChecked, error } = useSelector((state) => state.user);
  const {
    userOrders,
    loading,
    error: ordersError
  } = useSelector((state) => state.orders);

  const authToken =
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1] || 'отсутствует';

  const refreshToken = localStorage.getItem('refreshToken') || 'отсутствует';

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'white',
        border: '2px solid #333',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 9999,
        maxWidth: '400px',
        fontSize: '12px'
      }}
    >
      <h3 style={{ margin: '0 0 10px 0' }}>🔍 Отладка аутентификации</h3>

      <div>
        <strong>Auth проверена:</strong> {isAuthChecked ? '✅' : '❌'}
      </div>
      <div>
        <strong>Пользователь:</strong>{' '}
        {user ? `✅ ${user.email}` : '❌ не авторизован'}
      </div>
      <div>
        <strong>Ошибка user:</strong> {error || 'нет'}
      </div>

      <hr style={{ margin: '10px 0' }} />

      <div>
        <strong>Access токен:</strong>{' '}
        {authToken !== 'отсутствует' ? '✅ есть' : '❌ нет'}
      </div>
      <div>
        <strong>Refresh токен:</strong>{' '}
        {refreshToken !== 'отсутствует' ? '✅ есть' : '❌ нет'}
      </div>

      <hr style={{ margin: '10px 0' }} />

      <div>
        <strong>Заказы загружаются:</strong> {loading ? '⏳' : '✅'}
      </div>
      <div>
        <strong>Количество заказов:</strong> {userOrders.length}
      </div>
      <div>
        <strong>Ошибка заказов:</strong> {ordersError || 'нет'}
      </div>

      <hr style={{ margin: '10px 0' }} />

      <div style={{ fontSize: '10px', color: '#666' }}>
        <div>URL: {window.location.pathname}</div>
        <div>Время: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};
