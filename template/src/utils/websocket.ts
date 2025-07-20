export enum ConnectionState {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
    ERROR
}

export interface WebSocketOption {
    reconnectAttempts: number
    reconnectInterval: number
    onOpen: () => void
    onClose: () => void
    onError: () => void
    onMessage: (message: string) => void
    onReconnect: (attempt: number) => void
    onStateChange: (state: ConnectionState) => void
}

export type WebSocketOptions = Partial<WebSocketOption>

export class SimpleWebSocket {
    private url: string
    private options: WebSocketOptions
    private socket: WebSocket | null = null
    private reconnectCount = 0
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null
    private state: ConnectionState = ConnectionState.CLOSED
    private lastMessage?: string

    constructor(url: string, options: WebSocketOptions = {}) {
        this.url = url
        this.options = {
            reconnectAttempts: 5,
            reconnectInterval: 1500,
            ...options
        }
    }

    private updateState(newState: ConnectionState) {
        this.state = newState
        this.options.onStateChange?.(newState)
    }

    public connect() {
        if (this.socket) return
        this.updateState(ConnectionState.CONNECTING)

        const ws = new WebSocket(this.url)
        this.socket = ws

        ws.onopen = () => {
            this.reconnectCount = 0
            this.updateState(ConnectionState.OPEN)
            this.options.onOpen?.()
        }

        ws.onclose = () => {
            this.updateState(ConnectionState.CLOSED)
            this.options.onClose?.()
            this.socket = null
            this.tryReconnect()
        }

        ws.onerror = () => {
            this.updateState(ConnectionState.ERROR)
            this.options.onError?.()
            this.socket = null
            this.tryReconnect()
        }

        ws.onmessage = (event) => {
            this.lastMessage = event.data
            this.options.onMessage?.(event.data)
        }
    }

    private tryReconnect() {
        if (this.reconnectCount >= (this.options.reconnectAttempts ?? 0)) return

        this.reconnectTimer = setTimeout(() => {
            this.reconnectCount++
            this.options.onReconnect?.(this.reconnectCount)
            this.connect()
        }, this.options.reconnectInterval)
    }

    public send(message: string): boolean {
        if (this.socket && this.state === ConnectionState.OPEN) {
            this.socket.send(message)
            return true
        }
        return false
    }

    public disconnect() {
        this.reconnectCount = Number.MAX_SAFE_INTEGER
        this.clearTimer()
        this.socket?.close()
        this.socket = null
    }

    public getStatus() {
        return this.state
    }

    public getLastMessage() {
        return this.lastMessage
    }

    private clearTimer() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer)
            this.reconnectTimer = null
        }
    }
}
