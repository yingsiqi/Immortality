import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// API 响应接口
interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

// API 错误接口
interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

class ApiClient {
  private instance: AxiosInstance
  private authToken: string | null = null

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加认证头
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`
        }

        // 添加请求时间戳
        config.headers['X-Request-Time'] = Date.now().toString()

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // 统一处理成功响应
        if (response.data.success) {
          return response.data.data
        } else {
          // API 返回失败状态
          throw new Error(response.data.message || '请求失败')
        }
      },
      async (error) => {
        // 处理错误响应
        if (error.response) {
          const { status, data } = error.response

          switch (status) {
            case 401:
              // 未授权，清除认证信息并重定向到登录页
              this.clearAuthToken()
              if (window.location.pathname !== '/auth/login') {
                window.location.href = '/auth/login'
              }
              throw new Error('登录已过期，请重新登录')

            case 403:
              throw new Error('权限不足')

            case 404:
              throw new Error('请求的资源不存在')

            case 422:
              // 表单验证错误
              const validationError: ApiError = {
                code: 'VALIDATION_ERROR',
                message: '表单验证失败',
                details: data.errors || {},
              }
              throw validationError

            case 429:
              throw new Error('请求过于频繁，请稍后再试')

            case 500:
              throw new Error('服务器内部错误')

            default:
              throw new Error(data.message || `请求失败 (${status})`)
          }
        } else if (error.request) {
          // 网络错误
          throw new Error('网络连接失败，请检查网络设置')
        } else {
          // 其他错误
          throw new Error(error.message || '未知错误')
        }
      }
    )
  }

  /**
   * GET 请求
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  /**
   * POST 请求
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT 请求
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  /**
   * PATCH 请求
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config)
  }

  /**
   * DELETE 请求
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }

  /**
   * 上传文件
   */
  async upload<T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    return this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(progress)
        }
      },
    })
  }

  /**
   * 设置认证令牌
   */
  setAuthToken(token: string): void {
    this.authToken = token
  }

  /**
   * 清除认证令牌
   */
  clearAuthToken(): void {
    this.authToken = null
  }

  /**
   * 获取当前认证令牌
   */
  getAuthToken(): string | null {
    return this.authToken
  }

  /**
   * 设置基础 URL
   */
  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL
  }

  /**
   * 设置请求超时时间
   */
  setTimeout(timeout: number): void {
    this.instance.defaults.timeout = timeout
  }

  /**
   * 获取 Axios 实例（用于高级用法）
   */
  getInstance(): AxiosInstance {
    return this.instance
  }
}

export const apiClient = new ApiClient()
export type { ApiError }