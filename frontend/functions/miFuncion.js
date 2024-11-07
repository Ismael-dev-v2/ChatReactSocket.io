// netlify/functions/miFuncion.js
exports.handler = async function(event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: '¡Hola desde la función!' })
    };
  };