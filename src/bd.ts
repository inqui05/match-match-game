import { MyRecord } from './myRecord';

export class DataBase {
  public db: IDBDatabase | null = null;

  init(bdName: string): Promise<IDBDatabase> {
    return new Promise((resolve) => {
      const IBD = window.indexedDB;
      const openRequest = IBD.open(bdName);

      openRequest.onupgradeneeded = () => {
        const database = openRequest.result;
        const store = database.createObjectStore('Match-match-game', { keyPath: 'id', autoIncrement: true });
        store.createIndex('email', 'email', { unique: true });
        this.db = database;
      };

      openRequest.onsuccess = () => {
        this.db = openRequest.result;
        resolve(this.db);
      };
    });
  }

  write(collection: string, data: MyRecord): Promise<MyRecord> {
    return new Promise(() => {
      if (this.db) {
        const transaction = this.db.transaction(collection, 'readwrite');
        const store = transaction.objectStore(collection);
        const pushEmpty = store.add({});
        pushEmpty.onsuccess = () => {
          data.id = pushEmpty.result;
          const result = store.put(data);
          result.onsuccess = () => {
          };
        };
      }
    });
  }

  readAll(collection: string): Promise<Array<MyRecord>> {
    return new Promise((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction(collection, 'readonly');
        const store = transaction.objectStore(collection);
        const result = store.getAll();

        transaction.oncomplete = () => resolve(result.result);
      }
    });
  }
}
