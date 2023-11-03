# GeyserSkinAPI

"""
API for Minecraft skins that work with Geyser and Java accounts.

This API provides a way to get the skin of a Minecraft player, which can be used to display the player's skin in a game or on a website.

## Endpoints

- `GET /head.png?uuid=<uuid>`
    - Returns the player's head as a PNG image.


## Usage
1. Clone this repository
```bash
git clone https://github.com/DeltAndy123/GeyserSkinAPI.git
```
2. Install the requirements
```bash
npm i -g pnpm
pnpm i
```
3. Build the project
```bash
pnpm build
```
4. Start the server
```bash
pnpm start
```

### Environment Variables
- `PORT` - The port to run the server on. Default: `3000`.
- `GEYSER_SKIN_API` - The URL to Geyser's skin API. If this is not provided, the value in `config.json` will be used. Default: `https://api.geysermc.org/v2/skin/{XUID}`
    - `{XUID}` will be replaced with the player's XUID.
- `HEAD_IMAGE_API` - The URL to the head image API. If this is not provided, the value in `config.json` will be used. Default: `https://mc-heads.net/avatar/{ID}.png`.
    - `{ID}` will be replaced with the player's UUID if the UUID is for Java, or the player's skin texture ID if the UUID is for Bedrock.
    - This API must support Java account UUIDs and texture IDs.