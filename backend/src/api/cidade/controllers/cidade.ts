/**
 * cidade controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::cidade.cidade",
  ({ strapi }) => ({
    async find(ctx) {
      const state = ctx.request.headers["estado"];
      if (state) {
        const response = await fetch(
          `http://educacao.dadosabertosbr.org/api/cidades/${state}`
        );
        const citiesData = (await response.json()) as string[];

        const cities = citiesData.map((city) => city.split(":")[1]);

        return cities;
      }

      const { data, meta } = await super.find(ctx);

      return { data, meta };
    },
  })
);
