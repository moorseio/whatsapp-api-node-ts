import {EntityRepository, Repository, UpdateResult} from 'typeorm';

import Product from '../../models/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findByProduct(usersId: number): Promise<Product | null> {
    const findProduct = await this.findOne({
      relations: ['items'],
      where: `users_id = ${usersId} AND status != 'OPEN' AND status != 'FINISHED'`,
    });
    return findProduct || null;
  }

  public async updateProductStatus(
    id: number,
    status: string,
  ): Promise<UpdateResult> {
    const updateStatus = await this.createQueryBuilder()
      .update(Product)
      .set({status})
      .where({id})
      .execute();

    return updateStatus;
  }

  public async insertProductItem(
    itemId: number,
    productId: number,
  ): Promise<void> {
    await this.createQueryBuilder()
      .relation(Product, 'items')
      .of(productId)
      .add(itemId);
  }
}
export default ProductsRepository;
