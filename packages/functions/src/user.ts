import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";
import { Dynamo } from './dynamo';

export * as User from "./user";

export const UserEntity = new Entity({
  model: {
    version: "1",
    entity: "User",
    service: "auth"
  },
  attributes: {
    userID: {
      type: "string",
      required: true,
      readOnly: true
    },
    email: {
      type: "string",
      required: true
    }
  },
  indexes: {
    byEmail: {
      index: "byEmail",
      pk: {
        field: "pk",
        composite: ["userId"],
      },
      sk: {
        field: "sk",
        composite: ["email"]
      },
    },
  }
});

export type Info = EntityItem<typeof UserEntity>;

export async function fromID(id: string) {
  return await UserEntity.get({ userID: id }).go();
}

export async function fromEmail(email: string) {
  const result = await UserEntity.query
    .byEmail({email: email})
    .go();
  if (result.length) return result[0];
}

export async function create(email: string) {
  return UserEntity.create({
    email,
    userId: ulid()
  }).go();
}