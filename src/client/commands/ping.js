module.exports = {
    name: "ping",
    description: "Pong...",
    options: [],
    permissions: [],
    run: async (client, interaction) => {
        return interaction.reply(`Pong... ${client.ws.ping}ms`);
    }
}