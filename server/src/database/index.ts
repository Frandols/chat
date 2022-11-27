import { 
    Database,
    User,
    Room 
} from '../models'

const createDatabase = <T extends { id: string }>() => new class implements Database<T> {
    private data: Record<string, T> = {}
    
    public set(payload: T): void {
        this.data[payload.id] = payload
    }

    public get(id?: string): T | Record<string, T> {
        if(!id) return this.data

        return this.data[id]
    }

    public delete(id: string) {
        delete this.data[id]
    }
}()

const users = createDatabase<User>()
const rooms = createDatabase<Room>()

export {
    users,
    rooms
}
