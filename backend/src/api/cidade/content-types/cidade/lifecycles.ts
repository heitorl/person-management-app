import { errors } from "@strapi/utils";
const { ApplicationError } = errors;

export default {
  async beforeDelete(event) {
    const { where } = event.params;

    const personAssociate = await strapi.db.query("api::pessoa.pessoa").count({
      where: { cidade: where.id },
    });

    console.log("associados ---", personAssociate);

    if (personAssociate > 0) {
      throw new ApplicationError(
        "A cidade não pode ser excluída com pessoas associadas a ela.",
        {
          cidadeId: where.id,
          associacoes: personAssociate,
        }
      );
    }
  },
};
