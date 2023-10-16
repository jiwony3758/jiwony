import { IPostEntity } from "@/domain/entities/Post";

export interface IPostVM {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
}

export class PostVM implements IPostVM {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _date: string;
  private readonly _category: string;
  private readonly _tags: string[];
  private readonly _content: string;

  constructor(params: IPostEntity) {
    const { metadata } = params;
    this._id = params.id;
    this._title = metadata.title;
    this._description = metadata.description;
    this._date = metadata.date;
    if (metadata?.category) {
      this._category = metadata.category.replaceAll(",", "/") + "/";
    } else {
      this._category = "";
    }

    this._tags = metadata.tags.split(",");
    this._content = params.content;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get date(): string {
    return this._date;
  }

  get category(): string {
    return this._category;
  }

  get tags(): string[] {
    return this._tags;
  }

  get content(): string {
    return this._content;
  }
}
