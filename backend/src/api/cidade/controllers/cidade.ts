/**
 * cidade controller
 */

import { factories } from "@strapi/strapi";
import axios from "axios";

export default factories.createCoreController(
  "api::cidade.cidade",
  ({ strapi }) => ({
    async find(ctx) {
      const state = ctx.request.headers["estado"];
      if (state) {
        const response = await axios.get(
          `http://educacao.dadosabertosbr.org/api/cidades/${state}`
        );
        const citiesData = response.data;

        const cities = citiesData.map((city) => city.split(":")[1]);

        return cities;
      }

      const { data, meta } = await super.find(ctx);

      return { data, meta };
    },
  })
);
