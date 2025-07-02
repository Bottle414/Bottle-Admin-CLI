import { ref, watch, type Ref } from 'vue'

export interface StorageOptions {
    prefix: string,
    expire: number, // 存活时间
    encrypt: boolean, // 是否加密
    storage: Storage,
    encryptFn: (str: string) => string,
    decryptFn: (str: string) => string
}

type UseStorageOptions = Partial<StorageOptions>

// WebStorage 封装
export function useWebStorage(options: UseStorageOptions) {
    /**
     * 此处是 解构赋值 + 默认值，
     * 解构赋值有两种，数组型和对象型
     * 解构赋值式的传参有参数个数和顺序不定的优点，且可以赋值为空对象运行不传参
     */
    const {
        prefix = '',
        expire = 0,
        encrypt = true,
        storage = localStorage,
        encryptFn = (val) => btoa(encodeURIComponent(val)),
        decryptFn = (val) => decodeURIComponent(atob(val))
    } = options
    /**
     * 加密算法可以切换，比如
     * import CryptoJS from 'crypto-js'
     * encryptFn: (val) => CryptoJS.AES.encrypt(val, 'secretKey').toString(),
     * decryptFn: (val) => CryptoJS.AES.decrypt(val, 'secretKey').toString(CryptoJS.enc.Utf8),
     */

    // 规格化密钥
    const formatKey = (key: string): string => {
        return prefix ? `${prefix}_${key}` : key
    }

    // 存储到 WebStorage
    function set<T>(key: string, value: T) {
        const fullkey = formatKey(key)
        const payload = {
            value,
            time: Date.now(),
            expire: expire > 0 ? Date.now() + expire * 60 * 1000 : null
        }

        let raw = JSON.stringify(payload)
        if (encrypt) raw = encryptFn(raw)

        storage.setItem(fullkey, raw)
    }

    // 从 WebStorage 取东西
    function get<T>(key: string): T | null {
        const fullkey = formatKey(key)
        const raw = storage.getItem(fullkey)
        if (!raw) return null

        try {
            const str = encrypt ? decryptFn(raw) : raw
            const data = JSON.parse(str)

            if (data.expire && Date.now() > data.expire) {
                remove(key)
                return null
            }

            return data.value as T
        } catch (e: any) {
            console.warn(`[useStorage] 解析失败：${ e }`)
            return null
        }
    }

    // 清空 WebStorage
    const clear = () => {
        storage.clear()
    }

    // 从 WebStorage 删除某项
    const remove = (key: string) => {
        storage.removeItem(formatKey(key))
    }

    return {
        set,
        get,
        remove,
        clear
    }
}

export function useWebStorageComposable<T>(key: string, initial: T, options: UseStorageOptions): Ref<T> {
    const storage = useWebStorage(options)// 缓存，避免重复生成 WebStorage
    const state = ref<T>(storage.get<T>(key) ?? initial)

    watch(state, (newVal: T) => {
        storage.set(key, newVal)
    }, { deep: true })

    return state
}