// Notion Post Entity
export interface IPostNotionInfo {
  pageId: string;
}

export interface IPostProperties {
  id: number;
  contentId: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  form: string;
  visible: string;
}

export interface INotionPostParams {
  notionInfo: IPostNotionInfo;
  properties: IPostProperties;
  content: string;
}

export interface IPostEntity {
  pageId: string;
  contentId: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  form: string;
  visible: boolean;
}

export class PostEntity implements IPostEntity {
  _pageId: string;
  _contentId: string;
  _title: string;
  _description: string;
  _date: string;
  _category: string;
  _tags: string[];
  _content: string;
  _form: string;
  _visible: boolean;

  constructor(params: INotionPostParams) {
    this._pageId = params.notionInfo.pageId;
    this._contentId = params.properties.contentId;
    this._title = params.properties.title;
    this._description = params.properties.description;
    this._date = params.properties.date;
    this._category = params.properties.category;
    this._tags = [...params.properties.tags];
    this._content = params.content;
    this._form = params.properties.form;
    this._visible = params.properties.visible === "true" ? true : false;
  }

  get pageId(): string {
    return this._pageId;
  }

  get contentId(): string {
    return this.contentId;
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

  get form(): string {
    return this._form;
  }

  get visible(): boolean {
    return this._visible;
  }
}
