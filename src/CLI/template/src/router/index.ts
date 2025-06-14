const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModules = Object.values(modules).map((m: any) => m.default)