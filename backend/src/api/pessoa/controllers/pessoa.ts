/**
 * pessoa controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::pessoa.pessoa",
  ({ strapi }) => ({
    async findOne(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: ["estado", "cidade"],
      };
      const response = await super.findOne(ctx);
      console.log(response);

      return response;
    },
  })
);
