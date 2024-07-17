const { sendMail } = require('../../../config/configEmail')
const newUserEmail = async (user) => {
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 10px;
        }
        .header {
            background-color: #000000;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 10px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
        }
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .token {
            font-weight: bold;
            font-size: 18px;
            color: #007bff;
        }
    </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>RES-ROX</h1>
            </div>
            <div class="content">
                <p>Hola <strong>${user.name}</strong>,</p>
                <p>¡Gracias por unirte a nuestra plataforma de RES-BOX!</p>
                <p>¡Antes de continuar, es necesario que confirmes que eres tu!</p>
                <p><a href="${process.env.FRONTEND_URL_IP}/confirm-account/${user._id}" class="button">¡SOY YO😊!</a></p>
                <p>Estamos emocionados de tenerte con nosotros y esperamos que disfrutes de todas las experiencias y promociones que ofrecemos.</p>
                <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros.</p>
                <p>¡Bienvenido a la comunidad!</p>
                <p>Saludos cordiales,</p>
                <p><strong>Daniele Mazzola</strong></p>
                <p>CEO - Founder</p>
            </div>
            <div class="footer">
                <p>Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>`
  await sendMail(user.email, `Bienvenido ${user.name}`, htmlContent)
}

const recoverEmail = async (user) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 10px;
        }
        .header {
            background-color: #000000;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 10px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
        }
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .token {
            font-weight: bold;
            font-size: 18px;
            color: #007bff;
        }
    </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>RES-BOX</h1>
          </div>
          <div class="content">
              <p>Hola <strong>${user.name}</strong>,</p>
              <p>Hemos recibido una solicitud de recuperación de contraseña.</p>
              <p>En caso de no haber sido tú, por favor, ignora este email; en caso contrario accede a este enlace:</p>
              <p><a href="${process.env.FRONTEND_URL_IP}/recovery-password/${user.token}" class="button">Recuperar Contraseña</a></p>
              <p>Muchas gracias por estar con nosotros.</p>
              <p>Te saluda el equipo,</p>
              <p><strong>RES-BOX</strong></p>
          </div>
          <div class="footer">
              <p>Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
          </div>
      </div>
  </body>
  </html>`
  await sendMail(user.email, 'Recovery Password', htmlContent)
}

const newPasswordEmail = async (user) => {
  const htmlContent = `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
                border-radius: 10px;
            }
            .header {
                background-color: #000000;
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333333;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>RES-BOX</h1>
            </div>
            <div class="content">
                <p>Hola <strong>${user.name}</strong>,</p>
                <p>Te confirmamos que tu contraseña ha sido cambiada con éxito.</p>
                <p>Si no solicitaste este cambio, por favor contacta a nuestro soporte de inmediato para proteger tu cuenta.</p>
                <p>Gracias por mantener tu cuenta segura.</p>
                <p>Saludos cordiales,</p>
                <p><strong>Daniele Mazzola</strong></p>
                <p>CEO - Founder</p>
            </div>
            <div class="footer">
                <p>Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>`
  await sendMail(user.email, 'New Password', htmlContent)
}

module.exports = {
  newUserEmail,
  recoverEmail,
  newPasswordEmail
}
