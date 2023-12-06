const { Telegraf } = require('telegraf')
const bot = new Telegraf('6368460619:AAHoCrptcVjvpCQ2iNnxrRdGa529qqWqWYk')
const geolocation = require('geolocation-utils');

// Almacena las ubicaciones en tiempo real por chat ID
const locations = {};
// Objeto para almacenar intervalos por chat ID
const intervals = {};
//----------------------------------- COMANDOS ----------------------------------------------
bot.start((ctx) => {
    ctx.reply('Bienvenido a WaveAlert')
})

bot.help((ctx) => {
    ctx.reply('Aqui se van a mostrar los comandos de WaveAlert')
})

// Función para enviar la solicitud de ubicación cada 5 segundos
function sendLocationRequest(chatId) {
    intervals[chatId] = setInterval(() => {
        const keyboard = {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Compartir ubicación',
                            request_location: true, // Solicita la ubicación del usuario
                        },
                    ],
                ],
                one_time_keyboard: true,
            },
        };
        bot.telegram.sendMessage(chatId, 'Por favor, comparte tu ubicación:', keyboard);
    }, 5000);
}

// Comando que inicia el envío de solicitudes de ubicación
bot.command(['monitor'], (ctx) => {
    const chatId = ctx.message.chat.id;
    sendLocationRequest(chatId);
});

// Comando para detener las solicitudes de ubicación
bot.command('stopmonitor', (ctx) => {
    const chatId = ctx.message.chat.id;
    stopLocationRequests(chatId);
    ctx.reply('Solicitudes de ubicación en tiempo real detenidas.');
});

// Función para detener las solicitudes de ubicación
function stopLocationRequests(chatId) {
    clearInterval(intervals[chatId]);
    delete intervals[chatId];
}

// Maneja la ubicación cuando el usuario la comparte
bot.on('location', (ctx) => {
    const location = ctx.message.location;
    const latitude = location.latitude;
    const longitude = location.longitude;

    ctx.reply(`Gracias por compartir tu ubicación. Latitud: ${latitude}, Longitud: ${longitude}`);
});

bot.launch()