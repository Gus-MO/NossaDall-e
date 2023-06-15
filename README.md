# NossaDall-e
One implementation of the DALL-E 2 for a Discord Bot.

## Description

This is a Discord Bot implementation of the [DALL-E 2](https://openai.com/dall-e-2/) _AI_, from [OPEN AI](https://openai.com/)
project(follow the links for more information on both).

Our main intention with this is to give a nice way to play around, with DALL-E 2, winthin a Discord Server with your friends.
That's the reason for the name "Nossa", which is the portuguese word for "Our".

The Bot hereafter name NossaDall-e is focused on the use of [Open AI API](https://openai.com/api/) with [Discord.js](https://discord.js.org/#/).

## Geting Started

If the project inspires you, may you wanna use it or maybe help on its improvements. On both cases here is the gidelines for
them.

- [Instalation](#Instalation)
- [Contributing](#Contributing)

## Instalation

### Users

#### Cloning and Installing

For starting hosting the bot fork this respository, then clone it to a local directory:

Example:

    git clone https://github.com/Your-Name/NossaDall-e.git

Install the dependencies:

1. node
2. npm

and finaly proceed with npm:

    npm install

Create a local file called `images`.

run the database creator:

    cd database
    node create_database.js

#### Creating a bot

For launching the bot just run the `app.js` file:

    node app.js

### Devs

## Contributing

There is many ways you can contribute with the project, simplily adding the bot to your server and using it is a
good start. Reporting errors, and giving new ideias.

### Project Milestones and tasks

- [x] Get to a first working model
- [ ] Implement users management
- [ ] Add [Open AI Moderation](https://beta.openai.com/docs/guides/moderation/overview) to prompt texts

For complete list of tasks visit the [docs/taks.md](docs/tasks.md)

## Acknowledgements

## License
[GPL-3.0](LICENSE)
