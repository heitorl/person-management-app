import { errors } from "@strapi/utils";
const { ApplicationError } = errors;

export default {
  async beforeDelete(event) {
    const { where } = event.params;

    const cityAssociate = await strapi.db.query("api::cidade.cidade").count({
      where: { estado: where.id },
    });

    if (cityAssociate > 0) {
      throw new ApplicationError(
        "A cidade não pode ser excluída com pessoas associadas a ela.",
        {
          cidadeId: where.id,
          associacoes: cityAssociate,
        }
      );
    }
  },
};
