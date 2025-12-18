import { query } from '../config/database';
import { Server as SocketServer } from 'socket.io';

let io: SocketServer | null = null;

export const setSocketServer = (socketServer: SocketServer) => {
  io = socketServer;
};

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type: string;
}

export const createNotification = async ({
  userId,
  title,
  message,
  type,
}: CreateNotificationParams) => {
  const result = await query(
    `INSERT INTO notifications (user_id, title, message, type)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, title, message, type]
  );

  const notification = result.rows[0];

  // Emit real-time notification via Socket.io
  if (io) {
    io.to(userId).emit('notification', notification);
  }

  return notification;
};

export const getNotifications = async (userId: string, limit: number = 20) => {
  const result = await query(
    `SELECT * FROM notifications
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2`,
    [userId, limit]
  );

  return result.rows;
};

export const getUnreadCount = async (userId: string): Promise<number> => {
  const result = await query(
    `SELECT COUNT(*) FROM notifications
     WHERE user_id = $1 AND is_read = false`,
    [userId]
  );

  return parseInt(result.rows[0].count);
};

export const markAsRead = async (notificationId: string, userId: string) => {
  await query(
    `UPDATE notifications
     SET is_read = true
     WHERE id = $1 AND user_id = $2`,
    [notificationId, userId]
  );
};

export const deleteNotification = async (notificationId: string, userId: string) => {
  await query(
    `DELETE FROM notifications
     WHERE id = $1 AND user_id = $2`,
    [notificationId, userId]
  );
};
