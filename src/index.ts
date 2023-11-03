import express from "express"
import config from "./config.json"
import axios from "axios"

const geyserSkinAPI = process.env.GEYSER_SKIN_API || config.geyserSkinAPI
const headImageAPI = process.env.HEAD_IMAGE_API || config.headImageAPI

const port = process.env.PORT || 3000

const app = express()

app.get("/version", (_request, response) => {
  response.send("1.0.0")
})

app.get("/head.png", async (request, response) => {
  const uuid = request.query.uuid?.toString()
  if (!uuid) return response.status(400).json({
    error: "Query 'uuid' was not provided"
  })
  const match = uuid.match(/^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){2}([0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/)
  if (!match) return response.status(400).json({
    error: "Query 'uuid' is not a valid UUID"
  })
  let id: string
  if (uuid.startsWith("00000000-0000-0000-")) {
    // Geyser UUID
    const xuid = parseInt(match[1].replace("-", ""), 16)
    const req = await axios.get<GeyserAPIResponse>(geyserSkinAPI.replace("{XUID}", xuid.toString()))
    if (req.status !== 200) {
      console.error(req.data)
      return response.status(500).json({
        error: "Failed to get skin from Geyer's API"
      })
    }
    id = req.data.texture_id
  } else {
    id = uuid
  }
  response.redirect(headImageAPI.replace("{ID}", id))
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})