import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
