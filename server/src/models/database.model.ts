type Database<T extends { id: string }> = {
    set(payload: T): void
    get(id?: string): T | Record<string, T>
    delete(id: string): void
}

export default Database