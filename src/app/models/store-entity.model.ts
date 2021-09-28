export class StoreEntity {
  id: number | undefined;
  name: string | undefined;

  static deserialize(entity: RemoteStoreEntity): StoreEntity {
    return {
      id: entity.id,
      name: entity.name || entity.value
    };
  }
}

export class StoreOrderEntity extends StoreEntity {
  order: number | undefined;

  static deserialize(entity: RemoteStoreEntity): StoreOrderEntity {
    const e = super.deserialize(entity);
    return {
      ...e,
      order: entity.order,
    };
  }
}

export interface RemoteStoreEntity {
  id: number;
  name?: string;
  value?: string;
  order?: number;
}
