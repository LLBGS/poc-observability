import { Response } from "express";

export abstract class Mapper<I, O> {
  abstract mapFrom(payload: I): Promise<O>;
}
