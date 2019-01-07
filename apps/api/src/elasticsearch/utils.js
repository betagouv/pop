function pingElasticsearchTask(es) {
  return {
    title: "Ping",
    task: async () => {
      const available = await es.ping({ requestTimeout: 10000 });
      if (!available) {
        throw new Error("Elasticsearch not available.");
      }
    }
  };
}

module.exports = { pingElasticsearchTask };
