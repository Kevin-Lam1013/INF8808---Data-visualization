// import { range } from 'd3'

/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  // TODO: Clean the player name data
  data.forEach(function (item) {
    const temp = item.Player
    const names = temp.split(' ')
    let nameUpdated = ''
    for (const i in names) {
      nameUpdated += names[i].charAt(0).toUpperCase() + names[i].slice(1).toLowerCase()
      nameUpdated += ' '
    }
    item.Player = nameUpdated.trim()
  })

  return data
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  // TODO: Find the five top players with the most lines in the play
  const count = data.reduce((res, item) => {
    if (res[item.Player]) {
      res[item.Player]++
    } else {
      res[item.Player] = 1
    }
    return res
  }, {})

  const topPlayers = Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .map(v => v[0])

  return topPlayers.slice(0, 5)
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  // TODO : Generate the data structure as defined above
  const nestedData = data.reduce((res, item) => {
    const key = item.Act
    if (!res[key]) {
      var temp = []
      temp.push({ Player: item.Player, Count: 1 })
      res[key] = ({ Act: key, Players: temp })
    } else {
      let isIn = false
      res[key].Players.forEach((player) => {
        if (player.Player === item.Player) {
          player.Count++
          isIn = true
        }
      })
      if (!isIn) {
        res[key].Players.push(
          { Player: item.Player, Count: 1 }
        )
      }
    }
    return res
  }, {})

  const nestedArray = []
  for (const key in nestedData) {
    nestedArray.push(nestedData[key])
  }

  return nestedArray
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  const newData = data.reduce((res, item) => {
    const key = item.Act

    res[key] = { Act: key, Players: [] }
    item.Players.forEach((player) => {
      const isTopFive = top.indexOf(player.Player) > -1

      if (isTopFive) {
        res[key].Players.push(player)
      } else {
        let isIn = false
        res[key].Players.forEach((item) => {
          if (item.Player === 'Other') {
            item.Count += player.Count
            isIn = true
          }
        })
        if (!isIn) {
          res[key].Players.push(
            { Player: 'Other', Count: player.Count }
          )
        }
      }
    })

    return res
  }, {})

  const newDataset = []
  for (const key in newData) {
    newDataset.push(newData[key])
  }

  return newDataset
}
