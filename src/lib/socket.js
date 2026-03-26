import { io } from "socket.io-client";

const resolveSocketConfig = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "https://api.suhtech.shop/api";
  const customSocketUrl = import.meta.env.VITE_SOCKET_URL;
  const customSocketPath = import.meta.env.VITE_SOCKET_PATH;

  // Allow explicit socket overrides when API and socket hosts differ.
  if (customSocketUrl) {
    return {
      url: customSocketUrl.replace(/\/+$/, ""),
      path: customSocketPath || "/socket.io",
    };
  }

  const normalizedApiUrl = apiUrl.replace(/\/+$/, "");

  // If API is mounted at /api, connect to host root and use /api/socket.io.
  if (normalizedApiUrl.endsWith("/api")) {
    return {
      url: normalizedApiUrl.slice(0, -4),
      path: "/api/socket.io",
    };
  }

  return {
    url: normalizedApiUrl,
    path: "/socket.io",
  };
};

class SocketManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect(token, tenantId) {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    const { url, path } = resolveSocketConfig();

    this.socket = io(url, {
      path,
      auth: {
        token,
        tenantId,
      },
      // Start with polling so environments without WS upgrade support can still connect.
      transports: ["polling", "websocket"],
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
      this.isConnected = true;

      // Join tenant room
      if (tenantId) {
        this.socket.emit("join-tenant", tenantId);
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
      this.isConnected = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Agent-specific methods
  setAgentOnline(agentId, tenantId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("agent-online", { agentId, tenantId });
    }
  }

  setAgentOffline(agentId, tenantId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("agent-offline", { agentId, tenantId });
    }
  }

  joinConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("join-conversation", conversationId);
    }
  }

  leaveConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("leave-conversation", conversationId);
    }
  }

  // Event listeners
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);

      // Store listener for cleanup
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push(callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);

      // Remove from stored listeners
      if (this.listeners.has(event)) {
        const listeners = this.listeners.get(event);
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    }
  }

  // Clean up all listeners
  removeAllListeners() {
    if (this.socket) {
      this.listeners.forEach((callbacks, event) => {
        callbacks.forEach((callback) => {
          this.socket.off(event, callback);
        });
      });
      this.listeners.clear();
    }
  }

  // Emit events
  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      connected: this.isConnected,
      socketId: this.socket?.id,
    };
  }
}

export default new SocketManager();
