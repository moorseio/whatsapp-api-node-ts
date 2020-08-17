import Item from 'models/Item';

export default interface ICreateProductDTO {
  id: number;

  items: Array<Item>;

  usersId: number;

  status: string;
}
