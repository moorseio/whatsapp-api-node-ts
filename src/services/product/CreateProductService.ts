import {getCustomRepository} from 'typeorm';

import {messages, status} from '../../config/constants';
import ICreateProductDTO from '../../web/dtos/ICreateProductDTO';
import ProductsRepository from '../../repositories/messages/ProductsRepository';

class CreateProductService {
  public async execute({
    usersId,
  }: Omit<
    ICreateProductDTO,
    'id' | 'items' | 'status'
  >): Promise<ICreateProductDTO | null> {
    try {
      const product = getCustomRepository(ProductsRepository);
      const findExistingProduct = await product.findByProduct(usersId);

      if (findExistingProduct) {
        return findExistingProduct || null;
      }

      const createNewProduct = product.create({
        usersId,
        status: status.open,
      });
      const savedNewProduct = await product.save(createNewProduct);

      return savedNewProduct || null;
    } catch (err) {
      console.error(err);
      throw new Error(messages.error.createProduct);
    }
  }
}
export default CreateProductService;
