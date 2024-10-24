import type { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap: async ({ strapi }: { strapi: Core.Strapi }) => {
    const estados = [
      { nome: "Acre", sigla: "AC" },
      { nome: "Alagoas", sigla: "AL" },
      { nome: "Amapá", sigla: "AP" },
      { nome: "Amazonas", sigla: "AM" },
      { nome: "Bahia", sigla: "BA" },
      { nome: "Ceará", sigla: "CE" },
      { nome: "Distrito Federal", sigla: "DF" },
      { nome: "Espírito Santo", sigla: "ES" },
      { nome: "Goiás", sigla: "GO" },
      { nome: "Maranhão", sigla: "MA" },
      { nome: "Mato Grosso", sigla: "MT" },
      { nome: "Mato Grosso do Sul", sigla: "MS" },
      { nome: "Minas Gerais", sigla: "MG" },
      { nome: "Pará", sigla: "PA" },
      { nome: "Paraíba", sigla: "PB" },
      { nome: "Paraná", sigla: "PR" },
      { nome: "Pernambuco", sigla: "PE" },
      { nome: "Piauí", sigla: "PI" },
      { nome: "Rio de Janeiro", sigla: "RJ" },
      { nome: "Rio Grande do Norte", sigla: "RN" },
      { nome: "Rio Grande do Sul", sigla: "RS" },
      { nome: "Rondônia", sigla: "RO" },
      { nome: "Roraima", sigla: "RR" },
      { nome: "Santa Catarina", sigla: "SC" },
      { nome: "São Paulo", sigla: "SP" },
      { nome: "Sergipe", sigla: "SE" },
      { nome: "Tocantins", sigla: "TO" },
    ];

    const existingStates = await strapi.db.query("api::estado.estado").count();

    if (existingStates === 0) {
      const { count } = await strapi.db.query("api::estado.estado").createMany({
        data: estados,
      });

      strapi.log.info(`Inserted ${count} estados.`);
    }
  },
};
