const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0tndHhyWWRST1Zxbkw5U2o4UWVkUjd5MlNEMkRtNjkweGtTaXVNOXNXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK01KY2NnbW0xalUzQWRXa1RPaWFQazg4TzdhNXhmYUhQL1ZVSFhDWU1pOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSUpKd2xzd3VRMzJhYUpuS0lRekJPVVNsaGhmalZGb3FyaVJHYnRnemtRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmRlpOQVhIZ085Z1dJSVg5OUNyaUQzdWRQd1JIemdFVjJWTkRJWndYdW40PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRDRTA2eXUvRDZVWHNyT0xzUGh3SVRMZy9lRnJ2MnR2NWpMRDRDbENDVW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZia3RzOTdsR3h6Lzd0STg4VmJLa0pkdkZCUzlVTFRHZk1sMWVmbTQyVlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEtnR1FScEZTZDA3SENEeW5jeUhsZFpXMENBZWk1RmNiLytOci9CYi9ucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmhYTmFWVEo0dUtqak9WNlZ4TGtCRCtyOXFNNkkxZnZ6bTA4MGpQQnBTcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB4cEJ6cmxySk1rczMrZHRzb0VoOVdqYXpYWFNxc3JGNTAxWk1FNHRacFRJUGJrbWNMTFE4bkRyeU9kQnBKUmI4SWlTVG1EYkZ6SDRmdUp3ak0yTWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQsImFkdlNlY3JldEtleSI6IllLODg4YzE5S29OdHYxeWNiTXVlSVBrQ1lZd0g1aGpwWjFhajRhWlJ3d1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlAzeDY2ZmZrUkZXNVVCTnI3Y2tEYWciLCJwaG9uZUlkIjoiYThmODAwYTQtZWVkZi00NmFhLWJjODQtMjQ5ZGI4NjBlMzkyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRxSmZ2RW5SL0k1NXV3YUxUVThBTzVHa3pnND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsTjh2NXRlY1dKOXNRYjJqaEl5TTFwWEZ6YU09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNEMzWU42MjUiLCJtZSI6eyJpZCI6IjIzNDcwMjYyMDM2NDA6MzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRG91YmxlMDA3anIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05yemtkRUdFTE9UM3JJR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImxQRXZoNysxU2IxMnpJaUl1VnZCeGZZWGFENDkvbGdZNmx1M00vaDdmMjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImtxWUJCUDl2NFRoWUVNdmg0dFJIM3IrMWJxTGlSRDV0VWttS2w0eSt6aWF4Rnc0MTkyU2ZmQlNMWUY1M1dtaWszT3BteEZvQWt2U3MzU1VmN0lGTEJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsVlUxcGRMemRIYnhHVXZYTC83RlpGWi82T1M2bmFsQmsyYndyRlVDbFhMK3hPWFZnZitFQk1zcVVRWGFqL0pwZUpYa0dZTmZ4T2NWS0JJNU9IdnRpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMjYyMDM2NDA6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWlR4TDRlL3RVbTlkc3lJaUxsYndjWDJGMmcrUGY1WUdPcGJ0elA0ZTM5dSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNzAxMjkyOX0=",
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2347026203640", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
